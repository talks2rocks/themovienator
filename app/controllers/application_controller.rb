require 'rubygems'
require 'rottentomatoes'
include RottenTomatoes
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def searchRottenTomatoes(query)
    # setup your API key
    Rotten.api_key = "u9mpgs79b9pzcsa7wuvmvr6g"
    @movie = RottenMovie.find(:title => "#{query}")
    if @movie.kind_of?(Array)
      return @movie[0]
    else
      return @movie
    end
  end
end
