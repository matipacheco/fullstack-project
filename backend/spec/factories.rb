# frozen_string_literal: true

FactoryBot.define do
  factory :gif, class: OpenStruct do
    skip_create

    id { 'ID' }
    type { 'gif' }
    url { 'gif_url' }
  end

  factory :user, class: User do
    username { 'Cool guy' }
    password_digest { 'megasecretpassword' }
  end

  factory :favorite, class: Favorite do
    user
    image_id { 'gif_id' }
  end
end
