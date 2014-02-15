class TomatoSearchesController < ApplicationController


  def new
    @searchTerm = params[:SearchInput]
    @result = searchRottenTomatoes(@searchTerm)
  end
end
