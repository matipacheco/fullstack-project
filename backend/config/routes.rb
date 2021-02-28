Rails.application.routes.draw do
  namespace :api do
    post '/login',    to: 'sessions#create'
    post '/logout',   to: 'sessions#destroy'

    resources :images do
      get :search, on: :collection
    end

    resources :users, only: :create
  end
end
