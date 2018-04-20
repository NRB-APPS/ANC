@remote_servers = CoreService.get_global_property_value("remote_servers.parent")
@remote_server_address_and_port = @remote_servers.to_s.split(':')
@remote_server_address = @remote_server_address_and_port.first
@remote_server_port = @remote_server_address_and_port.second
@remote_login = CoreService.get_global_property_value("remote_bart.username").split(/,/) rescue ""
@remote_password = CoreService.get_global_property_value("remote_bart.password").split(/,/) rescue ""
@remote_location = CoreService.get_global_property_value("remote_bart.location").split(/,/) rescue nil
@remote_machine = CoreService.get_global_property_value("remote_machine.account_name").split(/,/) rescue ''

def resolve_duplicates

  patient_identifiers = PatientIdentifier.find_by_sql(["select t.patient_id as
  anc_pid,
  t2.patient_id as patient_id2, t.identifier as anc_identifier, 
  t2.identifier as art_identifier from anc_ukwe.patient_identifier t, 
  openmrs_ukwe.patient_identifier t2 where t.identifier = t2.identifier and
  t.identifier_type = 3 and t.voided = 0"])

  patient_identifiers.each do |k|
    url = "http://localhost:3000/people/demographics_remote"
    p = {"person" => {"patient" => {"identifiers" => {"national_id" =>
    "#{k.art_identifier}"}}}}
    art_person = JSON.parse(RestClient.post(url,p))
    simp_art_person = {}
    simp_anc_person = {}

    simp_art_person["first_name"] = art_person["person"]["names"]["given_name"]
    simp_art_person["family_name"] = art_person["person"]["names"]["family_name"]
    simp_art_person["gender"] = art_person["person"]["gender"]
    simp_art_person["home_district"] = art_person["person"]["addresses"]["address2"]
    simp_art_person["home_village"] = art_person["person"]["addresses"]["city_village"]
    simp_art_person["home_ta"] = art_person["person"]["addresses"]["county_district"]

    anc_patient = Patient.find_by_patient_id(k.anc_pid)
    anc_person = PatientService.demographics(anc_patient.person) rescue nil
    unless anc_person.blank?
      simp_anc_person["first_name"] = anc_person["person"]["names"]["given_name"]
      simp_anc_person["family_name"] = anc_person["person"]["names"]["family_name"]
      simp_anc_person["gender"] = anc_person["person"]["gender"]
      simp_anc_person["home_district"] = anc_person["person"]["addresses"]["address2"]
      simp_anc_person["home_village"] = anc_person["person"]["addresses"]["city_village"]
      simp_anc_person["home_ta"] =
      anc_person["person"]["addresses"]["county_district"]
    end
    if simp_anc_person != simp_art_person
      puts "#{k.anc_identifier}"
      npid = PatientIdentifier.find(:first, :conditions => ["patient_id = ? AND
      identifier = ? AND voided = 0 AND identifier_type = 3", k.anc_pid,k.anc_identifier])
      npid.update_attributes(:identifier_type => 2) unless npid.blank? #|| simp_anc_person["first_name"] != "Test"
      #raise "here".inspect if simp_anc_person["first_name"] == "Test"
      #npid.save
      #puts "#{k.anc_identifier} has been changed to legacy_id" unless
      npid.blank?
    else
      puts "True"
    end
    puts "#{simp_art_person.to_json} ++++ #{simp_anc_person.to_json}"

  end

end

resolve_duplicates
