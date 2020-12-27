import React from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'
import AuthService from '../../services/auth.service'

const loginName = localStorage.getItem('username')
const loginId = localStorage.getItem('user_id');

console.log('localstorage',localStorage)

const MypageLayout = ({children})=>{
  return(
    <div>
      <div>
        <Header/>
      </div>
      <div className = {Style.row}>
        <div className={Style.leftSide}>
          <Sidebar/>
        </div>
        <div className={Style.rightSide}>
          <MainContents.Mypage loginName={loginName} loginId={loginId}/>
        </div>
      </div>
    </div>
  )
}


const MysongLayout = (props) => {
  return(
    <div>
      mysong layout
    </div>
  )
}

const Layout = {
  MypageLayout,
  MysongLayout,
}

export default Layout;
