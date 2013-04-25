require 'test_helper'

class BoardTest < ActiveSupport::TestCase
  test "basic" do
    assert_equal boards(:one).posts.length, 3, "Incorrect number of posts"   
    assert_equal boards(:two).posts.length, 3, "Incorrect number of posts"
  end    
  test "validations" do
    newboard = Board.new
    assert !newboard.save, "Able to save a board without a title"
  end
end
