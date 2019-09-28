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
 *   @param {object} candidate : { id, message, name, created_at, updated_at, agenda_id }
 */
export const CandidateImagePanel = (props) => {
  return(
    <React.Fragment>
      <img src={props.image_url} className="candidate-image"/>
      <div className="candidate-detail">
        <div className="candidate-detail__title">{props.name}</div>
        <div className="candidate-detail__bar-graph">
          <div className="bar">
            <div className="score">{ props.vote_ratio }%</div>
          </div>
        <form className="poll-form">
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
          <CandidateImagePanel {...candidate} />
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