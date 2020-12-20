import React from 'react'
import { Redirect } from 'react-router-dom'
import Mypage from './Mypage'
import Login from './Login'

{/* const Auth = props => {
const Auth = props =>
  User.isLoggedIn() ? props.children : <Redirect to = {'/login'} />;
*/}

const Auth = (props) => {
  if (localStorage.username){
    return(
      <Mypage />
    )
    //<Redirect to = {'/mypage/'} />;
  }else{
    return(
      <Login />
    )
  }
}

export default Auth;
