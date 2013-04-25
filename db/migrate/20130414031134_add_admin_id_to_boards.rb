class AddAdminIdToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :admin_id, :integer 
  end
end
