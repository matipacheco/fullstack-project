# frozen_string_literal: true

require 'rails_helper'

describe Api::ImagesController do
  let(:giph) { create(:giph) }

  describe 'GET index' do
    it 'calls VideoService fetch_videos' do
      Giphy::GiphService.expects(:search).once
      get :index, params: { q: 'dog' }
    end

    context "when Giphy::GiphService communicates successfuly with Giphy's API" do
      it 'return status code 200' do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(
            status: 200,
            body: {
              data: [giph]
            }.to_json
          )

        get :index, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_truthy
      end
    end

    context "when Giphy::GiphService does not communicate successfuly with Giphy's API" do
      it 'return status code 500' do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(status: 500)

        get :index, params: { q: 'dog' }
        expect(JSON.parse(response.body)['success']).to be_falsey
      end
    end
  end
end
