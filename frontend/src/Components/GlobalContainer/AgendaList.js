import React from "react";

const AgendaList = () => {
  return(
    <div className="stream">
      <div className="agenda-card">
        <a>
          <ul className="agenda-card__img-box">
            <li>
              <img src="http://up.gc-img.net/post_img/2014/01/WzyQNqaspyT33CI_MINaP_33.jpeg"/>
            </li>
            <li>
              <img src="http://up.gc-img.net/post_img/2014/01/WzyQNqaspyT33CI_MINaP_33.jpeg"/>
            </li>
          </ul>
        </a>
        <div className="agenda-card__title">
          <div className="agenda-detail">
            <div className="agenda-detail__title">なまえ</div>
          </div>
        </div>
        <div className="agenda-card__user">
          <img src="https://ai-catcher.com/wp-content/uploads/icon_74-1.png" />
          <p>nickname</p>
        </div>
      </div>
    </div>
  )
}

export default AgendaList;