
Source_db = YAML.load(File.open(File.join(RAILS_ROOT, "config/database.yml"), "r"))['development']["database"]
CDCDataExtraction = 1

def start
  facility_name = GlobalProperty.find_by_sql("select property_value from global_property where property = 'current_health_center_name'").map(&:property_value).first

  start_date = "2016-01-01".to_date
  end_date = "2016-12-31".to_date
  puts "CDC HTC data extraction............................................................................................"

  puts "Clients who receive their results........................................................................."
  total_clients_recieved_results = clients_received_results(start_date, end_date)
  receive_results_less_1 = clients_received_results(start_date, end_date, 0, 1)
  receive_results_between_1_and_9 = clients_received_results(start_date, end_date, 2, 9)
  receive_results_between_10_14_female = clients_received_results(start_date, end_date, 10, 14, 'Female')
  receive_results_between_10_14_male = clients_received_results(start_date, end_date, 10, 14, 'Male')
  receive_results_between_15_19_female = clients_received_results(start_date, end_date, 15, 19, 'Female')
  receive_results_between_15_19_male = clients_received_results(start_date, end_date, 15, 19, 'Male')
  receive_results_between_20_24_female = clients_received_results(start_date, end_date, 20, 24, 'Female')
  receive_results_between_20_24_male = clients_received_results(start_date, end_date, 20, 24, 'Male')
  receive_results_between_25_49_female = clients_received_results(start_date, end_date, 25, 49, 'Female')
  receive_results_between_25_49_male = clients_received_results(start_date, end_date, 25, 49, 'Male')
  receive_results_more_than_50_female = clients_received_results(start_date, end_date, 50, nil, 'Female')
  receive_results_more_than_50_male = clients_received_results(start_date, end_date, 50, nil, 'Male')
  receive_results_less_than_15_female = clients_received_results(start_date, end_date, 0, 14, 'Female')
  receive_results_less_than_15_male = clients_received_results(start_date, end_date, 0, 14, 'Male')
  receive_results_more_than_15_female = clients_received_results(start_date, end_date, 15, nil, 'Female')
  receive_results_more_than_15_male = clients_received_results(start_date, end_date, 15, nil, 'Male')

  puts "Clients with positive results........................................................................."
  total_clients_with_positive_results = clients_with_positive_results(start_date, end_date)
  clients_with_positive_results_less_1 = clients_with_positive_results(start_date, end_date, 0, 1)
  clients_with_positive_results_between_1_and_9 = clients_with_positive_results(start_date, end_date, 2, 9)
  clients_with_positive_results_between_10_14_female = clients_with_positive_results(start_date, end_date, 10, 14, 'Female')
  clients_with_positive_results_between_10_14_male = clients_with_positive_results(start_date, end_date, 10, 14, 'Male')
  clients_with_positive_results_between_15_19_female = clients_with_positive_results(start_date, end_date, 15, 19, 'Female')
  clients_with_positive_results_between_15_19_male = clients_with_positive_results(start_date, end_date, 15, 19, 'Male')
  clients_with_positive_results_between_20_24_female = clients_with_positive_results(start_date, end_date, 20, 24, 'Female')
  clients_with_positive_results_between_20_24_male = clients_with_positive_results(start_date, end_date, 20, 24, 'Male')
  clients_with_positive_results_between_25_49_female = clients_with_positive_results(start_date, end_date, 25, 49, 'Female')
  clients_with_positive_results_between_25_49_male = clients_with_positive_results(start_date, end_date, 25, 49, 'Male')
  clients_with_positive_results_more_than_50_female = clients_with_positive_results(start_date, end_date, 50, nil, 'Female')
  clients_with_positive_results_more_than_50_male = clients_with_positive_results(start_date, end_date, 50, nil, 'Male')
  clients_with_positive_results_less_than_15_female = clients_with_positive_results(start_date, end_date, 0, 14, 'Female')
  clients_with_positive_results_less_than_15_male = clients_with_positive_results(start_date, end_date, 0, 14, 'Male')
  clients_with_positive_results_more_than_15_female = clients_with_positive_results(start_date, end_date, 15, nil, 'Female')
  clients_with_positive_results_more_than_15_male = clients_with_positive_results(start_date, end_date, 15, nil, 'Male')

  if CDCDataExtraction == 1
    $resultsOutput = File.open("./CDCDataExtraction_HTC" + "#{facility_name}" + ".txt", "w")
    $resultsOutput  << "Total clients who receieved results...........................................................\n"
    $resultsOutput  << "total_clients_recieved_results: #{total_clients_recieved_results}\n receive_results_less_1: #{receive_results_less_1}\n receive_results_between_1_and_9: #{receive_results_between_1_and_9}\n receive_results_between_10_14_female: #{receive_results_between_10_14_female}\n receive_results_between_10_14_male: #{receive_results_between_10_14_male}\n receive_results_between_15_19_female: #{receive_results_between_15_19_female}\n receive_results_between_15_19_male: #{receive_results_between_15_19_male}\n receive_results_between_20_24_female: #{receive_results_between_20_24_female}\n receive_results_between_20_24_male: #{receive_results_between_20_24_male}\n receive_results_between_25_49_female: #{receive_results_between_25_49_female}\n receive_results_between_25_49_male: #{receive_results_between_25_49_male}\n receive_results_more_than_50_female: #{receive_results_more_than_50_female}\n receive_results_more_than_50_male: #{receive_results_more_than_50_male}\n receive_results_less_than_15_female: #{receive_results_less_than_15_female}\n receive_results_less_than_15_male: #{receive_results_less_than_15_male}\n receive_results_more_than_15_female: #{receive_results_more_than_15_female}\n receive_results_more_than_15_male: #{receive_results_more_than_15_male}\n"
    $resultsOutput  << "\nTotal clients with positive resluts........................................................\n"
    $resultsOutput  << "total_clients_with_positive_results: #{total_clients_with_positive_results}\n clients_with_positive_results_less_1: #{clients_with_positive_results_less_1}\n clients_with_positive_results_between_1_and_9: #{clients_with_positive_results_between_1_and_9}\n clients_with_positive_results_between_10_14_female: #{clients_with_positive_results_between_10_14_female}\n clients_with_positive_results_between_10_14_male: #{clients_with_positive_results_between_10_14_male}\n clients_with_positive_results_between_15_19_female: #{clients_with_positive_results_between_15_19_female}\n clients_with_positive_results_between_15_19_male: #{clients_with_positive_results_between_15_19_male}\n clients_with_positive_results_between_20_24_female: #{clients_with_positive_results_between_20_24_female}\n clients_with_positive_results_between_20_24_male: #{clients_with_positive_results_between_20_24_male}\n clients_with_positive_results_between_25_49_female: #{clients_with_positive_results_between_25_49_female}\n clients_with_positive_results_between_25_49_male: #{clients_with_positive_results_between_25_49_male}\n clients_with_positive_results_more_than_50_female: #{clients_with_positive_results_more_than_50_female}\n clients_with_positive_results_more_than_50_male: #{clients_with_positive_results_more_than_50_male}\n clients_with_positive_results_less_than_15_female: #{clients_with_positive_results_less_than_15_female}\n clients_with_positive_results_less_than_15_male: #{clients_with_positive_results_less_than_15_male}\n clients_with_positive_results_more_than_15_female: #{clients_with_positive_results_more_than_15_female}\n clients_with_positive_results_more_than_15_male: #{clients_with_positive_results_more_than_15_male}\n"
  end

  if CDCDataExtraction == 1
    $resultsOutput.close()
  end
