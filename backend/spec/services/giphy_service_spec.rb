# frozen_string_literal: true

require 'rails_helper'

describe Giphy::GiphService do
  describe 'Service consumption' do
    let(:giph_data) do
      {
        'id' => 'ID',
        'type' => 'giph',
        'url' => 'giph_url'
      }
    end

    context 'when API responds successfully' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(
            status: 200,
            body: {
              data: [giph_data]
            }.to_json
          )
      end

      it "returns API's response" do
        response = described_class.search('dog')
        expect(response).not_to be_empty
      end
    end

    context 'when API responds with error' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(status: 500)
      end

      it "returns nil response" do
        expect(described_class.search('dog')).to be_nil
      end
    end
  end
end
