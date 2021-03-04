# frozen_string_literal: true

class User < ApplicationRecord
  include ErrorHandlingConcern

  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true

  validates :password, presence: true
  validates :password, length: { minimum: 6 }

  has_many :favorites

  # Method that returns a list of the search_hash of each favorite image.
  # Params: -
  def favorites_search_hash
    return [] unless user_favorites = favorites

    user_favorites.map(&:search_hash)
  end
end
