class AddSearchTermToFavorites < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :search_term, :string, after: :image_id
  end
end
