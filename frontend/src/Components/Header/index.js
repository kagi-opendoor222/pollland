import React from "react";
import SocialButton from "../Shared/SocialButton"
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom";

const Header = ()=>{
  return(
    <div id="header">
      <h1 className="inner">
        <Link to="/">POLLLAND</Link>
      </h1>
    </div>
  )
}

export default Header