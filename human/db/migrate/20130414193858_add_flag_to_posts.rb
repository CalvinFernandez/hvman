class AddFlagToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :flag, :integer, :default => 0 
  end
end
