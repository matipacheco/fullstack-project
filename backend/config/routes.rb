Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'

  namespace :api do
    resources :images do
      get :search, on: :collection
    end
  end
end
