# frozen_string_literal: true

require 'rails_helper'

describe Favorite, type: :model do
  it { is_expected.to belong_to :user }
end
