# frozen_string_literal: true

require 'rails_helper'

describe Api::ImagesController do
  let(:image) { create(:image) }

  describe 'GET index' do
    it 'calls VideoService fetch_videos' do
      Giphy::GifService.expects(:search).once
      get :search, params: { q: 'dog' }
    end

    context "when Giphy::GifService communicates successfuly with Giphy's API" do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search').with(
          query: {
            q: 'dog',
            limit: 20,
            api_key: 'hu1GClEpq2kY77FICWNYInvhcGQO97TS'
          },
          headers: {
            'Accept' => '*/*'
          }
        ).to_return(
          status: 200,
          body: {
            data: [image]
          }.to_json,
          headers: {}
        )
      end

      it 'return status code 200' do
        get :search, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_truthy
      end
    end

    context "when Giphy::GifService does not communicate successfuly with Giphy's API" do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search').with(
          query: {
            q: 'dog',
            limit: 20,
            api_key: 'hu1GClEpq2kY77FICWNYInvhcGQO97TS'
          },
          headers: {
            'Accept' => '*/*'
          }
        ).to_return(status: 500)
      end

      it 'return status code 500' do
        get :search, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_falsey
      end
    end
  end
end
