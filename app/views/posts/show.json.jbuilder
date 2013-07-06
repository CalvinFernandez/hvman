json.(@post, :id, :title, :content, :user_id, :post_image, :flag, :link, :verified)

if user_signed_in? && @post.user_id == current_user.id 
  json.edit_url 'posts/#{@post.id}'
  json.delete_url 'posts/#{@post.id}'
end

json.tags @post.tag_list
