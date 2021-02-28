# frozen_string_literal: true

# Class used to store at an application level, the API image responses.
# When fetching video data through Giphy's API, responses are deserialized and transformed into instances of this class.
class Image
  include ActiveModel::Model
  include ActiveModel::Callbacks

  attr_accessor :id, :title, :images, :url

  def initialize(attributes = {})
    super

    @url = build_url
  end
  
  # Returns a URL for the image.
  # Returns as default the *fixed_height_small* URL inside the images array field.
  # If that field is not found, it returns the URL of the original image in the array.
  # Params: -
  def build_url
    return unless @images

    fixed_height_small = @images['fixed_height_small']
    fixed_height_small.present? ? fixed_height_small['url'] : @images['original']['url']
  end
end
