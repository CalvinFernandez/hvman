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

  validates :content, :presence => true

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

  def self.sanitize(model)
    sanitized = {} 
    Post.attr_accessible[:default].each do |attr| 
      sanitized[attr] = model[attr] if model[attr]
    end
    sanitized
  end
  
  def self.build_topics(model)
    topics = []
    if model[:topics]
      model[:topics].each do |t|      
        topic = Topic.find_by_id(t[:id])
        topics << topic if topic
      end
    end
    topics
  end

  def update_topics(topics)
    topics = Post.build_topics(topics)  
    update_attribute('topics', topics)  
  end

  def update_attributes(attributes)
    topics = Post.build_topics(attributes) 
    sanitized = Post.sanitize(attributes)

    update_attribute('topics', topics)
    super(sanitized) 
  end
end
