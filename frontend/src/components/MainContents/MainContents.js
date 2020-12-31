import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Style from './MainContents.module.scss'
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFPOSTSONG_API_URL = endPoint.getPostSongUrl()
const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl()

const SongGridItemForPublic = (
  artist_name,
  song_title,
  audio_file,
  user_id
)=>{
  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.songTitle} >{song_title} </div>
    <audio className={Style.audio} src={String(audio_file)} controls/>
    <div className={Style.artistName} >{artist_name}</div>
    <div className={Style.userName} >user_name : {getUserNameFromUserId(user_id)}</div>
  </div>)
}

const SongGridItemForPrivate = (
  artist_name,
  song_title,
  audio_file,
)=>{
  return(
    <div className={Style.eachSongBlock}>
      <div className={Style.songTitle}>{song_title} </div>
      <audio className={Style.audio} src={audio_file} controls/>
      <div className={Style.artistName}>{artist_name}</div>
    </div>)
}

const getUserNameFromUserId=(user_id)=>{
  const promiseObj = axios.get(DRFCUSTOMUSER_API_URL).then(
    res => {
        res=res.data.filter(key=>key.id===user_id)[0]['username']
    }
  )
  return('username : ' + String(user_id)+'...'+String(promiseObj))
}

const Public = (props) => {
  const [song,setSong] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
  .then(res=>{setSong(res.data)})
  },[]);

  return(
    <div>
      <div>
        Page for everyone
      </div>
      <ul>
        {song.map(song => SongGridItemForPublic(
          song.artist_name,
          song.song_title,
          song.audio_file,
          song.user_id,
        ))}
      </ul>
      <div>
        End of the page
      </div>
    </div>
  )
}

const Uprising = (props) => {
  return(
    <div>
      uprising
    </div>
  )
}

const Famous = (props) => {
  return(
    <div>
      famous
    </div>
  )
}

const Mypage = (props) => {
  const [song,setSong] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
  .then(res=>{setSong(res.data.filter(key=>String(key.user_id)===String(props.loginId)))})
},[props.loginId]);

  return(
    <div>
      mypage main content
      <ul>
        {song.map(
          song => SongGridItemForPrivate(
            song.artist_name,
            song.song_title,
            song.audio_file,
          )
        )
        }
        <div>
          <br/>oh2 {props.loginName} wao2
          <br/>oh3 {props.loginId} wao3
        </div>
      </ul>
      End of the page
    </div>
  )
}

const MysongDetail = (props) => {
  return(
    <div>
      mysong main content
    </div>
  )
}

const FollowingUsersPage = (props) =>{
  const [song,setSong]=useState([]);
  const {followeeId} =useParams();

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id)===String(followeeId)))})
  },[followeeId]
  );

  return (
    <div>
      <h3> Following User{followeeId}'s Page </h3>
      <hr/>
      <ul>
        {song.map(
          song=>SongGridItemForPrivate(
            song.artist_name,
            song.song_title,
            song.audio_file,
          ))}
      </ul>
    </div>
  );
}

const MainContents = {
  SongGridItemForPublic,
  SongGridItemForPrivate,
  Public,
  Uprising,
  Famous,
  Mypage,
  MysongDetail,
  FollowingUsersPage,
};

export default MainContents
