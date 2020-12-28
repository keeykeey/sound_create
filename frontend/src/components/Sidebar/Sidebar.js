import React from 'react'
import Style from './Sidebar.module.scss'
import LogoutControl from '../Logout/LogoutControl'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

const Sidebar = (props) => {

  return(
      <div>
        <div className={Style.title}> ページ</div>
          <Link to='/'>
            <button className={Style.button} >ホーム/</button>
          </Link>
          <Link to='/uprising/'>
            <button className={Style.button} > 急上昇 uprising</button>
          </Link>
          <Link to='famous'>
            <button className={Style.button} > 人気 famous</button>
          </Link>
          <Link to = '/mypage'>
            <button className={Style.button} > マイページ mypage</button>
          </Link>

        <div className={Style.title}>お気に入り</div>
        <div className={Style.block}>
          <button className={Style.button} > Ray Charls </button>
          <button className={Style.button} > Mickel Jackson </button>
          <button className={Style.button} > billy joel </button>
          <button className={Style.button} > ITOSHIN TV </button>
          <button className={Style.button} > 将棋の森 </button>
          <button className={Style.button} > jackson 5 </button>
          <button className={Style.button} > data science bowl </button>
          <button className={Style.button} > Bird Watch TV </button>
          <button className={Style.button} > animal planet </button>
          <button className={Style.button} > friends </button>
          <button className={Style.button} > つんく </button>
          <button className={Style.button} > britony spears </button>
          <button className={Style.button} > amazon prime </button>
        </div>
        <div className={Style.logout}>
          <LogoutControl/>
        </div>
      </div>
  )
}

export default Sidebar;
