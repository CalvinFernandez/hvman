class MakeTitlesUnique < ActiveRecord::Migration
  def up
    add_index :boards, :title, :unique => true
  end

  def down
  end
end
