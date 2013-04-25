class RemoveAdminIdFromBoards < ActiveRecord::Migration
  def up
    remove_column :boards, :admin_id 
  end

  def down
    add_column :boards, :admin_id
  end
end
