# frozen_string_literal: true

module SessionsHelper
  # Stores in the session the logged user ID.
  # Params: -
  def login
    session[:user_id] = @user.id
  end

  # Returns logged user data.
  # Params: -
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  # Checks if theres a user logged in.
  # Params: -
  def logged_in?
    current_user.present?
  end

  # Logs user out.
  # Params: -
  def logout
    session.clear
  end
end
