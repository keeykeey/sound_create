import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service'
import Style from './MainContents.module.scss'
import axios from 'axios';

const DRFPOSTSONG_API_URL = 'http://localhost:8000/drfPostSong/'

const DRFCUSTOMUSER_API_URL = 'http://localhost:8000/user/drfcustomuser/'
const JWT_API_URL = 'http://localhost:8000/api/auth/jwt/';
const TOKEN = 'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05'

const SongGridItemForPublic = (
  artist_name,
  song_title,
  audio_file,
  user_id
)=>{
  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.songTitle}>{song_title} </div>
    <audio className={Style.audio} src={audio_file} controls/>
    <div className={Style.artistName}>{artist_name}</div>
    <div className={Style.userName}>user_name : {getUserNameFromUserId(user_id)}</div>
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
        res=res.data.filter(key=>key.id==user_id)[0]['username']
    }
  )
  return('username : ' + String(user_id))
}

const Public = (props) => {
  const [song,setSong] = useState([])
  const [username,setUsername] = useState([])

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
  //.then(res=>console.log('here we are :',res.data))
  .then(res=>{setSong(res.data.filter(key=>key.user_id==2))})
  },[]);

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

const MainContents = {
  SongGridItemForPublic,
  SongGridItemForPrivate,
  Public,
  Uprising,
  Famous,
  Mypage,
  MysongDetail,
};

export default MainContents
