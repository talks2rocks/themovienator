class AddIndextoMovies < ActiveRecord::Migration
  def change
    add_index :movies, :rt_id, unique: true
  end
end
