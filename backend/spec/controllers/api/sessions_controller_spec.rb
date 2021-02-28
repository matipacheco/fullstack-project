# frozen_string_literal: true

require 'rails_helper'

describe Api::SessionsController do
  let(:user) do
    user = User.new(username: 'Mati', password: 'supersecret')
    user.save
  end

  describe 'POST create' do
    before { user }

    context 'when credentials are valid' do
      it 'creates session' do
        post :create, params: { user: { username: 'Mati', password: 'supersecret' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_truthy
        expect(parsed_response['user']).to be_any
        expect(parsed_response['errors']).to be_nil
      end
    end

    context 'when credentials are invalid' do
      it 'returns error' do
        post :create, params: { user: { username: 'Mati', password: 'wrongpassword' } }
        
        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_nil
        expect(parsed_response['user']).to be_nil
        expect(parsed_response['errors']).to be_any
      end
    end
  end
end
