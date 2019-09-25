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
      agenda: {},
      candidates: [],
      id: props.match.params.id
    }
  }
  componentDidMount(){
    this._isMounted = true;
    this.setStateFromAPI()
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
      const candidates = JSON.parse(response.data.candidates);
      this.setState({
        agenda: agenda,
        candidates: candidates
      })
    })
  }
  render(){
    const agenda = this.state.agenda;
    const candidates = this.state.candidates;
    const name = agenda.name;
    console.log(agenda, candidates)
    return(
      <React.Fragment>
        <div className="agenda-title">
          {name}
        </div>
        <div className="contents-container">
          <CandidateBoards agenda={agenda} candidates={candidates}/>
        </div>
      </React.Fragment>
    )
  }
}

export default AgendaBoard;