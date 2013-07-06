class ApplicationController < ActionController::Base
  protect_from_forgery

  def currentUser
    render :json => current_user
  end
end
