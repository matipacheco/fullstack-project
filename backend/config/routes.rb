Rails.application.routes.draw do
  namespace :api do
    post '/login',  to: 'sessions#create'
    post '/logout', to: 'sessions#destroy'
    get '/check_logged_in', to: 'sessions#user_logged_in?'

    resources :images do
      get :search, on: :collection
    end

    resources :users, only: :create
    resources :favorites, only: %i[index create] do
      collection do
        post :delete
      end
    end
  end
end
