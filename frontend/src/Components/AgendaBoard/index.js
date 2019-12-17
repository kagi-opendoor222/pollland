import React from "react";
import axios from "axios";

import CandidateBoards from "./CandidateBoards";

/**
 * Agenda詳細画面
 * Agenda(投票テーマ)のcandidate(投票対象)、vote(投票数)の詳細を表示する画面
 * 
 */
class AgendaBoard extends React.Component{
  _isMounted = false;
  constructor(props){
    super(props)
    this.state = {
      agenda:       {},
      candidates:   [],
      id:           props.match.params.id
    }
  }

  componentDidMount(){
    this._isMounted = true;
    this.setStateFromAPI();
  }

  componentWillUnMount(){
    this._isMounted = false;
  }

  /**
   * APIからAgendaと結びつくCandidateとVoteの情報を取得し、setStateする。
   */
  setStateFromAPI(){
    const agendaId = this.state.id
    const url = `http://localhost:4000/agendas/${agendaId}`
    axios.get(url).then(response =>{
      const agenda = JSON.parse(response.data.agenda);
      let candidates = JSON.parse(response.data.candidates);
      candidates = candidates.map((candidate)=>{
        if(this.props.user){
          candidate.didVote = candidate.votes_user_ids.includes(this.props.user.dataBaseId)
        }else{
          candidate.didVote = false
        }
        return candidate
      })
      //全てのcandidteの画面に表示されるカウントアップ数値を0にする
      candidates.forEach((candidate)=>{
        candidate["countUpState_vote_ratio"] = 0
      })
      this.setState({
        agenda: agenda,
        candidates: candidates
      }, this.setTimer)
    })
  }

  /**
   *  candidate毎にvoteのカウントアップ演出処理をsetIntervalする。
   */
  setTimer(){
    const candidates = this.state.candidates
    candidates.forEach((candidate)=>{
      setInterval(this.countUpVote.bind(this), 10, candidate.id) //10ms毎に数値が1増える
    })
  }

  /**
   * candidateのVoteのカウントアップ演出処理を行う
   * countUpVoteが実行されるたびに数値が1増える
   * 例：
   * candidateのvoteが80%の時、画面を表示した時点では0%からスタートし、80%までカウントアップする演出をする
   * @param {integer} candidateId 
   */
  countUpVote(candidateId){
    const candidates = JSON.parse(JSON.stringify(this.state.candidates))
    const candidate = candidates.find(candidate => candidate.id == candidateId)
    const countUpState_vote_ratio = candidate.countUpState_vote_ratio
    const vote_ratio = candidate.vote_ratio
    //countUpState_vote_ratioをvote_ratioに1だけ近づけ、カウントアップする。
    candidate.countUpState_vote_ratio = candidate.countUpState_vote_ratio + Math.sign(vote_ratio - countUpState_vote_ratio)
    this.setState({candidates: candidates})
  }

  /**
   * candidateに対して投票(vote)処理を行う。
   * @param {object} e 
   * @param {integer} candidateId 
   */
  handleVote(e, candidateId){
    e.preventDefault()
    const data = {candidate_id: candidateId}
    const url = "http://localhost:4000/votes"
    const user = this.props.user
    const headers = {
      access_token: user.auth_token,
      client: user.client_id,
      expiry: user.expiry,
      uid: user.uid
    }
    axios.post(
      url, data,  {headers: headers}
    ).then(response =>{
      const newCandidate = JSON.parse(response.data.candidate)
      const newCandidates = JSON.parse(response.data.candidates)
      const candidates = this.state.candidates
      //全てのcandidateに新しいvote関係の値をセット
      candidates.forEach((candidate, i)=>{
          candidate.vote_count = newCandidates[i].vote_count
          candidate.vote_ratio = newCandidates[i].vote_ratio
      })
      this.setState({candidates: candidates})
    }).catch(err => {
      console.log(err.response.data.errors)
      err.response.data.errors.forEach(message => {
        this.props.handleAddFlash({text: message, type: "error"})
      })
    })
  }
  
  render(){
    const agenda = this.state.agenda;
    const candidates = this.state.candidates;
    const name = agenda.name;
    return(
      <div>
        <div className="agenda-title">
          {name}
        </div>
        選んだ方に投票してみましょう！！
        <div className="contents-container">
          <CandidateBoards 
            agenda={agenda}
            candidates={candidates}
            handleVote={(e, candidateId) => this.handleVote(e, candidateId)}
          />
        </div>
      </div>
    )
  }
}

export default AgendaBoard;