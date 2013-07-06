class BoardsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]  
  def index
    @boards = Board.all
    render :json => @boards
  end
  
  def show
    @board = Board.find_by_id(params[:id])
    render :json => @board
  end

  def create
    @board = Board.new(params[:board])
    if @board.valid?
      @board.save
      render :json => @board
    else
      render :json => {}, :status => 500
    end
  end
end
