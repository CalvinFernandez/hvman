require 'test_helper'

class PostTest < ActiveSupport::TestCase
  fixtures :posts

  test "should create a post" do
    assert Post.create(:id => 1, 
        :user_id => 1, 
        :title => "post number 1", 
        :content => "this is post number 1", 
        :board_id => 1,
        :verified => false,
        :flag => 1), "Create a post failed"
  end
  test "verify information in created post" do
    post = Post.create(
        :user_id => 1, 
        :title => "post number 1", 
        :content => "this is post number 1", 
        :board_id => 1,
        :verified => false,
        :flag => 1)

    assert_equal post.user_id, posts(:one).user_id, "Post user_id does not match"
    assert_equal post.title, posts(:one).title, "Post title does not match"
    assert_equal post.content, posts(:one).content, "Post content does not match"
    assert_equal post.board_id, posts(:one).board_id, "Post board_id does not match"
    assert_equal post.verified, posts(:one).verified, "Post verified does not match"
    assert_equal post.flag, posts(:one).flag, "Post flag does not match"
  end
  test "post without title" do
    p = Post.new(:user_id => 1,
                :content => "this is post number 1",
                :board_id => 1,
                :verified => false,
                :flag => 1)

    assert !p.save, "Able to create post without title"
  end 
  test "post without content" do
    p = Post.new(:user_id => 1,
                :title => "post number 1",
                :board_id => 1,
                :verified => false,
                :flag => 1)
   
    assert !p.save, "Able to create post without content" 
  end
  test "post without user_id" do
    p = Post.new(:content => "this is post number 1",
                :title => "post number 1",
                :board_id => 1,
                :verified => false,
                :flag => 1)

    assert !p.save, "Able to create post without user_id"
  end
  test "post without board_id" do
    p = Post.new(:user_id => 1, 
                :content => "this is post number 1",
                :title => "post number 1",
                :verified => false,
                :flag => 1)

    assert !p.save, "Able to create post without board_id"
  end
end
