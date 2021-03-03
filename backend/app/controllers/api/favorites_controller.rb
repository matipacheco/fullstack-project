# frozen_string_literal: true

module Api
  class FavoritesController < ApplicationController
    before_action :require_login, only: %i[index create destroy]

    # Lists all user's favorite images
    # Params:
    # - user_id: User's ID.
    def index
      @favorite_ids = current_user.favorites.pluck(:image_id)
    
      if (response = Giphy::GifService.get_gifs(@favorite_ids))
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
      @favorite = current_user.favorites.new(image_id)
    
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
    def image_id
      params.permit(:image_id)
    end

    # Strong parameters validation for safety.
    # Params: -
    def favorite_id
      params.permit(:id)['id']
    end
  end
end
