class ChangeTitleToString < ActiveRecord::Migration
  def up
    change_table :boards do |t|
      t.change :title, :string
    end
  end

  def down
    change_table :boards do |t|
      t.change :title, :text
    end
  end
end
