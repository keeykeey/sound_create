import React from 'react'
import Style from './Layout.module.scss'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import MainContents from '../MainContents/MainContents'


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
          <MainContents.Mypage/>
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

export default {
  MypageLayout,
  MysongLayout,
};
