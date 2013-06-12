require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  include Devise::TestHelpers
  fixtures :all
  
  def setup
    @userone = users(:one)
    @usertwo = users(:two)
    sign_in @userone
  end
  
  test "should get user index" do 
    response = get :index
    assert_response :success
    response_json = JSON.parse(response.body)
    assert_equal response_json.size, 2 
  end

  test "should show userone" do
    response = get :show, :id => @userone.id
    assert_response :success

    response_json = JSON.parse(response.body)
    assert_equal response_json["user_name"], @userone.user_name
    assert_equal response_json["id"], @userone.id
  end
end
