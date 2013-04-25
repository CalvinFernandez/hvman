class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me,
                  :user_name
  # attr_accessible :title, :body
  has_many :posts
  has_many :comments, :as => :commenter

  validates_associated :comments, :posts

  validates_uniqueness_of :user_name
  validates_presence_of :user_name
  
  acts_as_voter
end
