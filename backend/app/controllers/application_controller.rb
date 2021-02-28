# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include SessionsHelper

  skip_before_action :verify_authenticity_token
end
