# frozen_string_literal: true

module Api
  class UsersController < ApplicationController
    # Creates a user.
    # Params:
    # - user: Hash that comes inside the params. It containes username, password, and password_confirmation.
    def create
      @user = User.new(user_params)

      if @user.save
        login
        render json: {
          logged_in: true,
          user: @user
        }
      else
        render json: { 
          status: 500,
          errors: @user.errors.messages
        }
      end
    end
    
    private

    # Strong parameters validation for safety.
    # Params: -
    def user_params
      params.require(:user).permit(:username, :password, :password_confirmation)
    end
  end
end
