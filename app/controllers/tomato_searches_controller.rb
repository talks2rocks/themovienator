class TomatoSearchesController < ApplicationController


  def new
    @searchTerm = params[:SearchInput]
    gon.movies = searchRottenTomatoes(@searchTerm)
  end
end
