Rails.application.routes.draw do

  mount ShopifyApp::Engine, at: '/'

  root to: 'api/v1/home#index'
  namespace :api do
    namespace :v1 do
      get 'home/index'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
