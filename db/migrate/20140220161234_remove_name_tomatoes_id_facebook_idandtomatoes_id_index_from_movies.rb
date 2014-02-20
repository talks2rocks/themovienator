class RemoveNameTomatoesIdFacebookIdandtomatoesIdIndexFromMovies < ActiveRecord::Migration
  def change
    remove_index :movies, :tomatoes_id

    remove_column :movies, :name
    remove_column :movies, :tomatoes_id
    remove_column :movies, :facebook_id
  end
end
