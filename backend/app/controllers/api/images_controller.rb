# frozen_string_literal: true

module Api
  class ImagesController < ApplicationController
    before_action :permit_search_params, only: :index

    # Returns a list of giphs that match a given search term.
    # Params:
    # - q: The search term.
    def index
      return render json: { success: false } unless (response = Giphy::GiphService.search(params[:q]))

      render json: {
        success: true,
        data: response
      }
    end

    private

    # Strong parameters validation for safety.
    # Params: -
    def permit_search_params
      params.permit(:q)
    end
  end
end
