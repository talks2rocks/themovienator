class Movie < ActiveRecord::Base
  validates :title, presence: true
  validates :rt_id, presence: true, uniqueness: true
end
