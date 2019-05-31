class CreateBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table :blocks do |t|
      t.string :block_id
      t.string :block_type
      t.text :block_text
      t.string :image_url
      t.text :lookbook_html
      t.references :stored_product, foreign_key: true

      t.timestamps
    end
  end
end
