# frozen_string_literal: true

# Class used to store at an application level, the API image responses.
# When fetching video data through Giphy's API, responses are deserialized and transformed into instances of this class.
class Image
  include ActiveModel::Model

  attr_accessor :id, :title, :images, :url

  def initialize(attributes = {})
    super

    @url = original_url
  end
  
  # Returns a URL for the image.
  # Returns the URL that sotres the image at its original size.
  # (Original size needed to show in a better way the images in the frontend app)
  # Params: -
  def original_url
    return unless @images

    @images['original']['url']
  end
end
