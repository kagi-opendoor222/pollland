import React from "react";
import GroupBoards from "./GroupBoards";

class ThemeBoard extends React.Component{
  render(){
    return(
      <div>
        <div className="theme-title">
          ThemeName
        </div>
        <div className="contents-container">
          <GroupBoards />
        </div>
      </div>
    )
  }
}

export default ThemeBoard;