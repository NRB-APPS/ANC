class GeneralSet < ActiveRecord::Base
  set_table_name "dset"
  set_primary_key "set_id"

  has_many :drug_sets, :foreign_key => :set_id, :conditions => {:voided => 0}

  def activate

    self.update_attributes(:status => "active")
  end

  def deactivate

    self.update_attributes(:status => "inactive")
  end

end
