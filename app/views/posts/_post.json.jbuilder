json.(post, :id, :title, :content, :user_id, :post_image, :flag, :link, :verified)
if user_signed_in?
  if post.user_id == current_user.id
    json.edit_url 'posts/#{post.id}'
    json.delete_url 'posts/#{post.id}'
  end
  json.voted_for current_user.voted_for?(post)
  json.voted_against current_user.voted_against?(post)
  json.plusminus post.plusminus
end

json.tags post.tag_list
