import React from "react";

const ThemeList = () => {
  return(
    <div className="stream">
      <div className="theme-card">
        <a>
          <ul className="theme-card__img-box">
            <li>
              <img src="http://up.gc-img.net/post_img/2014/01/WzyQNqaspyT33CI_MINaP_33.jpeg"/>
            </li>
            <li>
              <img src="http://up.gc-img.net/post_img/2014/01/WzyQNqaspyT33CI_MINaP_33.jpeg"/>
            </li>
          </ul>
        </a>
        <div className="theme-card__title">
          <div className="theme-detail">
            <div className="theme-detail__title">なまえ</div>
          </div>
        </div>
        <div className="theme-card__user">
          <img src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
          <p>nickname</p>
        </div>
      </div>
    </div>
  )
}

export default ThemeList;