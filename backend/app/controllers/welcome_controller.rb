class WelcomeController < ApplicationController
  def index
    render json: { status: 'SUCCESS', message: 'さくせす！', data: "aaa" }
  end
end
