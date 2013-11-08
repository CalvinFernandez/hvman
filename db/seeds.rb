require 'open-uri'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Topic.delete_all
Post.delete_all
User.delete_all

dummy = User.create(:user_name => 'Calvin', :email => "1calorie@gmail.com", :password => 'asdfasdf')

file = open('db/blurb.txt')
blurb = file.read

"""
open('db/adjectives.txt') do |adjectives|
  adjectives.read.each_line do |adjective|
    Topic.create!(:title => adjective)    
  end
end
"""

startindex = Topic.first().id

for j in 0..9
  topic = Topic.find_by_id(startindex + j)
  for i in 0..9
    post = Post.create!(:id=>i, :title => "HumanPost#{i}", :user_id => dummy.id, :content => blurb)
    post.topics << topic
  end
end
