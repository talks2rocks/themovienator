require 'spec_helper'

describe Movie do

  before { @movie = Movie.new(name: "Example Move", tomatoes_id: "12345678", facebook_id: "12345678") }

  subject { @movie }

  it { should respond_to(:name) }
  it { should respond_to(:tomatoes_id) }
  it { should respond_to(:facebook_id) }
end
