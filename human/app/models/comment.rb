class Comment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :commentable, :polymorphic => true
  has_many :comments, :as => :commentable
  acts_as_voteable
end
