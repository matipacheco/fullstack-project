# frozen_string_literal: true

class Favorite < ApplicationRecord
  include ErrorHandlingConcern

  belongs_to :user

  validates :image_id, presence: true
  validates :image_id, uniqueness: { message: 'Image already in your favorites' }

  validates :search_term, presence: true

  # Given a favorite instance, this method returns a hash which has as key the related
  # image_id and as value the search term that led the user to find such image.
  # Params: -
  def search_hash
    { image_id => search_term }
  end
end
