# frozen_string_literal: true

FactoryBot.define do
  factory :gif, class: OpenStruct do
    skip_create

    id { 'ID' }
    type { 'gif' }
    url { 'gif_url' }
  end
end
