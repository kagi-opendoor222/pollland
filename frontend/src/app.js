import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import AgendaBoard from "./Components/AgendaBoard";
import PostAgendaForm from "./Components/PostAgendaForm";


const FlashMessageContainer = (props) =>{

  if(props.messages.length === 0){
    return(<div></div>)
  }

  const messagesContainer = props.messages.map((message)=>{
    const className = `flash-message-container__message ${message.type}`
    return <li className={className}>{message.text}</li>
  })
  return(
    <ul className="flash-message-container" onClick={props.handleDeleteFlash}>
      {messagesContainer}
    </ul>
  )
}



class App extends React.Component {
  constructor(props){
    super(props)
    this.handleAddFlash = this.handleAddFlash.bind(this)
    this.handleDeleteFlash = this.handleDeleteFlash.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.state = {
      currentUser: {
        auth_token: "",
        client_id: "",
        expiry: "",
        uid: "",
        isLoggedIn: this.isLoggedIn
      },
      flashMessages: []
    }
  }

  //ライフサイクルメソッド群
  componentDidMount(){
    const params = this.getParamsFromURL()
    //XXX: ディープコピーじゃないけど大丈夫？
    //更新時バグらない？
    this.setState((prevState)=>{
      return {
        currentUser: {
          ...prevState.currentUser,
          auth_token: params.auth_token,
          client_id: params.client_id,
          expiry: params.expiry,
          uid: params.uid
        }
      }
    })
  }

  //汎用メソッド群
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
  handleAddFlash(newMessage){
    this.setState(prevState=>{
      return {flashMessages: prevState.flashMessages.concat([newMessage])}
    })
  }
  handleDeleteFlash(){
    this.setState({
      flashMessages: []
    })
  }

  isLoggedIn(){
    if(this.state.currentUser.auth_token){
      return this.state.currentUser.auth_token.length > 0 ? true : false
    }
  }
  render(){
    return(
      <Router>
        <Header />
        <div className="page-container">
          <FlashMessageContainer 
            messages={this.state.flashMessages}
            handleDeleteFlash={this.handleDeleteFlash}
          />
            <Link to="" onClick={()=>this.loginByOmniAuth("twitter")}>Login by Twitter</Link>
          <Switch>
            <Route exact path="/">
              <GlobalContainer user={this.state.currentUser} handleAddFlash={this.handleAddFlash} />
            </Route>
            <Route path="/agendas/new">
              <PostAgendaForm user={this.state.currentUser} handleAddFlash={this.handleAddFlash} />
            </Route>
            <Route path="/agendas/:id" component={AgendaBoard} handleAddFlash={this.handleAddFlash}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;