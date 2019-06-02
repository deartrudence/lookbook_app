json.extract! stored_product, :id, :shopify_id, :shopify_title, :shopify_handle, :shopify_image_url, :lookbook_html, :shop_id

json.url api_v1_stored_product_url(stored_product, format: :json)