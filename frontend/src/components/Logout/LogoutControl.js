import React from 'react';
import Style from './LogoutControl.module.scss';
import AuthService from '../../services/auth.service.js';
import Form from 'react-validation/build/form';
import {withRouter} from 'react-router-dom';//to enable props.history.push

const LogoutControl = (props) => {
  const handleLogout = (event) => {
    event.preventDefault();
    AuthService.logout()
    props.history.push('/');
    window.location.reload();
  }

  return(
    <Form onSubmit={handleLogout} >
      <button className={Style.button}>
        <span>
          logout
        </span><br/>
        <i className="fas fa-sign-out-alt"></i>
      </button>
    </Form>
  )
}

export default withRouter(LogoutControl)
