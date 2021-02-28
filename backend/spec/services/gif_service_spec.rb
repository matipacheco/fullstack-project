# frozen_string_literal: true

require 'rails_helper'

describe Giphy::GifService do
  let(:image) { create(:image) }

  describe 'search_method' do
    context 'when API responds successfully' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search')
          .with(query: { q: 'dog', limit: 10, api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(
            status: 200,
            body: {
              data: [image]
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

  describe 'get_gifd method' do
    let!(:second_image) { create(:image, id: 'ID2') }

    context 'when API responds successfully' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs')
          .with(query: { ids: 'ID,ID2', api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(
            status: 200,
            body: {
              data: [image, second_image]
            }.to_json
          )
      end

      it "returns API's response" do
        response = described_class.get_gifs([image.id, second_image.id])
        expect(response).not_to be_empty
      end
    end

    context 'when API responds with error' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs')
          .with(query: { ids: 'ID,ID2', api_key: AppCredentials[:shared][:giphy][:api_key]})
          .to_return(status: 500)
      end

      it "returns nil response" do
        expect(described_class.get_gifs([image.id, second_image.id])).to be_nil
      end
    end
  end
end
