class AddUrlToBench < ActiveRecord::Migration
  def change
    add_column :benches, :url, :string
  end
end
