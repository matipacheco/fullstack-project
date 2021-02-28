# frozen_string_literal: true

# Handles gif consumption through Giphy's API.
module Giphy
  class GifService
    include HTTParty

    BASE_URL = 'https://api.giphy.com/v1/gifs/'

    # Returns a list of gifs that match a given search term.
    # Params:
    # - q: The search term.
    # - limit: The maximum number of elements to be fetched.
    def self.search(q, limit = 10)
      response = get(BASE_URL + 'search', { query: { q: q, limit: limit, api_key: AppCredentials[:shared][:giphy][:api_key] } })
      return nil if response.code != 200

      response['data']
    end
  end
end
