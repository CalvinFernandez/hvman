class CommentsController < ApplicationController
  before_filter :authenticate_user!

  def create
    comment = current_user.comments.create(params[:comment])
    render :json => comment
  end
    
end
