Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    # registrations: 'auth/registrations',
    # sessions: 'auth/sessions',
    omniauth_callbacks: 'auth/omniauth_callbacks'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :agendas
  resources :votes, only: [:create, :destroy]
end
