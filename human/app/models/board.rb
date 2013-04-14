class Board < ActiveRecord::Base
  # attr_accessible :title, :body
  has_many :posts
  has_many :admins
end
