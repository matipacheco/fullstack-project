# frozen_string_literal: true

module Api
  class FavoritesController < ApplicationController
    before_action :require_login, only: %i[index create destroy]

    # Lists all user's favorite images
    # Params: -
    def index
      if (response = Giphy::GifService.get_gifs(current_user.favorites.map(&:search_hash)))
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
    # - id: Favorite image ID.
    def destroy
      @favorite = Favorite.find(favorite_id)

      if @favorite.destroy
        render json: {
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

    # Strong parameters validation for safety.
    # Params: -
    def favorite_id
      params.permit(:id)['id']
    end
  end
end
