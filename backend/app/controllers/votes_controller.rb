class VotesController < ApplicationController
  # TODO: 正式なuser_idの設定
  # voteのみをJSONで返してrenderしたい
  before_action :authenticate_user!, only: [:create]
  def create
    Vote.create(candidate_id: params[:candidate_id], user_id: current_user.id)
    candidate = Candidate.find(params[:candidate_id])
    candidates = candidate.agenda.candidates
    render json: {
      candidate: Candidate.to_json_with_data(candidate),
      candidates: Candidate.to_json_with_data(candidates)
    }
  end
end
