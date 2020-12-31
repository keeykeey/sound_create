import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Style from './MainContents.module.scss'
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFPOSTSONG_API_URL = endPoint.getPostSongUrl()
const DRFLIKES_API_URL = endPoint.getLikesUrl()
const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl()

const setLikesCount = (song_id,user_id) =>{
  const likeIcon = document.querySelector(
    '#likeOf'+String(song_id)+'and'+String(user_id)
  )
  const presentLikeNum = Number(likeIcon.textContent)

  return(
      axios.post(DRFLIKES_API_URL,{
        song_id,
        user_id,
      }).then(
        function(error){
          if(!error.response){
            likeIcon.innerHTML=String(presentLikeNum+1)
            console.log('pushing like icon succeed!')
          }
        }
      ).catch(
        function(error){
          if(error.response){
            console.log('pusshing like icon failed')
          }
        }
      )
  )
}

const SongGridItemForPublic = (
  song_title,
  audio_file,
  user_id,
  song_id,
  likes,
)=>{
  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.songTitle} >{song_title} </div>
    <audio className={Style.audio} src={String(audio_file)} controls/>
    <div className={Style.userName} >user_name : {getUserNameFromUserId(user_id)}</div>
    <button onClick={(e)=>setLikesCount(song_id,user_id,e)} >
      <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+user_id}>{likes}</i>
    </button>
  </div>)
}

const SongGridItemForPrivate = (
  song_title,
  audio_file,
  user_id,
  song_id,
  likes,
)=>{
  return(
    <div className={Style.eachSongBlock}>
      <div className={Style.songTitle}>{song_title} </div>
      <audio className={Style.audio} src={audio_file} controls/>
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
  const [likes,setLikes] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
    .then(res=>{setSong(res.data)})
  },[]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLikes(res.data)})
  },[]);

  return(
    <div>
      <h3>
        Page for everyone
      </h3>
      <hr/>
      <ul>
        {song.map(song => SongGridItemForPublic(
          song.song_title,
          song.audio_file,
          song.user_id,
          song.song_id,
          likes.filter(key=>String(key.song_id)===String(song.song_id)).length
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
      <h3>
        Uprising
      </h3>
      <hr/>
    </div>
  )
}

const Famous = (props) => {
  return(
    <div>
      <h3>
        Famous
      </h3>
      <hr/>
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
      <h3>
        Mypage main content
      </h3>
      <hr/>
      <ul>
        {song.map(
          song => SongGridItemForPrivate(
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
  const [likes,setLikes] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id)===String(followeeId)))})
  },[followeeId]
  );

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLikes(res.data)})
  },[]);

  return (
    <div>
      <h3> Following User{followeeId}'s Page </h3>
      <hr/>
      <ul>
        {song.map(
          song=>SongGridItemForPublic(
            song.song_title,
            song.audio_file,
            song.user_id,
            song.song_id,
            likes.filter(key=>String(key.song_id)===String(song.song_id)).length
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
