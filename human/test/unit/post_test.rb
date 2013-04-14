require 'test_helper'

class PostTest < ActiveSupport::TestCase
  test "post creation" do
    assert Post.create(:)
  end
end
