class RenameBoards < ActiveRecord::Migration
  def up
    rename_table :boards, :topics
  end

  def down
    rename_table :topics, :boards
  end
end
