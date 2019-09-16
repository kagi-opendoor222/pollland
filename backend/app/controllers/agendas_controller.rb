class AgendasController < ApplicationController
  def index
    @agendas = Agenda.all
  end
  def new
    @agenda = Agenda.new
  end
  def create
    agenda = Agenda.create(agenda_params)
    candidate = []
    params[:candidate].length.times do |i|
      candidate[i] = agenda.candidates.create(candidate_params(i))
      candidate[i].parse_base64(params[:candidate][i][:image])
    end
    render json: { 
      status: 'SUCCESS',
      message: 'さくせす！',
      data: {
        agenda: agenda,
        candidate: candidate
      }
    }
  end
  def show
    @agenda = Agenda.find(params[:id])
  end
  private
  def agenda_params
    #TODO: 正式なuser_idの値を設定する
    params.require(:agenda).permit(:name).merge({user_id: 1})
  end
  def candidate_params(i)
    params.require(:candidate)[i].permit(:name, :message)
  end
end
