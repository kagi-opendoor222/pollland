import React from "react";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import axios from "axios";

import GlobalContainer from "./Components/GlobalContainer"
import Header from "./Components/Header";
import AgendaBoard from "./Components/AgendaBoard";
import PostAgendaForm from "./Components/PostAgendaForm";



const FlashMessageContainer = (props) =>{

  if(props.messages.length === 0){
    return(<div></div>)
  }

  const messagesContainer = props.messages.map((message, index)=>{
    const className = `flash-message-container__message ${message.type}`
    return <li className={className} key={index}>{message.text}</li>
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
    this.setUserOnCookie = this.setUserFromCookie.bind(this)
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
    this.setUserFromURL() || this.setUserFromCookie()
  }



  //汎用メソッド群
  toStringForUrl(obj){
    const keys = Object.keys(obj)
    const queryParamsStr =  keys.reduce((accumulator, key)=>{
      return accumulator + key + "=" + obj[key].toString() + "&"
    }, "")
    return queryParamsStr.slice(0, -1);
  }
  getParamsFromURL(){
    const uriParamsStr = window.location.search.substring(1)
    const params = this.extractParamsFromStr(uriParamsStr, {spliter: "&"})
    return params
  }

  loginByOmniAuth(provider){
    const url = `http://localhost:4000/auth/${provider}`;
    const params = {origin: window.location}
    const paramsForUrl = this.toStringForUrl(params)
    location.href = url + "?"+ paramsForUrl
  }


  //cookie関連
  getParamsFromCookie(){
    const cookieStr = document.cookie
    const params = this.extractParamsFromStr(cookieStr, {spliter: ";"})
    return params
  }
  setParamsOnCookie(params){
    //ミリ秒を秒に変換
    const maxMiliAge = Number(params["expiry"])
    const maxAge = Math.round(maxMiliAge / 1000)
    for(let key of Object.keys(params)){
      document.cookie = `${key}=${params[key]}; max-age=${maxAge}`
    }
  }
  extractParamsFromStr(str, {spliter = "&"}){
    let params = {}
    str.split(spliter).forEach(param => {
      if(param.split("=")[0].length === 0 || param.split("=")[1].length === 0){
        return false 
      }
      const key = param.split("=")[0].trim()
      const value = param.split("=")[1].trim()
      params = {
        ...params,
        [key]: value
      }
    })
    return params
  }

  //フラッシュメッセージ関係
  handleAddFlash(newMessage = {text: "", type: "notice"}){
    this.setState(prevState=>{
      return {flashMessages: prevState.flashMessages.concat([newMessage])}
    })
  }
  handleDeleteFlash(){
    this.setState({
      flashMessages: []
    })
  }

  //ユーザー関係
  isLoggedIn(){
    if(this.state.currentUser.auth_token){
      return this.state.currentUser.auth_token.length > 0 ? true : false
    }
  }

  signIn(params){
    const url = "http://localhost:4000/auth/validate_token"
    const headers = {
      access_token: params.auth_token,
      client:       params.client_id,
      uid:          params.uid
    }
    axios.get(url, {headers: headers})
      .then(response => {
        this.setState((prevState)=>{
          return {
            currentUser: {
              ...prevState.currentUser,
              ...params
            }
          }
        })
        this.setParamsOnCookie(params)
        return true
      })
      .catch(response => {
        console.log(response)
        return false
      })
  }

  setUserFromURL(){
    const params = this.getParamsFromURL()
    const userParams = {

    }
    if(!params["auth_token"]){
      console.log("クエリパラメータが存在しない")
      return false
    }
    if( params["auth_token"] === this.getParamsFromCookie()["auth_token"]){
      console.log("既にセット済")
      return false
    }  
    this.signIn(params)
    this.handleAddFlash({text: "ログインに成功しました。", type: "notice"})
    return params
  }

  setUserFromCookie(){
    const cookieParams = this.getParamsFromCookie();
    const userParams = {
      auth_token: cookieParams.auth_token,
      client_id: cookieParams.client_id,
      expiry: cookieParams.expiry,
      uid: cookieParams.uid,
    }
    if(!cookieParams["auth_token"]){
      return false
    }
    this.signIn(userParams)
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