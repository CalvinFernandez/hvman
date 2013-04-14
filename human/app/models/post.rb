class Post < ActiveRecord::Base
  attr_accessible :title, :content, :post_image
  has_attached_file :post_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  
  belongs_to :user
  belongs_to :board

  has_many :comments, :as => :commentable

end
