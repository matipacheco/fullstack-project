class AddIndexToImageId < ActiveRecord::Migration[6.0]
  def change
    add_index :favorites, :image_id
  end
end
