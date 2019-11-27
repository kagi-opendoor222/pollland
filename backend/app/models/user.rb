class User < ApplicationRecord
        # Include default devise modules.
        devise :database_authenticatable, :registerable,
                :recoverable, :rememberable, :trackable, :validatable,
                :omniauthable,omniauth_providers: [:twitter] #,:confirmable
        include DeviseTokenAuth::Concerns::User
end
