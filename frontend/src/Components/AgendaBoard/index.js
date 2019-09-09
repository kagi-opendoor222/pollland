import React from "react";
import CandidateBoards from "./CandidateBoards";

class AgendaBoard extends React.Component{
  render(){
    return(
      <div>
        <div className="agenda-title">
          agendaName
        </div>
        <div className="contents-container">
          <CandidateBoards />
        </div>
      </div>
    )
  }
}

export default AgendaBoard;