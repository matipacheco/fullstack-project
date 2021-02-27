# frozen_string_literal: true

# Handles giph consumption through Giphy's API.
module Giphy
  class GiphService
    include HTTParty

    BASE_URL = 'https://api.giphy.com/v1/gifs/'

    # Returns a list of giphs that match a given search term.
    # Params:
    # - q: The search term.
    # - limit: The maximum amount of elements to be fetched.
    def self.search(q, limit = 10)
      response = get(BASE_URL + 'search', { query: { q: q, limit: limit, api_key: AppCredentials[:shared][:giphy][:api_key] } })
      return nil unless response.code != 200

      response['data']
    end
  end
end
