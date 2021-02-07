import React from 'react'
import { Link } from 'react-router-dom'
import Style from './Header.module.scss'

function formatName(user){
  return user.name;
}

const auth_username = {
   name : localStorage.username
}

function getGreeting(auth_username){
  if (auth_username.name){
   return <h3>Hello, {formatName(auth_username)}!</h3>;
  }
  return <h3>You're Welcome! </h3>;
}

const Header = () => {
  return (
    <div className={ Style.header }>
      <div className={ Style.item }>
        <Link className={ Style.headerText } to ='/'>Sound_Create</Link>
      </div>
      <div className={ Style.item}>
        { getGreeting(auth_username) }
      </div>
    </div>
  )
}

export default Header
