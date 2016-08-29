class DupInit

  def self.index_all

    npid_type = PatientIdentifierType.find_by_name("National id").id
    query =
        "
                SELECT person.uuid AS id, given_name first_name, family_name last_name, birthdate, identifier national_id,
                  DATE(patient.date_created) date_created, patient.patient_id, person_address.address2 home_district
                FROM patient
                  INNER JOIN person_name ON patient.patient_id = person_name.person_name_id
                  INNER JOIN person ON patient.patient_id = person.person_id
                  INNER JOIN patient_identifier ON patient.patient_id = patient_identifier.patient_id
                    AND patient_identifier.identifier_type = #{npid_type}
                  INNER JOIN person_address ON person_address.person_id = patient.patient_id
                WHERE patient.voided = 0 AND person.voided = 0 AND patient_identifier.voided = 0 AND person_address.voided = 0
              "

    all = ActiveRecord::Base.connection.select_all(query)

    if all.length > 0

        #used by node app to store duplicate  weighted values
        Dir.mkdir '/var/www/data'

        file = File.open("dup_index.yml", "w")
        arr = {}
        all.each do |record|

            uuid = record['id']

            arr[uuid] = {} if arr[uuid].blank?
            record.each do |key, value|
              arr[uuid][key] = value
            end
        end

        file.write arr.to_yaml
        file.close
    end

    #{"first_name":true,"last_name":true,"middle_name":true,"gender":true,"birthdate":false,"date_of_death":true,"citizenship":false,"place_of_death":true,"hospital_of_death_name":false,"place_of_death_village":false,"place_of_death_ta":false,"place_of_death_district":false,"home_village":false,"home_ta":false,"home_district":false,"home_country":false,"mother_first_name":false,"mother_last_name":false,"father_first_name":false,"father_last_name":false,"informant_first_name":false,"informant_last_name":false}
  end

  def self.index_all_remote
    all = YAML.load_file "dup_index.yml"

    all.each do |uuid, record|
      record = [record]
      url = "http://localhost:3008/write"
      response = RestClient.post(url, record.to_json, :content_type => "application/json", :accept => 'json')
      puts response
    end
  end

  def self.start
    self.index_all
    self.index_all_remote
  end
end

#first name, lastname, gender, homedistrict, birthdate
puts "Starting Process"
  DupInit.start
puts "Done"