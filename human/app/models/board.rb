class Board < ActiveRecord::Base
  attr_accessible :title, :tags 
  has_many :posts
  has_many :admins

  acts_as_taggable
  acts_as_taggable_on :tags

  validates_associated :posts, :admins
  validates :title, :presence => true
end
