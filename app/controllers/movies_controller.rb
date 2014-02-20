class MoviesController < ApplicationController
  protect_from_forgery

  def new
    @title = params[:title]
    @year = params[:year]
    @rt_id = params[:rt_id]

    @movie = Movie.new(title: @title, year: @year, rt_id: @rt_id)

    @movie.save

    redirect_to :back
  end

  def search
    @SearchInput = params[:SearchInput]
  end
end
