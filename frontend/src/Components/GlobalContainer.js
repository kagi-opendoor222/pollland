import React from "react";
import {BrouserRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group"

import MainContainer from "./MainContainer"
import Header from "./Header";
import AgendaBoard from "./AgendaBoard";
import PostAgendaForm from "./PostAgendaForm";


const PrivateRoute = (props) => {
  return(
    props.isLoggedIn ? 
      <Route path={props.path} render={props.render} {...props} /> :
      <div>ログインユーザー専用ページです</div>
  )
}

const Login = ()=>{
  return(
    <div>ログイン中...</div>
  )
}



const GlobalContainer = (props) =>{
  const currentKey = props.location.key || ""
  return (
    <TransitionGroup>
      <CSSTransition
        classNames='slide'
        timeout={{enter: 1000, exit: 1000}}
        key={currentKey}
        unmountOnExit
      >
        <Switch location={props.location}>
          <Route exact path="/">
              <MainContainer
                user={props.user}
                handleAddFlash={props.handleAddFlash}
                loginByOmniAuth={props.loginByOmniAuth}
              />
          </Route>
          <PrivateRoute
            path="/agendas/new"
            isLoggedIn={props.isLoggedIn}
            render={(val) => (
              <PostAgendaForm 
                user={props.user}
                handleAddFlash={props.handleAddFlash}
                {...val} 
              />
            )}
          />
          <Route 
            path="/agendas/:id"
            render={renderProps => (
              <AgendaBoard handleAddFlash={props.handleAddFlash} user={props.user} {...renderProps}/>
            )} 
          />
          <Route
            path="/login"
            component={Login}
          />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default withRouter(GlobalContainer)