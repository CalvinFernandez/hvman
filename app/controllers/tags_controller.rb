class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all
    render :json => @tags
  end

  def show
    @posts = Post.tagged_with(params[:name])
    render :json => @posts
  end
end
