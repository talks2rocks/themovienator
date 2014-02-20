class AddYearAndRtIdToMovie < ActiveRecord::Migration
  def change
    add_column :movies, :year, :integer
    add_column :movies, :rt_id, :integer
  end
end
