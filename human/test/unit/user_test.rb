require 'test_helper'

class UserTest < ActiveSupport::TestCase

  test "duplicate user_names" do
    user = users(:one)
    same_user = User.new(:user_name => users(:one).user_name,
                        :email => "sameuser@sameuser.com")
    assert !same_user.save, "Created user with the same name"
  end 

  test "empty user_name" do
    user = User.new(:email => users(:one).email)
    assert !user.save, "Can generate a user without a username"
  end
  
  test "user posts" do
    assert users(:one).posts.length == 3, "User doesn't have the expected number of posts"
    assert users(:two).posts.length == 3, "User doesn't have the expected number of posts"
  end
end
