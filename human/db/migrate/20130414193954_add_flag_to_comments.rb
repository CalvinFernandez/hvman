class AddFlagToComments < ActiveRecord::Migration
  def change
    add_column :comments, :flag, :integer, :default => 0
  end
end
