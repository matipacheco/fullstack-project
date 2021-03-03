# frozen_string_literal: true

class User < ApplicationRecord
  include ErrorHandlingConcern

  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true

  validates :password, presence: true
  validates :password, length: { minimum: 6 }

  has_many :favorites
end
