# frozen_string_literal: true

require 'rails_helper'

describe Api::SessionsController do
  let(:user) { create(:user) }

  describe 'POST create' do
    context 'when credentials are valid' do
      it 'creates session' do
        post :create, params: { user: { username: user.username, password: user.password } }

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

  describe 'DELETE destroy' do
    before { login_as(user) }

    it 'destroys the session' do
      expect(session).to be_any

      delete :destroy

      expect(session).to be_empty
    end
  end

  describe 'GET user_logged_in?' do
    context 'when user is logged in' do
      before { login_as(user) }

      it 'returns user data' do
        get :user_logged_in?

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_truthy
        expect(parsed_response['user']).to be_any
      end
    end

    context 'when user not is logged in' do
      it 'returns user data' do
        get :user_logged_in?

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['logged_in']).to be_falsey
        expect(parsed_response['user']).to be_nil
      end
    end
  end
end
