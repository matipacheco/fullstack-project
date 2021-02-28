# frozen_string_literal: true

require 'rails_helper'

describe User, type: :model do
  it { is_expected.to have_many :favorites }
end
