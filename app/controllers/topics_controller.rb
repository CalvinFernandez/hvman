class TopicsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]  

  def index
    @topics = Topic.elasticsearch(:query => params[:query])
    render :json => @topics
  end
  
  def show
    if params[:id].is_a? Numeric
      topic = Topic.find_by_id(params[:id])
    elsif params[:id].is_a? String
      topic = Topic.find_by_title(params[:id])
    end

    posts = []
    if topic 
      params[:page] ||= 1
      posts = topic.posts.paginated(:page => params[:page])
    end

    render :json => { :topic => topic, :posts => posts }
  end

  def create
    @topic = Topic.new(params[:topic])
    if @topic.valid?
      @topic.save
      render :json => @topic
    else
      render :json => {}, :status => 500
    end
  end
end
