class AddPostsTopicsTable < ActiveRecord::Migration
  def self.up 
    create_table :posts_topics, :id => false do |t|
      t.references :post, :topic
    end
  end

  def self.down
    drop_table :posts_topics
  end
end
