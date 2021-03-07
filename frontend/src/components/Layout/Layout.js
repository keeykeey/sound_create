import React, {useState} from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'
import Terms from '../MainContents/Terms'
import Login from '../../pages/Login'
import PostSong from '../PostSong/PostSong'
import { HashRouter as Router, Route, Switch} from 'react-router-dom'

const loginName = localStorage.getItem('username');
const loginId = localStorage.getItem('user_id');

const HomeLayout = (props)=>{
  const [windowWidth,setWindowWidth]=useState(window.innerWidth)
  window.addEventListener('resize',()=>{
    setWindowWidth(window.innerWidth)
  })

  const [showSidebar,setShowSidebar]=useState(false)

  return(
    <div className={Style.col}>
      <div className={Style.topSize}>
        <Header windowWidth={windowWidth} setWindowWidth={setWindowWidth}
                showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      </div>
      <div className = {Style.row}>
        <Router>
          {windowWidth>500?
          <div className={Style.leftSide}>
            <Sidebar loginName={loginName} loginId={loginId} windowWidth={windowWidth} setWindowWidth={setWindowWidth}/>
          </div>:null}
          {(windowWidth<=500 && showSidebar)?
          <div className={Style.leftSide}>
            <Sidebar loginName={loginName} loginId={loginId} windowWidth={windowWidth} setWindowWidth={setWindowWidth}/>
          </div>:null}

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
              <Route exact path='/owner/:followeeName'>
                <MainContents.EachUsersPage  loginName={loginName} loginId={loginId}/>
              </Route>
              <Route exact path='/terms'>
                <Terms.AllService  loginName={loginName} loginId={loginId}/>
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
