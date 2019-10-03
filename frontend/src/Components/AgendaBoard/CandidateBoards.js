import React from "react";

export const Comments = () => {
  return(
    <ul className="comments">
      comments
      <li className="comment">
        <div className="comment__message">
          テストテストテストテストテストテストテストテスト
        </div>
        <div className="comment__user">
          <img src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
          <p>nickname</p>
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
    "background": "linear-gradient(#40BFB0, #009F8C)",
    "border": "solid 1px white",
    "width": (barWidth + "%"),
    "transition": "0.7s",
    "height": "25px",
    "position": "relative"
  }
  return(
    <React.Fragment>
      <img src={props.image_url} className="candidate-image"/>
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
          <input type="submit" className="poll-button" value="投票"/>
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
  const list = candidates.map((candidate, i) => {
    return(
      <li className="candidate-board" id="candidate<%= candidate.id %>-board" key={i}>
        {/* hidden_field_tag("candidate#{candidate.id}", candidate.vote_ratio, id: "candidate#{candidate.id}-vote-ratio") */}
        <div className="candidate-board-top">
          <CandidateImagePanel 
            {...candidate}
            handleVote={(e, candidateId) => props.handleVote(e, candidateId)}
          />
        </div>
        <div className="candidate-board-bottom">
          <Comments />
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