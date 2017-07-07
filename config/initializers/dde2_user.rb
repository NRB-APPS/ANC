if (CoreService.get_global_property_value('create.from.dde.server').to_s == "true" rescue false)
  token = DDE2Service.authenticate rescue nil
  if !token || token.blank?
		token = DDE2Service.authenticate_by_admin
    DDE2Service.add_user(token) rescue nil
  end
end
