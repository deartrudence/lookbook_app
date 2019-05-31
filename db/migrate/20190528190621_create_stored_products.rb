class CreateStoredProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :stored_products do |t|
      t.bigint :shopify_id
      t.string :shopify_title
      t.string :shopify_image_url
      t.string :shopify_handle
      t.references :shop, foreign_key: true
      t.text :lookbook_html

      t.timestamps
    end
  end
end
