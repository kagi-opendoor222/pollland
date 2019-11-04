import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import AgendaBoard from "./Components/AgendaBoard";
import PostAgendaForm from "./Components/PostAgendaForm";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {
        auth_token: "",
        client_id: "",
        expiry: "",
        uid: ""
      }
    }
  }
  componentDidMount(){
    const params = this.getParamsFromURL()
    //XXX: ディープコピーじゃないけど大丈夫？
    //更新時バグらない？
    this.setState({
      currentUser: {
        auth_token: params.auth_token,
        client_id: params.client_id,
        expiry: params.expiry,
        uid: params.uid
      }
    })
  }
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
  getParamsFromURL(){
    const urlParamsStr = window.location.search.substring(1)
    let params = {}
    urlParamsStr.split("&").forEach(param => {
      const key = param.split("=")[0]
      const value = param.split("=")[1]
      params = {
        ...params,
        [key]: value
      }
    })
    return params
  }
  render(){
    return(
      <Router>
        <Header />
        <div className="page-container">
          <Link to="" onClick={()=>this.loginByOmniAuth("twitter")}>Login by Twitter</Link>
          <Switch>
            <Route exact path="/"
                         render={() => 
                           <GlobalContainer user={this.state.currentUser} 
                         />}
            />
            <Route path="/agendas/new" 
                   render={()=>
                    <PostAgendaForm user={this.state.currentUser} />
                   }
            />
            <Route path="/agendas/:id" component={AgendaBoard} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;