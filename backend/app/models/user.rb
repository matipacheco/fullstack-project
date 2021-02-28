# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true

  has_many :favorites
end
