class UsersController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :logged_in]

  """
  def index
    @users = User.all
    render :json => @users
  end
  """

  def destroy
    current_user.destroy
    render :json => {}, :status => 200
  end 

  def show
    @user = User.find(params[:id])
    render :json => @user
  end

  def logged_in
    render :json => user_signed_in?
  end

end
