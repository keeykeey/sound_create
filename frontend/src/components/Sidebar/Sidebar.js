import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Style from './Sidebar.module.scss'
import LogoutControl from '../Logout/LogoutControl'
import {Link} from "react-router-dom";
import endPoint from '../../services/endPoint';

const Sidebar = (props) => {
  const DRFUSERRELATION_API_URL_FORVIEW = endPoint.getUserRelationUrlForView()
  const [userRelations,setUserRelations] = useState([])
  useEffect(() =>{
    axios.get(DRFUSERRELATION_API_URL_FORVIEW+'?follower='+String(props.loginId)).then(
      res=>{
        setUserRelations(res.data)
      })
  })

  return(
      <div>
        <div className={Style.title}> ページ</div>
          <Link to='/'>
            <button className={Style.button} >ホーム</button>
          </Link>
          <Link to='/user'>
            <button className={Style.button} > ユーザ別 </button>
          </Link>
          <Link to='/genre'>
            <button className={Style.button} > ジャンル別 </button>
          </Link>
          <Link to={'/mypage/'+props.loginName+'/'}>
            <button className={Style.button} > マイページ </button>
          </Link>
        <div className={Style.title}>登録ユーザー</div>

        <div className={Style.block}>
          {userRelations.map(userRelations=>LinkButtonToFollowingUser(
            userRelations.followee.username
          ))}
        </div>

        <div className={Style.logout}>
          <LogoutControl/>
        </div>
      </div>
  )
}

const LinkButtonToFollowingUser = (
  followeeNameOnBtn
)=>{
  return(
    <Link to={'/'+followeeNameOnBtn} key={followeeNameOnBtn.toString()}>
      <button className={Style.button} > {followeeNameOnBtn} </button>
    </Link>
)}

export default Sidebar;
