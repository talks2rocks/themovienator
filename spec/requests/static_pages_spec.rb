require 'spec_helper'

describe "Static pages" do
  describe "Home page" do
    it "it should have content 'the Movienator'" do
      visit "/"
      expect(page).to have_content("the Movienator")
    end
  end
end
