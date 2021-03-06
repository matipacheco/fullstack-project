# frozen_string_literal: true

require 'rails_helper'

describe Api::UsersController do
  describe 'POST create' do
    context 'when credentials are valid' do
      it 'creates user' do
        post :create, params: { user: { username: 'Mati', password: 'supersecret', password_confirmation: 'supersecret' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_truthy
        expect(parsed_response['user']).to be_any
        expect(parsed_response['errors']).to be_nil
      end
    end

    context 'when username is not present' do
      it 'returns error' do
        post :create, params: { user: { username: nil, password: 'supersecret', password_confirmation: 'supersecret' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_nil
        expect(parsed_response['user']).to be_nil
        expect(parsed_response['errors']).to be_any
      end
    end

    context 'when password and password_confirmation are different' do
      it 'returns error' do
        post :create, params: { user: { username: 'Mati', password: 'supersecret', password_confirmation: 'notsecretatall' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_nil
        expect(parsed_response['user']).to be_nil
        expect(parsed_response['errors']).to be_any
      end
    end

    context 'when password is too short' do
      it 'returns error' do
        post :create, params: { user: { username: 'Mati', password: 'sup', password_confirmation: 'sup' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_nil
        expect(parsed_response['user']).to be_nil
        expect(parsed_response['errors']).to be_any
      end
    end
  end
end
