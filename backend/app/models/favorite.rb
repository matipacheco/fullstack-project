# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :user

  validates :image_id, presence: true
  validates :image_id, uniqueness: true
end
