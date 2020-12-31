import React from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'
import Login from '../../pages/Login'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'

const loginName = localStorage.getItem('username');
const loginId = localStorage.getItem('user_id');

const HomeLayout = (props)=>{
  return(
    <div>
      <div>
        <Header/>
      </div>
      <div className = {Style.row}>
        <Router>
          <div className={Style.leftSide}>
            <Sidebar loginName={loginName} loginId={loginId}/>
          </div>
          <div className={Style.rightSide}>
            <Switch>
              <Route exact path='/uprising/'>
                <MainContents.Uprising/>
              </Route>
              <Route exact path='/famous/'>
                <MainContents.Famous/>
              </Route>
              <Route exact path='/login/'>
                <Login/>
              </Route>
              <Route exact path={'/mypage/'+loginName}>
                <MainContents.Mypage loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path='/favorite/:followeeId' children={<MainContents.FollowingUsersPage />}/>
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