end

def self.clients_received_results(start_date, end_date, min_age = nil, max_age = nil, gender = [])
  if (max_age.blank? && min_age.blank?)
    condition = ""
  elsif (max_age.blank?)
    condition = "HAVING age  >= #{min_age}"
  else
    condition = "HAVING age BETWEEN #{min_age} and #{max_age}"
  end

  unless gender.blank?
    clients_received_results_records = ActiveRecord::Base.connection.select_all <<EOF
      SELECT
          o.person_id, p.birthdate, p.gender, (select timestampdiff(year, p.birthdate, DATE(o.obs_datetime))) AS age, DATE(o.obs_datetime), value_text
      FROM obs o
        INNER JOIN person p on p.person_id = o.person_id and p.voided = 0
      WHERE o.concept_id = 2169
      AND DATE(obs_datetime) <= '#{end_date}'
      AND DATE(obs_datetime) = (SELECT max(date(obs.obs_datetime)) FROM obs obs
      						  WHERE obs.person_id = o.person_id
      						  AND DATE(obs.obs_datetime) <= '#{end_date}'AND obs.voided = 0)
      AND o.voided = 0 AND p.gender = '#{gender}'
      GROUP BY o.person_id
      #{condition};
EOF
  else
    clients_received_results_records = ActiveRecord::Base.connection.select_all <<EOF
      SELECT
          o.person_id, p.birthdate, p.gender, (select timestampdiff(year, p.birthdate, DATE(o.obs_datetime))) AS age, DATE(o.obs_datetime), value_text
      FROM obs o
        INNER JOIN person p on p.person_id = o.person_id and p.voided = 0
      WHERE o.concept_id = 2169
      AND DATE(obs_datetime) <= '#{end_date}'
      AND DATE(obs_datetime) = (SELECT max(date(obs.obs_datetime)) FROM obs obs
      						  WHERE obs.person_id = o.person_id
      						  AND DATE(obs.obs_datetime) <= '#{end_date}'AND obs.voided = 0)
      AND o.voided = 0 AND p.gender IN ('Female','Male')
      GROUP BY o.person_id
      #{condition};
