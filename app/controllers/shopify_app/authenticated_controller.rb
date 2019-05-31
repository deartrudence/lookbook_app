module ShopifyApp
  class AuthenticatedController < ActionController::Base
    include ShopifyApp::Authenticated

    protect_from_forgery with: :exception
    before_action :set_shop

    def set_locale
      if @shop.present? && @shop.language.present?
        locale = @shop.language.to_sym 
      end

      I18n.locale = I18n.available_locales.include?(locale) ? locale : I18n.default_locale
      puts locale 
      puts '🕌'
    end

    private
      def set_shop

        @shop = Shop.find_by(id: session[:shopify])
        puts '😄'
        puts @shop
        set_locale
      end

  end
end
