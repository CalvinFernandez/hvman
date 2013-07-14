class PostsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]

  def index
    @posts = []  
    if params[:user_id]
      @posts = Post.find_all_by_user_id(params[:user_id])
    elsif params[:board_id]
      @posts = Post.find_all_by_board_id(params[:board_id])
    else
      @posts = Post.paginated(:page => params[:page])
    end
    @posts
  end

  def create
    @post = current_user.posts.new(params[:post])
    if @post.valid?
      if params[:tags] 
        @post.tag_list.add(params[:tags])    
      end
      @post.save
      render :json => @post
    else
      render :json => {}, :status => 500
    end
  end

  def destroy
    post = current_user.posts.find_by_id(params[:id])
    if post
      post.destroy
      render :json => {}, :status => 200
    else
      render :json => {}, :status => 404
    end
  end

  def update
    @post = current_user.posts.find_by_id(params[:id])
    if @post
      @post.update_attributes(params[:post])
      render :json => @post
    else
      render :json => {}, :status => 404
    end
  end 

  def show
    @post = Post.find_by_id(params[:id])
    if @post
      @post
    else
      render :json => {}, :status => 404
    end
  end

  def vote_on
    post = Post.find_by_id(params[:id])
    if (current_user.voted_for?(post) &&
            params[:vote] == true) || 
              (current_user.voted_against?(post) &&
                params[:vote] == false)
      current_user.unvote_for(post)  
      render :json => {}, :status => 200
    elsif params[:vote] == true
      current_user.unvote_for(post)  
      current_user.vote_for(post)
      render :json => {}, :status => 200
    elsif params[:vote] == false
      current_user.unvote_for(post)  
      current_user.vote_against(post)
      render :json => {}, :status => 200
    else
      render :json => {}, :status => 400
    end
  end
end
