class TomatoSearchesController < ApplicationController
  @@list = []
  @@counter = 0

  def new
    gon.movies = ""


  end

  def results

    @@counter = 0
    @@list =[]
    @rawSearch = params[:SearchInput]
    @searchArray =  @rawSearch.split(/\n/)
    @searchArray.each do |searchTerm|
      searchResult = searchRottenTomatoes(searchTerm)
      @@list.push(searchResult)
    end

    @movie = @@list[@@counter]

    render json: @movie
  end

  def next
    @@counter += 1

    @movie = @@list[@@counter]

    render json: @movie

  end

end
