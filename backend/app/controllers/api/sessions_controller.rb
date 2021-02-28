# frozen_string_literal: true

module Api
  class SessionsController < ApplicationController
    # Creates session for a given user.
    # Params:
    # - user: Hash that comes inside the params. It containes both username and password.
    def create
      @user = User.find_by(username: user_params[:username])
    
      if @user && @user.authenticate(user_params[:password])
        login!
        render json: {
          logged_in: true,
          user: @user
        }
      else
        render json: { 
          status: 401,
          errors: ['Invalid credentials']
        }
      end
    end
  
    # Destroys session.
    # Params: -
    def destroy
      logout!
      render json: {
        status: 200,
        logged_out: true
      }
    end
    
    private

    # Strong parameters validation for safety.
    # Params: -
    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
end