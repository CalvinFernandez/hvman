class PostsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]

  def index
    @posts = []  
    if params[:user_id]
      @posts = Post.find_all_by_user_id(params[:user_id])
    elsif params[:board_id]
      @posts = Post.find_all_by_board_id(params[:board_id])
    else
      @posts = Post.all
    end
    render :json => @posts
  end

  def create
    @post = current_user.posts.new(params[:post])
    if @post.valid?
      @post.save
      render :json => @post
    else
      render :json, 500
    end
  end

  def destroy
    post = current_user.posts.find_by_id(params[:id])
    if post
      post.destroy
      render :json, 200
    else
      render :json, 404
    end
  end

  def update
    @post = current_user.posts.find_by_id(params[:post][:id])
    if @post
      @post = update_attributes(params[:post])
      render :json => @post
    else
      render :json, 404
    end
  end 

  def show
    @post = Post.find_by_id(params[:id])
    if @post
      render :json => @post
    else
      render :json, 404
    end
  end
end
