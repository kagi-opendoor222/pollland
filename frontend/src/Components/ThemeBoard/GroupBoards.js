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

export const GroupImagePanel = () => {
  return(
    <div>
      <img src="https://dol.ismcdn.jp/mwimgs/7/1/670m/img_71c53c1d81500a1cf73a4f543e72413f27838.jpg"/>
      <div className="group-detail">
        <div className="group-detail__title">GroupName</div>
        <div className="group-detail__bar-graph">
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

const GroupBoards = () =>{
  return(
    <ul className="group-boards">
      <li className="group-board" id="group<%= group.id %>-board" >
        {/* hidden_field_tag("group#{group.id}", group.vote_ratio, id: "group#{group.id}-vote-ratio") */}
        <div className="group-board-top">
          <GroupImagePanel />
        </div>
        <div className="group-board-bottom">
          <Comments />
        </div>
      </li>
      <li className="group-board" id="group<%= group.id %>-board" >
        {/* hidden_field_tag("group#{group.id}", group.vote_ratio, id: "group#{group.id}-vote-ratio") */}
        <div className="group-board-top">
          <GroupImagePanel />
        </div>
        <div className="group-board-bottom">
          <Comments />
        </div>
      </li>
    </ul>
  )
}

export default GroupBoards