import React from "react";
import UserDashBoard from "./UserDashBoard";
import AgendaList from "./AgendaList";
import SocialButton from "../Shared/SocialButton"
import { CSSTransition } from 'react-transition-group';

import { BrowserRouter as Router, Link } from "react-router-dom";


const PrivateLink = (props) =>{
  let linkComponent
  if(props.user.isLoggedIn()){
    linkComponent = <Link to={props.to} className={props.className}>
                      {props.children}
                    </Link>
  }else{
    linkComponent = <Link to={""} className={props.className} onClick={() => props.handleAddFlash({text: "続けるにはログインが必要です", type: "error"})}> 
                      {props.children}
                    </Link>
  }
  return(
    linkComponent
  )
}

const MainContainer = (props)=>{
  return(
    <div className="contents-wrapper">
      <div className="header-contents">
        <div className="">
          POLLANDは小数派・多数派関係なく、皆で仲良く楽しめる投票サービスです。<br />
          早速投票を作成し、SNSで共有しましょう！
        </div>
        <SocialButton loginByOmniAuth={props.loginByOmniAuth} social="twitter" />
      </div>
      <div className="contents-container">
        {/* <UserDashBoard /> */}
        <div className="main-content">
          <div className="main-content-top">
            <h2>投票</h2>
            <PrivateLink to="/agendas/new" className="main-content-top__post-agenda-button" user={props.user} handleAddFlash={props.handleAddFlash} >
              <span>テーマを投稿</span>
            </PrivateLink>
          </div>
          <div className="main-content-board">
            <AgendaList user={props.user}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContainer