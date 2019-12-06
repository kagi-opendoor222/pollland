import React from "react";

const UserDashBoard = () => {
  return(
    <div className="dashboard">
      <div className="dashboard-top">
      </div>
      <div className="dashboard-main">
        <div className="color-bar">
          <div className="color-bar__user-name">
            ユーザ名
          </div>
        </div>
        <div className="user-info">
          <img className="user-info__img" src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
          <ul className="user-info__count">
            <li className="count-status">
              <div className="count-status__name">
                投票開設回数
              </div>
              <div className="count-status__value">
                10
              </div>
            </li>
            <li className="count-status">
              <div className="count-status__name">
                投票回数
              </div>
              <div className="count-status__value">
                10
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserDashBoard;