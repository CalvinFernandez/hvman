class DriveController < ApplicationController
  before_filter :authenticate_user!

  def index
    params[:page] ||= 1
    render :json => current_user.posts.paginated(:page => params[:page])
  end

end
