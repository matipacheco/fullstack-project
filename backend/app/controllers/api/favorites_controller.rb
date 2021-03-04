# frozen_string_literal: true

module Api
  class FavoritesController < ApplicationController
    before_action :require_login, only: %i[index create destroy]

    # Lists all user's favorite images
    # Params: -
    def index
      if (response = Giphy::GifService.get_gifs(current_user.favorites_search_hash))
        render json: {
          success: true,
          favorites: response
        }
      else
        render json: { 
          status: 500,
          errors: ["Unable to fetch data"]
        }
      end
    end

    # Set as image as favorite.
    # Params:
    # - favorite: Hash that comes inside the params. It containes user_id and image_id.
    def create
      @favorite = current_user.favorites.new(favorite_params)

      if @favorite.save
        render json: {
          status: 201,
          success: true,
          favorite: @favorite
        }
      else
        render json: { 
          status: 500,
          errors: @favorite.errors_for(:image_id)
        }
      end
    end

    # Removes an image from favorites.
    # Params:
    # - favorite: Hash that comes inside the params. It containes just the image_id.
    def destroy
      @favorite = current_user.favorites.find_by(favorite_params)

      if @favorite.destroy
        render json: {
          status: 204,
          success: true
        }
      else
        render json: { 
          status: 500,
          errors: @favorite.errors.messages
        }
      end
    end

    private

    # Strong parameters validation for safety.
    # Params: -
    def favorite_params
      params.require(:favorite).permit(:image_id, :search_term)
    end
  end
end
