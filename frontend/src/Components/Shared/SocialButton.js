import React from "react"
import {Link} from "react-router-dom"

const SocialButton = (props) => {
  const social = props.social
  return(
    <Link 
      to="/login"
      onClick={()=>props.loginByOmniAuth(social)}
      className={`social-btn social-btn-icon btn-${social}`}
      href="#"
    >
      <i className={`fa fa-${social}`}></i>
      <span>Login by {social}</span>
    </Link>
  )
}

export default SocialButton