EOF
  end

  if clients_received_results_records.blank?
    result = 0
  else
    result = clients_received_results_records.count
  end
  return  result
end

def self.clients_with_positive_results(start_date, end_date, min_age = nil, max_age = nil, gender = [])
  if (max_age.blank? && min_age.blank?)
    condition = ""
  elsif (max_age.blank?)
    condition = "HAVING age  >= #{min_age}"
  else
    condition = "HAVING age BETWEEN #{min_age} and #{max_age}"
  end

  unless gender.blank?
    clients_with_positive_results_records = ActiveRecord::Base.connection.select_all <<EOF
      SELECT
          o.person_id, p.birthdate, p.gender, (select timestampdiff(year, p.birthdate, DATE(o.obs_datetime))) AS age, DATE(o.obs_datetime), value_text
      FROM obs o
        INNER JOIN person p on p.person_id = o.person_id and p.voided = 0
      WHERE o.concept_id = 2169
      AND DATE(obs_datetime) <= '#{end_date}'
      AND DATE(obs_datetime) = (SELECT max(date(obs.obs_datetime)) FROM obs obs
      						  WHERE obs.person_id = o.person_id
      						  AND DATE(obs.obs_datetime) <= '#{end_date}'AND obs.voided = 0
                    AND obs.value_text = 'Reactive')
      AND o.voided = 0 AND p.gender = '#{gender}'
      AND o.value_text = 'Reactive'
      GROUP BY o.person_id
      #{condition};
EOF
  else
    clients_with_positive_results_records = ActiveRecord::Base.connection.select_all <<EOF
      SELECT
          o.person_id, p.birthdate, p.gender, (select timestampdiff(year, p.birthdate, DATE(o.obs_datetime))) AS age, DATE(o.obs_datetime), value_text
      FROM obs o
        INNER JOIN person p on p.person_id = o.person_id and p.voided = 0
      WHERE o.concept_id = 2169
      AND DATE(obs_datetime) <= '#{end_date}'
      AND DATE(obs_datetime) = (SELECT max(date(obs.obs_datetime)) FROM obs obs
      						  WHERE obs.person_id = o.person_id
      						  AND DATE(obs.obs_datetime) <= '#{end_date}'AND obs.voided = 0
                    AND obs.value_text = 'Reactive')
      AND o.voided = 0 AND p.gender IN ('Female','Male')
      AND o.value_text = 'Reactive'
      GROUP BY o.person_id
      #{condition};
EOF
  end

  if clients_with_positive_results_records.blank?
    result = 0
  else
    result = clients_with_positive_results_records.count
  end
  return  result
end

start
