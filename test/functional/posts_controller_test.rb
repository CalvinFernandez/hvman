require 'test_helper'

class PostsControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  fixtures :all

  def setup
    @userone = users(:one)
    @boardone = boards(:one)
    @postone = posts(:one)
  end
  
  test "get index" do
    response = get :index    
    assert_response :success
    
    response_json = JSON.parse(response.body)
    assert_equal response_json.size, 6, "Didn't return the correct number of posts"
  end 

  test "get user index" do 
    response = get :index, :user_id => @userone.id
    assert_response :success
    response_json = JSON.parse(response.body)
    assert_equal response_json.size, @userone.posts.size, "Didn't get the user's posts"
  end

  test "get board index" do
    response = get :index, :board_id => @boardone.id
    assert_response :success
    response_json = JSON.parse(response.body)
    assert_equal response_json.size, @boardone.posts.size, "Didn't get the board's posts"
  end

  test "get post" do
    response = get :show, :id => @postone.id   
    assert_response :success

    response_json = JSON.parse(response.body)
    assert_equal response_json["id"], @postone.id, "Not the correct post"
  end

  test "can't create post unless logged in" do
    assert_difference('Post.count', 0) do
      response = post :create, :post => {:title => "newpost", :content => "poststuffff", :user_id => @userone.id, :board_id => @boardone.id } 
    end
  end

  test "create a post" do
    sign_in @userone
    response = []
    assert_difference('Post.count', 1) do
      response = post :create, :post => {:title => "newpost", :content => "poststuffff", :user_id => @userone.id, :board_id => @boardone.id } 
    end
    json_response = JSON.parse(response.body)
    assert_equal json_response["title"], "newpost"
  end
end
