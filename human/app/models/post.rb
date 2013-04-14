class Post < ActiveRecord::Base
  attr_accessible :title, :content, :post_image, :tags
  has_attached_file :post_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  
  belongs_to :user
  belongs_to :board

  has_many :comments, :as => :commentable
  acts_as_voteable
  acts_as_taggable
  acts_as_taggable_on :tags

  validates :title, :user_id, :board_id, :presence => true
  validates :content, :presence => true,
                      :length => { :minimum => 10 }

  validates_associated :comments

end
