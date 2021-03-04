# frozen_string_literal: true

require 'rails_helper'

describe Giphy::GifService do
  let(:user) { create(:user) }
  let(:image) { create(:image) }
  let(:favorite) { create(:favorite, user: user, image_id: image.id) }

  describe 'search_method' do
    context 'when API responds successfully' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search?api_key=hu1GClEpq2kY77FICWNYInvhcGQO97TS&limit=20&q=dog')
          .with(
            headers: {
              'Accept' => '*/*',
              'User-Agent' => 'Ruby',
              'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3'
            }
        )
          .to_return(
            status: 200,
            body: {
              data: [image]
            }.to_json,
            headers: {}
        )
      end

      it "returns API's response" do
        response = described_class.search('dog')
        expect(response).not_to be_empty
      end
    end

    context 'when API responds with error' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs/search?api_key=hu1GClEpq2kY77FICWNYInvhcGQO97TS&limit=20&q=dog')
          .with(
            headers: {
              'Accept' => '*/*',
              'User-Agent' => 'Ruby',
              'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3'
            }
        )
          .to_return(status: 500)
      end

      it 'returns nil response' do
        expect(described_class.search('dog')).to be_nil
      end
    end
  end

  describe 'get_gifs method' do
    let(:second_image) { create(:image, id: 'ID2') }
    let(:second_favorite) { create(:favorite, user: user, image_id: second_image.id) }

    context 'when API responds successfully' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs')
          .with(query: { ids: 'ID,ID2', api_key: AppCredentials[:shared][:giphy][:api_key] })
          .to_return(
            status: 200,
            body: {
              data: [image, second_image]
            }.to_json
          )
      end

      it "returns API's response" do
        response = described_class.get_gifs([
                                              { image.id => favorite.search_term },
                                              { second_image.id => second_favorite.search_term }
                                            ])
        expect(response).not_to be_empty
      end
    end

    context 'when API responds with error' do
      before do
        stub_request(:get, 'https://api.giphy.com/v1/gifs')
          .with(query: { ids: 'ID,ID2', api_key: AppCredentials[:shared][:giphy][:api_key] })
          .to_return(status: 500)
      end

      it 'returns nil response' do
        expect(described_class.get_gifs([
                                          { image.id => favorite.search_term },
                                          { second_image.id => second_favorite.search_term }
                                        ])).to be_nil
      end
    end
  end
end
