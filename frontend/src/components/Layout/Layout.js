import React from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'
import Login from '../../pages/Login'
import PostSong from '../PostSong/PostSong'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'

const loginName = localStorage.getItem('username');
const loginId = localStorage.getItem('user_id');

const HomeLayout = (props)=>{
  return(
    <div className={Style.col}>
      <div className={Style.topSize}>
        <Header/>
      </div>
      <div className = {Style.row}>
        <Router>
          <div className={Style.leftSide}>
            <Sidebar loginName={loginName} loginId={loginId}/>
          </div>
          <div className={Style.rightSide}>
            <Switch>
              <Route exact path='/user/'>
                <MainContents.SortByUser loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path='/genre/'>
                <MainContents.SortByGenre loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path='/login/'>
                <Login loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path={'/mypage/'+loginName+'/'}>
                <MainContents.Mypage loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path={'/mypage/'+loginName+'/mypost/'}>
                <PostSong.PostSongPage loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path='/:followeeName'>
                <MainContents.EachUsersPage  loginName={loginName} loginId={loginId}/>
              </Route>

              <Route>
                <MainContents.Public loginName={loginName} loginId={loginId}/>
              </Route>
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
