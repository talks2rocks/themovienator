class CreateTomatoSearches < ActiveRecord::Migration
  def change
    create_table :tomato_searches do |t|
      t.string :name

      t.timestamps
    end
  end
end
