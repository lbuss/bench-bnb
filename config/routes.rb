Rails.application.routes.draw do
  root 'static_pages#index'

  namespace :api do
    resources :benches
    get 'seatFilter', :to => 'benches#seat_filter'
  end
end
