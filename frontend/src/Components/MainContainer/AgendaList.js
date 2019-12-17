import React from "react";
import axios from "axios";
import {BrowserRouter as Router, Link} from "react-router-dom";
/**
 * ユーザーが投稿したAgenda(テーマ)とそれぞれのcandidate(投票対象)の情報を表示するカード1つを生成する。
 * 
 * @param {*} agendaPackage = {...agenda, candidate: [candidate1, candidate2, ...]}
 * 
 *   agenda:
 *     { id, message, name, start_time, end_time, created_at, updated_at, user_id , user_name}
 *   candidate:
 *     { id, message, name, created_at, updated_at, agenda_id }
 */

const AgendaCard = (props) => {
  const image_list = props.candidate.map((candidate, i)=>{
    let image = candidate.image_url
    if(candidate.image_url.length === 0){
      switch(i){
        case 0:
          image = "https://2.bp.blogspot.com/-kkfurG90g6k/U-8GF8K-GCI/AAAAAAAAkys/YPzrhU55IxM/s800/alphabet_character_a.png";
          break;
        case 1:
          image = "https://4.bp.blogspot.com/-7VZ-UQZcLzE/U-8GF3AZt_I/AAAAAAAAky0/XhUaHR8cQfs/s800/alphabet_character_b.png";
          break;
      }
    }
    return(
      <li key={i}>
        <img src={image} className=""/>
      </li>
    )
  })
  return(
    <div className="agenda-card">
      <Link to={`/agendas/${props.id}`} >
        <ul className="agenda-card__img-box">
          {image_list}
        </ul>
      </Link>
      <div className="agenda-card__title">
        <div className="agenda-detail">
            <div className="agenda-detail__title">{props.name}</div>
        </div>
      </div>
      <div className="agenda-card__user">
        <img src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
        <p>{props.user_name}</p>
      </div>
    </div>
  )
}

/**
 * 
 * AgendaCardの一覧を内包するコンポーネント
 * 
 *   state: {
 *     agendaList: array
 *     candidateList: array
 *     agendaPackages: array
 *   }
 * 
 *   agenda:
 *     { id, message, name, start_time, end_time, created_at, updated_at, user_id }
 *   candidate:
 *     { id, message, name, created_at, updated_at, agenda_id }
 *   agendaPackages:
 *     {...agenda, candidate}
 */
class AgendaList extends React.Component{
  _isMounted = false;
  constructor(props){
    super(props)
    this.state = {
      agendaList: [],
      candidateList: [],
      agendaPackages: [],
      currentUser: this.props.user
    }
  }
  componentDidMount(){
    this._isMounted = true
    this.setStateFromAPI() 
  }
  componentDidUpdate(){
    if(this.props.user.uid !== this.state.currentUser.uid){
      this.setState(
        {currentUser: this.props.user},
        this.setStateFromAPI
      )
     
    }
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  /**
   * agendaList内部のagendaとアソシエーションされているcandidateをマージし、agendaPackagesというarrayを作成する。
   * agendaPackage: {...agenda, candidate: [candidate1, candidate2, ...]}
   * @param {array} agendaList 
   * @param {array} candidateList 
   * @param {*} votes 
   */
  agendaPackages(agendaList, candidateList, votes){{
    let copyedAgendaList = agendaList.slice()
    let copyedCandidateList = candidateList.slice()
    let agendaPackages
    agendaPackages = copyedAgendaList.map((agenda)=>{
      agenda["candidate"] = []
      //copyedCandidateListからagendaとidが一致するcandidateを破壊的に抽出する。
      copyedCandidateList = copyedCandidateList.filter((candidate)=>{
        if(candidate.agenda_id === agenda.id){
          agenda["candidate"].push(candidate)
          return false
        }else{
          return true
        }
      })
      return agenda
    })
    return agendaPackages
  }}


  /**
   * RailsAPIからagendaListとcandidateListを取得し、setStateする。
   */

   //TODO: もっとキレイに書きたい
  setStateFromAPI(){
    const user = this.state.currentUser
    const url = "http://localhost:4000/agendas"
    const headers = {
      access_token: user.auth_token,
      client: user.client_id,
      expiry: user.expiry,
      uid: user.uid
    }
    axios.get(url,{headers: headers}).then(response => {
      if(this._isMounted){
        const agendaList = JSON.parse(response.data.agendaList)
        const candidateList = JSON.parse(response.data.candidateList)
        const agendaPackages = this.agendaPackages(agendaList, candidateList, 100)
        this.setState({
          agendaList: agendaList ,
          candidateList: candidateList,
          agendaPackages: agendaPackages
        })
      }
    })
  }
  render(){
    let agendaCards
    if(this.state.agendaPackages){
      agendaCards = this.state.agendaPackages.map((agendaPackage, i)=>{
        return <AgendaCard {...agendaPackage} key={i}/>
      })
    }

    return(
      <div className="stream">
        {agendaCards}
      </div>
    )
  }
}

export default AgendaList;