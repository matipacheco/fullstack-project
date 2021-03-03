# frozen_string_literal: true

module ErrorHandlingConcern
  include ActiveSupport::Concern

  # Returns a hash of a model instance errors with the following format:
  # { attribute: ["Attribute has/is...."] }
  # Params: -
  def formatted_errors
    hash = {}
    errors.each do |attribute, message|
      hash[attribute] = ["#{attribute.to_s.capitalize} #{message}"]
    end

    hash
  end

  # Returns an specific attribute's model instance errors
  # Params: -
  def errors_for(attribute)
    errors.messages[attribute.to_sym]
  end
end
