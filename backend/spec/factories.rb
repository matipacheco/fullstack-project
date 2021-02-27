# frozen_string_literal: true

FactoryBot.define do
  factory :giph, class: OpenStruct do
    skip_create

    id { 'ID' }
    type { 'giph' }
    url { 'giph_url' }
  end
end
