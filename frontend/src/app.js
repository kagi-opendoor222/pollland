import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import AgendaBoard from "./Components/AgendaBoard";
import PostAgendaForm from "./Components/PostAgendaForm";

class App extends React.Component {
  toStringForUrl(obj){
    const keys = Object.keys(obj)
    const queryParamsStr =  keys.reduce((accumulator, key)=>{
      return accumulator + key + "=" + obj[key].toString() + "&"
    }, "")
    return queryParamsStr.slice(0, -1);
  }
  loginByOmniAuth(provider){
    const url = `http://localhost:4000/auth/${provider}`;
    const params = {origin: window.location}
    const paramsForUrl = this.toStringForUrl(params)
    location.href = url + "?"+ paramsForUrl
  }
  render(){
    return(
      <Router>
        <Header />
        <div className="page-container">
          <Link onClick={()=>this.loginByOmniAuth("twitter")}>Login by Twitter</Link>
          <Switch>
            <Route exact path="/" component={GlobalContainer} />
            <Route path="/agendas/new" component={PostAgendaForm} />
            <Route path="/agendas/:id" component={AgendaBoard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;