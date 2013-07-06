require 'open-uri'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Board.delete_all
Post.delete_all
User.delete_all

User.create!(:user_name => 'Calvin', :email => "1calorie@gmail.com", :password => 'asdfasdf')

file = open('db/blurb.txt')
blurb = file.read

open('db/adjectives.txt') do |adjectives|
  adjectives.read.each_line do |adjective|
    Board.create!(:title => adjective)    
  end
end

counter = 0

for i in 0..9
  for j in 0..9
  Post.create!(:id=>counter, :title => "HumanPost#{j}", :user_id => 1, :board_id => i, :content => blurb)
  counter = counter + 1
  end
end
