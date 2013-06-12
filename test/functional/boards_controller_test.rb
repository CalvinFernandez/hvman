require 'test_helper'

class BoardsControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  fixtures :all

  def setup
    @userone = users(:one)
    @boardone = boards(:one)
  end
  
  test "get index" do
    response = get :index    
    assert_response :success
    
    response_json = JSON.parse(response.body)
    assert_equal response_json.size, 2, "Didn't return the correct number of boards"
  end 
  
  test "get board" do
    response = get :show, :id => @boardone.id   
    assert_response :success

    response_json = JSON.parse(response.body)
    assert_equal response_json["id"], @boardone.id, "Not the correct board"
  end

  test "can't create board unless logged in" do
    response = post :create, :board => {:title => "boardthree"} 
    assert_equal Board.count, 2, "Created a board without logging in"  
  end

  test "create a board" do
    sign_in @userone
    response = post :create, :board => {:title => "boardthree"}
    assert_equal Board.count, 3, "Couldn't create a board"
    sign_out @userone
  end
end
