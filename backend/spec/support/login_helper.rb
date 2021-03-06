# frozen_string_literal: true

module LoginHelper
  def login_as(user)
    session[:user_id] = user.id
  end
end
