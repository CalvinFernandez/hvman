class Post < ActiveRecord::Base
  attr_accessible :title, :content,
                  :user_id, :verified,
                  :flag, :link

  has_attached_file :post_image, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
  
  belongs_to :user
  has_and_belongs_to_many :topics, after_add: :update_tire, after_remove: :update_tire

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

  def update_tire(topic)
    topic.tire.update_index
  end

  def self.paginated(options = {}) 
    options[:page] ||= 1
    options[:per_page] ||= 10
    Post.page(options[:page]).per(options[:per_page])             
  end

  def update_attributes(attributes)

    topics = []

    if attributes[:topics]  
      attributes[:topics].each do |t| 
        topic = Topic.find_by_id(t[:id])
        topics << topic if topic
      end
    end

    sanitized = {} 
    Post.attr_accessible[:default].each do |attr| 
      sanitized[attr] = attributes[attr] if attributes[attr]
    end
    
    update_attribute('topics', topics)
    super(sanitized) 
  end

end
