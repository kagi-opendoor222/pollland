class AgendasController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create]
  def index
    @agendas = Agenda.all.reverse
    @candidates = @agendas.map{|agenda|
       agenda.candidates.to_a
      }.flatten
    render json: {
      agendaList: Agenda.to_json_with_data(@agendas),
      candidateList: Candidate.to_json_with_data(@candidates)
    }
  end
  def new
    @agenda = Agenda.new
  end
  def create
    agenda = Agenda.new(agenda_params)
    if agenda.save
      candidate = []
      params[:candidate].length.times do |i|
        candidate[i] = agenda.candidates.create(candidate_params(i))
        candidate[i].parse_base64(params[:candidate][i][:image])
      end
      render json: { 
        message: 'さくせす！',
        data: {
          agenda: agenda,
          candidate: candidate
        }
      }, status: :ok
      return
    else
      render json: {
        errors: agenda.errors.full_messages,
      },  status: :bad_request
      return
    end
  end
  def show
    @agenda = Agenda.find(params[:id])
    @candidates = @agenda.candidates
    render json:{
      agenda: Agenda.to_json_with_data(@agenda),
      candidates: Candidate.to_json_with_data(@candidates)
    }
  end
  private
  def agenda_params
    #TODO: 正式なuser_idの値を設定する
    params.require(:agenda).permit(:name).merge({user_id: current_user.id})
  end
  def candidate_params(i)
    params.require(:candidate)[i].permit(:name, :message)
  end
end
