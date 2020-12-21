import React from 'react'
import { Redirect,Switch } from 'react-router-dom'
import Mypage from './Mypage'
import Mysong from './Mysong'
import Login from './Login'

{/* const Auth = props => {
const Auth = props =>
  User.isLoggedIn() ? props.children : <Redirect to = {'/login'} />;
*/}

const Auth = (props) => {
  if (!localStorage.username){
    return(
      <Redirect to ={'/login'}/>
    )
  }else{
    return(
      props.children
    )
  }
}
export default Auth
