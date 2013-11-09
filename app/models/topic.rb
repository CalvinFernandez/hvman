require 'tire/queries/custom_filters_score'

class Topic < ActiveRecord::Base
  include Tire::Model::Search
  include Tire::Model::Callbacks

  attr_accessible :title
  has_and_belongs_to_many :posts, after_add: :update_tire

  validates_associated :posts
  validates :title, :presence => true

  #
  # Enable auto save in elasticsearch when an associated object
  # changes.
  #
  after_touch() { tire.update_index }

  # 
  # properly serialize JSON for elastic
  #
  self.include_root_in_json = false

  mapping do
    indexes :_id, index: :not_analyzed
    indexes :title, type: 'string', boost: 10, analyzer: 'snowball'
    indexes :posts do
      indexes :content, analyzer: 'snowball'
      indexes :title, analyzer: 'snowball'
    end
  end

  def to_indexed_json
    to_json( include: {posts: { only: [:content, :title]}})  
  end

  ALGORITHM = "_score * (doc['posts.title'].values.length + 1)"

  def self.elasticsearch(options = {}) 
    
    if options[:query]
      options[:query] += "*"
    else
      options[:query] = "*"
    end

    s = self.search do  
      query do 
        custom_score :script => ALGORITHM do
          string options[:query]
        end
      end
    end
  end

end
