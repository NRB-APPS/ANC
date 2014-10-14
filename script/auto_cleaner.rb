#The first method cleans encounters with wrong date by replacing with the correct obs date time.

def get_wrong_encounters

  Encounter.find(:all, :joins => [:observations], :conditions => ["DATE(encounter_datetime) != DATE(obs_datetime)"])
end

def fix_encounter_datetimes

  counter = 0
  (get_wrong_encounters || []).each do |encounter|
      ob_dates = encounter.observations.collect{|o| o.obs_datetime.to_date}.uniq
      diff = (ob_dates.max - ob_dates.min).to_i
      puts "#{ob_dates.length} : #{encounter.name} diff = #{diff.to_s}"
    if ob_dates.length == 1

      counter += 1
      puts "#{counter} Updating enc ID #{encounter.id}, patient ID #{encounter.patient_id}"
      encounter.update_attributes(:encounter_datetime => ob_dates.min)
    else
      puts "#{encounter.id}"
    end
  end
  puts "#{counter} encounters updated"
end

def clean
  #all method calls to be added here

  puts "Fixing wrong encounter dates"
  fix_encounter_datetimes
end

clean


