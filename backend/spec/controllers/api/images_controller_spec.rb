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
      it 'return status code 200' do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(
            status: 200,
            body: {
              data: [image]
            }.to_json
          )

        get :search, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_truthy
      end
    end

    context "when Giphy::GifService does not communicate successfuly with Giphy's API" do
      it 'return status code 500' do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(status: 500)

        get :search, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_falsey
      end
    end
  end
end
