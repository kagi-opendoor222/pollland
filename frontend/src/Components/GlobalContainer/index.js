import React from "react";
import UserDashBoard from "./UserDashBoard";
import AgendaList from "./AgendaList";
import { BrowserRouter as Router, Link } from "react-router-dom";

const GlobalContainer = (props)=>{
  console.log("aaa", props.user)
  return(
    <div className="contents-container">
      <UserDashBoard />
      <div className="main-content">
        <div className="main-content-top">
          <h2>投票</h2>
          <Link to="/agendas/new" className="main-content-top__post-agenda-button">
            <span>テーマを投稿</span>
          </Link>
        </div>
        <div className="main-content-board">
          <AgendaList user={props.user}/>
        </div>
      </div>
    </div>
  )
}

export default GlobalContainer