# frozen_string_literal: true

# Handles gif consumption through Giphy's API.
module Giphy
  class GifService
    include HTTParty

    BASE_URL = 'https://api.giphy.com/v1/gifs'

    # Returns a list of gifs that match a given search term.
    # Params:
    # - q: The search term.
    # - limit: The maximum number of elements to be fetched.
    def self.search(q, limit = 10)
      response = get(BASE_URL + '/search', {
                       query: {
                         q: q,
                         limit: limit,
                         api_key: AppCredentials[:shared][:giphy][:api_key]
                       }
                     })
      return nil if response.code != 200

      parse_response(response).map do |image_data|
        deserialize(image_data)
      end
    end

    # Returns the information of a group of gifs.
    # Params:
    # - gif_ids: List of Giphy's IDs.
    def self.get_gifs(gif_ids)
      response = get(BASE_URL, {
                       query: {
                         ids: gif_ids.join(','),
                         api_key: AppCredentials[:shared][:giphy][:api_key]
                       }
                     })
      return nil if response.code != 200

      parse_response(response).map do |image_data|
        deserialize(image_data)
      end
    end

    # Parses API JSON response into a readable hash.
    # Params:
    # - response: API's response.
    # - field: Specific field of the API response that wants to be parsed.
    def self.parse_response(response, field = 'data')
      JSON.parse(response.body)[field]
    end

    # Transforms the API response into a Image instance.
    # Params:
    # - image_data: Image's information returned by the API.
    def self.deserialize(image_data)
      Image.new(
        id: image_data['id'],
        title: image_data['title'],
        images: image_data['images']
      )
    end
  end
end
