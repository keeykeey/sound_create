import React from 'react';
import Style from './LogoutControl.module.scss';
import AuthService from '../../services/auth.service.js';
import {withRouter} from 'react-router-dom';//to enable props.history.push

const LogoutControl = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    AuthService.logout()
    props.history.push('/');
    window.location.reload();
  }

  return(
    <form onSubmit={handleLogout} >
      <button className={Style.button}>
        <span>
          logout
        </span><br/>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </form>
  )
}

export default withRouter(LogoutControl)
