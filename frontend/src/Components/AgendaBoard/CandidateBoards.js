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

export const CandidateImagePanel = () => {
  return(
    <div>
      <img src="https://dol.ismcdn.jp/mwimgs/7/1/670m/img_71c53c1d81500a1cf73a4f543e72413f27838.jpg"/>
      <div className="candidate-detail">
        <div className="candidate-detail__title">candidateName</div>
        <div className="candidate-detail__bar-graph">
          <div className="bar">
            <div className="score">0%</div>
          </div>
        <form className="poll-form">
          <input type="submit" className="poll-button" value="投票"/>
        </form>
        </div>
      </div>
    </div>
  )
}

const CandidateBoards = () =>{
  return(
    <ul className="candidate-boards">
      <li className="candidate-board" id="candidate<%= candidate.id %>-board" >
        {/* hidden_field_tag("candidate#{candidate.id}", candidate.vote_ratio, id: "candidate#{candidate.id}-vote-ratio") */}
        <div className="candidate-board-top">
          <CandidateImagePanel />
        </div>
        <div className="candidate-board-bottom">
          <Comments />
        </div>
      </li>
      <li className="candidate-board" id="candidate<%= candidate.id %>-board" >
        {/* hidden_field_tag("candidate#{candidate.id}", candidate.vote_ratio, id: "candidate#{candidate.id}-vote-ratio") */}
        <div className="candidate-board-top">
          <CandidateImagePanel />
        </div>
        <div className="candidate-board-bottom">
          <Comments />
        </div>
      </li>
    </ul>
  )
}

export default CandidateBoards