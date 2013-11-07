class ChangeUserBoardId < ActiveRecord::Migration
  def up
    rename_column :posts, :board_id, :topic_id
  end

  def down
    rename_column :posts, :topic_id, :board_id
  end
end
