class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :name
      t.string :tomatoes_id
      t.string :facebook_id

      t.timestamps
    end
  end
end
