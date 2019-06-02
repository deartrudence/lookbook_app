class Api::V1::FrontEndController < ApplicationController
  def index
    @shop = Shop.find_by_shopify_domain(params[:shop])
    @stored_products = StoredProduct.belongs_to_shop(@shop)
    render json: @stored_products 
  end
end