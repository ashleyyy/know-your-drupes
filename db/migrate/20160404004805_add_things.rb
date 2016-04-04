class AddThings < ActiveRecord::Migration
  def change
    create_table :things do |t|
      t.string :name
      t.string :imageUrl
      t.boolean :drupe
      t.boolean :aggregate
  end
end
