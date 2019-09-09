class AgendasController < ApplicationController
  def index
    @agendas = Agenda.all
  end
  def new
    @agenda = Agenda.new
  end
  def create
    binding.pry
    agenda = Agenda.create(agenda_params)
    params[:group][:number_of_groups].to_i.times do |i|
      candidate = agenda.candidates.create(group_params(i))
    end
    # redirect_to themes_path
    render json: { status: 'SUCCESS', message: 'さくせす！', data: "aaa" }
  end
  def show
    @agenda = Agenda.find(params[:id])
  end
  private
  def agenda_params
    params.require(:agenda).permit(:name).merge({user_id: current_user.id})
  end
  def candidate_params(i)
    params.require(:candidate).require("candidate#{i}").permit(:name, :message, :image)
  end
end
