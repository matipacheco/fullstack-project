# frozen_string_literal: true

FactoryBot.define do
  factory :image, class: OpenStruct do
    skip_create

    id { 'ID' }
    title { 'Sample title' }
    images { { fixed_height_small: { url: 'original_url' }, original: { url: 'original_url' } } }
  end

  factory :user, class: User do
    username { 'Cool guy' }
    password { 'megasecretpassword' }
  end

  factory :favorite, class: Favorite do
    user
    image_id { 'gif_id' }
  end
end
