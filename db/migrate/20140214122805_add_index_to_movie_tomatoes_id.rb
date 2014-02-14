class AddIndexToMovieTomatoesId < ActiveRecord::Migration
  def change
    add_index :movies, :tomatoes_id, unique: true
  end
end
