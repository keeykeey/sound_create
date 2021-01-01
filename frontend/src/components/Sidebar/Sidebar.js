import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Style from './Sidebar.module.scss'
import LogoutControl from '../Logout/LogoutControl'
import {Link} from "react-router-dom";
import endPoint from '../../services/endPoint';

const Sidebar = (props) => {
  const DRFUSERRELATION_API_URL = endPoint.getUserRelationUrl()
  const [userRelations,setUserRelations] = useState([])
  useEffect(() =>{
    axios.get(DRFUSERRELATION_API_URL).then(
      res=>{
        setUserRelations(res.data.filter(key=>String(key.follower.id)===String(props.loginId)))
      })
  },[DRFUSERRELATION_API_URL,props.loginId])

  const DRFCUSTOMUSER_API_URL=endPoint.getCustomUserUrl()
  const[followeeNameOnBtn,setFolloweeNameOnBtn]=useState([])
  const [error,setError] = useState([])

  return(
      <div>
        <div className={Style.title}> ページ</div>
          <Link to='/'>
            <button className={Style.button} >ホーム</button>
          </Link>
          <Link to='/uprising'>
            <button className={Style.button} > 急上昇 </button>
          </Link>
          <Link to='/famous'>
            <button className={Style.button} > 人気 </button>
          </Link>
          <Link to={'/mypage/'+props.loginName}>
            <button className={Style.button} > マイページ </button>
          </Link>
        <div className={Style.title}>お気に入り</div>

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
    <Link to={'/favorite/'+followeeNameOnBtn} key={followeeNameOnBtn.toString()}>
      <button className={Style.button} > {followeeNameOnBtn} </button>
    </Link>
)}

export default Sidebar;
