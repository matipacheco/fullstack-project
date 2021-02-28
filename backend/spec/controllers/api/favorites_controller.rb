# frozen_string_literal: true

require 'rails_helper'

describe Api::FavoritesController do
  let(:user) { create(:user) }

  describe 'POST create' do
    context 'user is not logged in' do
      it 'returns error' do
        post :create, params: { favorite: { user_id: user.id, image_id: 'ID' } }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq(401)
        expect(parsed_response['errors']).to eq('Unauthorized')
      end
    end

    context 'user is logged in' do
      before { login_as(user) }

      it 'sets an image as favorite' do
        expect(user.favorites.size).to eq(0)

        post :create, params: { favorite: { user_id: user.id, image_id: 'ID' } }

        expect(user.favorites.reload.size).to eq(1)

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['success']).to be_truthy
        expect(parsed_response['favorite']).to be_any
      end
    end
  end

  describe 'DELETE destroy' do
    let!(:favorite) { create(:favorite, user: user) }

    context 'user is not logged in' do
      it 'returns error' do
        delete :destroy, params: { id: favorite.id }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq(401)
        expect(parsed_response['errors']).to eq('Unauthorized')
      end
    end

    context 'user is logged in' do
      before { login_as(user) }

      it 'deletes favorite image' do
        expect(user.favorites.size).to eq(1)

        delete :destroy, params: { id: favorite.id }

        expect(user.favorites.reload.size).to eq(0)

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['success']).to be_truthy
      end
    end
  end
end
