import React from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'
import AuthService from '../../services/auth.service'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SwitchMainContents from './SwitchMainContents'

const loginName = localStorage.getItem('username')
const loginId = localStorage.getItem('user_id');

console.log('localstorage',localStorage)

const HomeLayout = (props)=>{
  return(
    <div>
      <div>
        <Header/>
      </div>
      <div className = {Style.row}>
        <Router>
          <div className={Style.leftSide}>
            <Sidebar/>
          </div>
          <div className={Style.rightSide}>
            <Switch>
              <Route path='/uprising/'>
                <MainContents.Uprising/>
              </Route>
              <Route path='/famous/'>
                <MainContents.Famous/>
              </Route>
              <Route path='/mypage/'>
                <MainContents.Mypage loginName={loginName} loginId={loginId}/>
              </Route>
              <Route component = {MainContents.Public}/>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  )
}

const Layout = {
  HomeLayout,
}

export default Layout;
