# frozen_string_literal: true

class OpenStruct

  # Overrides OpenStruct as_json method so that it does not return the table field.
  # Params: -
  def as_json(options = nil)
    @table.as_json(options)
  end 
end
