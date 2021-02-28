Rails.application.routes.draw do
  namespace :api do
    post '/login',    to: 'sessions#create'
    post '/logout',   to: 'sessions#destroy'

    resources :images do
      get :search, on: :collection
    end

    resources :users, only: :create
    resources :favorites, only: %i[create destroy]
  end
end
