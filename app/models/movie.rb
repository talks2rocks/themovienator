class Movie < ActiveRecord::Base
  validates :name, presence: true

end
