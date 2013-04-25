class CommentController < ApplicationController
  before_filter :find_commenter

  def create
    @comment = @commenter.comments.create(params[:comments])
  end
  
  private

  def find_commenter
    @klass = params[:commenter_type].capitalize.constantize
    @commenter = klass.find(params[:commenter_id]) 
  end  
end
