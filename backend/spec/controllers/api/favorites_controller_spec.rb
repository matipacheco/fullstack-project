# frozen_string_literal: true

require 'rails_helper'

describe Api::FavoritesController do
  let(:user) { create(:user) }

  describe 'GET index' do
    let!(:favorite) { create(:favorite, user: user) }

    before do
      stub_request(:get, 'https://api.giphy.com/v1/gifs')
        .with(query: { ids: favorite.image_id.to_s, api_key: AppCredentials[:shared][:giphy][:api_key]})
        .to_return(
          status: 200,
          body: {
            data: [favorite]
          }.to_json
        )      
    end

    context 'user is not logged in' do
      it 'returns error' do
        get :index, params: { user_id: user.id }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq(401)
        expect(parsed_response['errors']).to eq('Unauthorized')
      end
    end

    context 'user is logged in' do
      before { login_as(user) }

      it 'sets an image as favorite' do
        get :index, params: { user_id: user.id }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['success']).to be_truthy
        expect(parsed_response['favorites']).to be_truthy
      end
    end
  end

  describe 'POST create' do
    context 'user is not logged in' do
      it 'returns error' do
        post :create, params: { image_id: 'ID' }

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['status']).to eq(401)
        expect(parsed_response['errors']).to eq('Unauthorized')
      end
    end

    context 'user is logged in' do
      before { login_as(user) }

      it 'sets an image as favorite' do
        expect(user.favorites.size).to eq(0)

        post :create, params: { image_id: 'ID' }

        expect(user.favorites.reload.size).to eq(1)

        parsed_response = JSON.parse(response.body)
        expect(parsed_response['success']).to be_truthy
        expect(parsed_response['favorite']).to be_any
      end

      context 'when favorite with image ID already exists' do
        let!(:favorite) { create(:favorite, user: user, image_id: 'SomeID') }

        it 'sets an image as favorite' do
          post :create, params: { image_id: 'SomeID' }

          parsed_response = JSON.parse(response.body)
          expect(parsed_response['success']).to be_falsey
          expect(parsed_response['errors']).to be_any
        end
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
