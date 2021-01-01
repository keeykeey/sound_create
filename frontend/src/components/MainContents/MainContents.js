import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Style from './MainContents.module.scss'
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFPOSTSONG_API_URL = endPoint.getPostSongUrl()
const DRFLIKES_API_URL = endPoint.getLikesUrl()
const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl()

const pushLikesIcon = (song_id,user_id) =>{
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
          }
        }
      ).catch(
        function(error){
          if(error.response){
            subtractLikeNumInDb(song_id,user_id)
            likeIcon.innerHTML=String(presentLikeNum-1)
          }
        }
      )
  )
}

const subtractLikeNumInDb = (song_id,user_id) => {
  const promiseOnj=axios.get(DRFLIKES_API_URL).then(
    res=>res.data.filter(
      key=>String(key.song_id)===String(song_id)
    ).filter(
      key=>String(key.user_id)===String(user_id)
    )[0]['id']
  ).then(
    res=>{
      axios.delete(DRFLIKES_API_URL+res)
    })
}

const SongGridItemForPublic = (
  song_title,
  audio_file,
  user_name,
  user_id,
  song_id,
  likes_count,
)=>{
  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.songTitle} >{song_title} </div>
    <audio className={Style.audio} src={String(audio_file)} controls/>
    <div className={Style.userName} >user_name : {user_name}</div>
    <button  className={Style.like} onClick={(e)=>pushLikesIcon(song_id,user_id,e)} >
      <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+user_id}>{likes_count}</i>
    </button>
  </div>)
}

const SongGridItemForPrivate = (
  song_title,
  audio_file,
  user_id,
  song_id,
  likes_count,
)=>{
  return(
    <div className={Style.eachSongBlock}>
      <div className={Style.songTitle}>{song_title} </div>
      <audio className={Style.audio} src={String(audio_file)} controls/>
      <div>
        <button className={Style.like} onClick={(e)=>pushLikesIcon(song_id,user_id,e)} >
          <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+user_id}>{likes_count}</i>
        </button>
      </div>
    </div>)
}

const Public = (props) => {
  const [song,setSong] = useState([])
  const [like,setLike] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
    .then(res=>{setSong(res.data)})
  },[]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLike(res.data)})
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
          song.user_id.username,
          song.user_id.id,
          song.song_id,
          like.filter(key=>String(key.song_id)===String(song.song_id)).length,
        ))}
      </ul>
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
  const [like,setLike] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
  .then(res=>{setSong(res.data.filter(key=>String(key.user_id.id)===String(props.loginId)))})
},[props.loginId]);

useEffect(()=>{
  axios.get(DRFLIKES_API_URL)
  .then(res=>{setLike(res.data)})
},[]);

  return(
    <div>
      <h3>
        {props.loginName}'s page
      </h3>
      <hr/>
      <ul>
        {song.map(
          song => SongGridItemForPrivate(
            song.song_title,
            song.audio_file,
            song.user_id.id,
            song.song_id,
            like.filter(key=>String(key.song_id)===String(song.song_id)).length,
          )
        )
        }
      </ul>
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
  const {followeeName} =useParams();
  const [song,setSong]=useState([]);
  const [likes,setLikes] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL)
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id.username)===String(followeeName)))})
  },[followeeName]
  );

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLikes(res.data)})
  },[]);

  return (
    <div>
      <h3> {followeeName}'s Page </h3>
      <hr/>
      <ul>
        {song.map(
          song=>SongGridItemForPublic(
            song.song_title,
            song.audio_file,
            song.user_id.username,
            song.user_id.id,
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
