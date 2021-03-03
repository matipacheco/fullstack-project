# frozen_string_literal: true

class Favorite < ApplicationRecord
  include ErrorHandlingConcern

  belongs_to :user

  validates :image_id, presence: true
  validates :image_id, uniqueness: { message: 'Image already in your favorites' }

  validates :search_term, presence: true

  def search_hash
    { image_id => search_term }
  end
end
