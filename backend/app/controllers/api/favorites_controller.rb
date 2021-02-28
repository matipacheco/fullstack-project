# frozen_string_literal: true

module Api
  class FavoritesController < ApplicationController
    before_action :require_login, only: %i[index create destroy]

    # Lists all user's favorite images
    # Params:
    # - user_id: User's ID.
    def index
      @favorite_ids = Favorite.where(user_id: user_id).pluck(:image_id)
    
      if (response = Giphy::GifService.get_gifs(@favorite_ids))
        render json: {
          success: true,
          data: response
        }
      else
        render json: { 
          status: 500,
          errors: @favorite.errors.messages
        }
      end
    end

    # Set as image as favorite.
    # Params:
    # - favorite: Hash that comes inside the params. It containes user_id and image_id.
    def create
      @favorite = Favorite.new(favorite_params)
    
      if @favorite.save
        render json: {
          success: true,
          favorite: @favorite
        }
      else
        render json: { 
          status: 500,
          errors: @favorite.errors.messages
        }
      end
    end

    # Removes an image from favorites.
    # Params:
    # - id: Favorite image ID.
    def destroy
      @favorite = Favorite.find(favorite_id['id'])
    
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
    def user_id
      params.permit(:user_id)
    end

    # Strong parameters validation for safety.
    # Params: -
    def favorite_params
      params.require(:favorite).permit(:user_id, :image_id)
    end

    # Strong parameters validation for safety.
    # Params: -
    def favorite_id
      params.permit(:id)
    end
  end
end
