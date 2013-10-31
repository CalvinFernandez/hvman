class BoardsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]  

  def index
    @boards = Board.elasticsearch(:query => params[:query])
    render :json => @boards
  end
  
  def show
    if params[:id].is_a? Numeric
      board = Board.find_by_id(params[:id])
    elsif params[:id].is_a? String
      board = Board.find_by_title(params[:id])
    end

    posts = []
    if board
      params[:page] ||= 1
      posts = board.posts.paginated(:page => params[:page])
    end

    render :json => { :board => board, :posts => posts }
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
