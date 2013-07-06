class Post < ActiveRecord::Base
  attr_accessible :title, :content, :post_image, 
                  :user_id, :board_id, :verified,
                  :flag, :link

  has_attached_file :post_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  
  belongs_to :user
  belongs_to :board

  has_many :comments, :as => :commentable
  acts_as_voteable

  validates :title, :presence => true
  validates :user_id, :presence => true
  #validates :board_id, :presence => true

  validates :content, :presence => true,
                      :length => { :minimum => 10 }

  validates_associated :comments

  acts_as_taggable
  acts_as_taggable_on :tags
end
