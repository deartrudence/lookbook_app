class StoredProduct < ApplicationRecord
  belongs_to :shop
  has_many :product_images

  scope :belongs_to_shop, -> shop_id { where(shop_id: shop_id)}
end
