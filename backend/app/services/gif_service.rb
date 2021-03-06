# frozen_string_literal: true

# Handles gif consumption through Giphy's API.
module Giphy
  class GifService
    include HTTParty

    BASE_URL = 'https://api.giphy.com/v1/gifs'

    # Returns a list of gifs that match a given search term.
    # Params:
    # - q: The search term.
    # - favorites_search_hash: Array of hashes for a given user with its favorite images data in the following format:
    #                         { image_id => search_term }
    # - limit: The maximum number of elements to be fetched.
    def self.search(q, favorites_search_hash = {}, limit = 20)
      merged_favorites = merge_hash(favorites_search_hash)

      response = get(BASE_URL + '/search', {
                       query: {
                         q: q,
                         limit: limit,
                         api_key: AppCredentials[:shared][:giphy][:api_key]
                       }
                     })
      return nil if response.code != 200

      parse_response(response).map do |image_data|
        deserialize(image_data, merged_favorites[image_data['id']])
      end
    end

    # Returns the information of a group of gifs.
    # Params:
    # - favorites_search_hash: Array of hashes for a given user with its favorite images data in the following format:
    #                         { image_id => search_term }
    def self.get_gifs(favorites_search_hash)
      merged_favorites = merge_hash(favorites_search_hash)

      response = get(BASE_URL, {
                       query: {
                         ids: merged_favorites.keys.join(','),
                         api_key: AppCredentials[:shared][:giphy][:api_key]
                       }
                     })
      return nil if response.code != 200

      parse_response(response).map do |image_data|
        deserialize(image_data, merged_favorites[image_data['id']])
      end
    end

    # Returns a single merged hash with a user's favorite images data.
    # Params:
    # - favorites_search_hash: Array of hashes with the following format { image_id => search_term }
    def self.merge_hash(favorites_search_hash = {})
      return {} if favorites_search_hash.blank?

      favorites_search_hash.inject(:merge)
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
    def self.deserialize(image_data, search_term = nil)
      Image.new(
        id: image_data['id'],
        title: image_data['title'],
        images: image_data['images'],
        search_term: search_term
      )
    end
  end
end
