# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true

  validates :password, presence: true
  validates :password, length: { minimum: 6 }

  has_many :favorites

  def formatted_errors
    hash = {}
    errors.each do |attribute, message|
      hash[attribute] = "#{attribute.to_s.capitalize} #{message}"
    end

    hash
  end
end
