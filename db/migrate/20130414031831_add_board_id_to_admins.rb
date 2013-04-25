class AddBoardIdToAdmins < ActiveRecord::Migration
  def change
    add_column :admins, :board_id, :integer
  end
end
