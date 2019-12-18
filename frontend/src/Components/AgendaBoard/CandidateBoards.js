import React from "react";

export const Message = (props) =>{
  return(
    <div className="message">
    </div>
  )
}

export const Comments = (props) => {
  return(
    <ul className="comments">
    MESSAGE
    <li className="comment">
      <div className="comment__message">
        {props.message || "メッセージはありません。"}
      </div>
      <div className="comment__user">
        <img src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
        <p>{props.userName}</p>
      </div>
    </li>
  </ul>
  )
}

/**
 * CandidateBoardの中でも画像カードの部分
 * 
 * @param {*} props 
 *   @param {object} candidate
 *    : { id, message, name, created_at, updated_at, agenda_id,
 *        vote_count, vote_ratio, countUpState_vote_ratio }
 */
export const CandidateImagePanel = (props) => {
  const candidateId = props.id;
  const barWidth = (30 + props.countUpState_vote_ratio) * 0.5
  const barStyle = {
    "width": (barWidth + "%"),
  }

  //pollButton
  let pollButton
  if(props.didVote){
    pollButton = <input type="submit" className="poll-button" value="投票済" disabled/>
  }else{
    pollButton = <input type="submit" className="poll-button" value="投票"/>
  }

  //image
  let image = props.image_url
  if(props.image_url.length === 0){
    switch(props.number){
      case 0:
        image = "https://2.bp.blogspot.com/-kkfurG90g6k/U-8GF8K-GCI/AAAAAAAAkys/YPzrhU55IxM/s800/alphabet_character_a.png";
        break;
      case 1:
        image = "https://4.bp.blogspot.com/-7VZ-UQZcLzE/U-8GF3AZt_I/AAAAAAAAky0/XhUaHR8cQfs/s800/alphabet_character_b.png";
        break;
    }
  }
  return(
    <React.Fragment>
      <img src={image} className="candidate-image"/>
      <div className="candidate-detail">
        <div className="candidate-detail__title">{props.name}</div>
        <div className="candidate-detail__bar-graph">
          <div className="bar" style={barStyle}>
            <div className="score">{ props.countUpState_vote_ratio }%</div>
          </div>
        <form 
          className="poll-form"
          onSubmit={(e) => props.handleVote(e, candidateId)}
        >
          {pollButton}
        </form>
        </div>
      </div>
    </React.Fragment>
  )
}
/**
 * AgendaBoardが内包する、Candidate(投票対象)の情報とそのvote情報
 * 
 * @param {*} props = {
 *   @param {object} agenda :      { id, message, name, start_time, end_time, created_at, updated_at, user_id }
 *   @param {array} candidates :   [candidate1, cadidate2, ...] 
 *     @param {object} candidate : { id, message, name, created_at, updated_at, agenda_id }
 * }    
 * 
 */
const CandidateBoards = (props) =>{
  const candidates = props.candidates
  const didVote = candidates.some((candidate =>{
    return candidate.didVote
  }))
  const list = candidates.map((candidate, i) => {
    return(
      <li className="candidate-board" id="candidate<%= candidate.id %>-board" key={i}>
        {/* hidden_field_tag("candidate#{candidate.id}", candidate.vote_ratio, id: "candidate#{candidate.id}-vote-ratio") */}
        <div className="candidate-board-top">
          <CandidateImagePanel 
            {...candidate}
            didVote={didVote}
            number={i}
            handleVote={(e, candidateId) => props.handleVote(e, candidateId)}
          />
        </div>
        <div className="candidate-board-bottom">
          <Message message={candidate.message} />
          <Comments message={candidate.message} userName = {props.agenda.user_name}/>
        </div>
      </li>
    )
  })
  return(
    <ul className="candidate-boards">
      {list}
    </ul>
  )
}

export default CandidateBoards