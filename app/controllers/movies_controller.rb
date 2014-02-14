class MoviesController < ApplicationController
  def new
    @movie = Movie.new
  end

  def search
    @SearchInput = params[:SearchInput]
  end
end
