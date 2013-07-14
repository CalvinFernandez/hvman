class TagsController < ApplicationController
  def index
    @tags = ActsAsTaggableOn::Tag.all
    render :json => @tags
  end

  def show
    options = {}
    options[:page] = params[:page] || 1
    options[:per_page] = params[:per_page] || 10
    @posts = Post.tagged_with(params[:name]).page(options[:page]).per(options[:per_page])
  end

  def autocomplete
    escaped_str =  params[:term].gsub('%', '\%').gsub('_', '\_')
    @tags = ActsAsTaggableOn::Tag.where("name like ?", "%" + escaped_str + "%")
  end
end
