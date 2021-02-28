# frozen_string_literal: true

module Api
  class ImagesController < ApplicationController
    before_action :permit_search_params, only: :search

    # Returns a list of gifs that match a given search term.
    # Params:
    # - q: The search term.
    def search
      return render json: { success: false, status: 500 } unless (response = Giphy::GifService.search(params[:q]))

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
