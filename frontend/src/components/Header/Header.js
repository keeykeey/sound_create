import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Style from './Header.module.scss'
import LogoutControl from '../Logout/LogoutControl.js'
import LinkToLogin from '../Login/LinkToLogin.js'
import LinkToRegister from '../Register/LinkToRegister.js'
import Sidebar from '../Sidebar/Sidebar.js'

function formatName(user){
  return user.name;
}

const auth_username = {
   name : localStorage.username
}

function getGreeting(auth_username){
  if (auth_username.name){
   return (
       <h3>Hi, {formatName(auth_username)}!</h3>
   )
  }
  return (
    <div className={Style.row}>
      <LinkToLogin/><LinkToRegister/>
    </div>
  );
}

const Header = ({windowWidth,setWindowWidth,showSidebar,setShowSidebar}) => {
  function handlePushSidebarIcon(){
    if(showSidebar){
      setShowSidebar(false)
    }else{
      setShowSidebar(true)
    }
  }

  const DisplaySidebarIcon=()=>{
    return(
      <button className={Style.icon} onClick={handlePushSidebarIcon}>
        <i className="fas fa-bars" size='100px'></i>
      </button>
    )
  }

  return (
    <div className={ Style.header }>
      {windowWidth<=500?
      <div className={Style.icon}>
        <DisplaySidebarIcon/>
      </div>:null}
      <div className={ Style.headerText }>
        <Link to ='/'>Sound_Create</Link>
      </div>
      <div className={ Style.userInfo}>
        { getGreeting(auth_username) }
      </div>
    </div>
  )
}

export default Header
