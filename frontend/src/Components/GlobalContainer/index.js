import React from "react";
import UserDashBoard from "./UserDashBoard";
import ThemeList from "./ThemeList";

const GlobalContainer = ()=>{
  return(
    <div className="contents-container">
      <UserDashBoard />
      <div className="main-content">
        <div className="main-content-top">
          <h2>投票</h2>
          <a className="main-content-top__post-theme-button">
            <span>テーマを投稿</span>
          </a>
        </div>
        <div className="main-content-board">
          <ThemeList />
        </div>
      </div>
    </div>
  )
}

export default GlobalContainer