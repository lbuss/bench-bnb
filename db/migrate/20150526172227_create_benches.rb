class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.string :description
      t.float :lat
      t.float :lng
      t.timestamps null: false
    end
  end
end
