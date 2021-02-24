import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Style from './MainContents.module.scss';
import {Link} from 'react-router-dom';
import AudioControl from '../AudioControl/AudioControl';
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl()
const DRFPOSTSONG_API_URL_FORVIEW = endPoint.getPostSongUrlForView()
const DRFLIKES_API_URL = endPoint.getLikesUrl()
const DRFUSERRELATION_API_URL = endPoint.getUserRelationUrl()
const DRFUSERRELATION_API_URL_FORVIEW = endPoint.getUserRelationUrlForView()//add

const pushFavoriteButton = (followerId,followeeId)=>{
  const favoriteButton = document.querySelector(
    '#favoriteOf'+String(followerId)+'and'+String(followeeId)
  )
  return(
    axios.post(DRFUSERRELATION_API_URL,{
      'follower':followerId,
      'followee':followeeId,
    }).then(
      function(error){
        if(!error.response){
          console.log('success')
          favoriteButton.innerHTML = '登録解除'
          favoriteButton.style.backgroundColor='#c0c0c0'
        }
    }).catch(
      function(error){
        if(error.response){
          console.log('error',error.response)
          favoriteButton.innerHTML = 'チャンネル登録'
          favoriteButton.style.backgroundColor='#de0000'
          cancelFavoriteButton(
            followerId,
            followeeId,
          )
        }})
  )}

const cancelFavoriteButton = (
  followerId,
  followeeId,
)=>{
  axios.get(
    DRFUSERRELATION_API_URL+'?followee='+followeeId)
    .then(res=>res=res.data.filter(key=>String(key.follower)===String(followerId))[0]['id'])
    .then(res=>axios.delete(DRFUSERRELATION_API_URL + String(res)))
}

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
  axios.get(DRFLIKES_API_URL).then(
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

const PutChannelRegisterButton = (
  isFollowing,
  loginId,
  followeeId,
) => {
  if(isFollowing){
    return(
      <button className={Style.stopRegisteringChannel}
        onClick={(e)=>pushFavoriteButton(
          loginId,
          followeeId,
          e,
        )}
        id = {'favoriteOf'+String(loginId)+'and'+String(followeeId)}>
        登録解除
      </button>
    )
  }else if(!isFollowing){
    return(
      <button className={Style.registerChannel}
        onClick={(e)=>pushFavoriteButton(
          loginId,
          followeeId,
          e,
        )}
        id = {'favoriteOf'+String(loginId)+'and'+String(followeeId)}>
        チャンネル登録
      </button>
    )
  }
}

const SongGridItemForPublic = (
  song_title,
  audio_file,
  user_name,
  followeeId,
  login_user_id,
  song_id,
  likes_count,
)=>{
  const audioFilePath = String(audio_file).replace('https://','').replace('http://','')

  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.item}>
      <div className={Style.songTitle} >{song_title} </div>
      <audio id = {'audioTagIdOfSong'+song_id}
             className={Style.audio}
             src={String(audioFilePath)}
             />
      <div>
        {AudioControl(song_id)}
      </div>
      <div className={Style.userName} >
        user_name : {user_name}
        <Link to={'/owner/'+user_name}>
          <button className={Style.linkToEachUsersPage}> チャンネルへ移動 </button>
        </Link>
      </div>
      <button  className={Style.like} onClick={(e)=>pushLikesIcon(song_id,login_user_id,e)} >
        <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+login_user_id}>{likes_count}</i>
      </button>
    </div>
    <div className={Style.item}>
    </div>
  </div>
)}

const SongGridItemForPrivate = (
  song_title,
  audio_file,
  login_user_id,
  song_id,
  likes_count,
)=>{
  const audioFilePath = String(audio_file).replace('https://','').replace('http://','')

  return(
    <div className={Style.eachSongBlock}>
      <div className={Style.item}>
        <div className={Style.songTitle} >{song_title} </div>
        <audio id = {'audioTagIdOfSong'+song_id}
               className={Style.audio}
               src={String(audioFilePath)}
               />
        <div>
          {AudioControl(song_id)}
        </div>
        <br/>
        <button  className={Style.like} onClick={(e)=>pushLikesIcon(song_id,login_user_id,e)} >
          <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+login_user_id}>{likes_count}</i>
        </button>
      </div>
      <div className={Style.item}>
      </div>
    </div>)
}

const SongGridItemForFavorite = (
  song_title,
  audio_file,
  user_name,
  followeeId,
  login_user_id,
  song_id,
  likes_count,
)=>{
  const audioFilePath = String(audio_file).replace('https://','').replace('http://','')

  return(
  <div className={Style.eachSongBlock}>
    <div className={Style.item}>
      <div className={Style.songTitle} >{song_title} </div>
      <audio id = {'audioTagIdOfSong'+song_id}
             className={Style.audio}
             src={String(audioFilePath)}
             />
      <div>
        {AudioControl(song_id)}
      </div>
      <div className={Style.userName} >
        user_name : {user_name}
      </div>
      <button  className={Style.like} onClick={(e)=>pushLikesIcon(song_id,login_user_id,e)} >
        <i className="fas fa-thumbs-up" id={'likeOf'+song_id+'and'+login_user_id}>{likes_count}</i>
      </button>
    </div>
    <div className={Style.item}>
    </div>
  </div>
)}

const ChannelRegisterButton = (loginId,followeeId,props) => {
//  const [userRelations,setUserRelations] = useState([])
  const [isFollowing,setIsFollowing] = useState(false)

  useEffect(()=>{
    axios.get(DRFUSERRELATION_API_URL + '?follower='+ String(loginId))
    .then(
      res=>{
        console.log('status',res.data);
        console.log(
          '3...',
          String(res.data.filter
            (key=>(String(key.followee))===(String(followeeId)))[0].followee)===String(followeeId)
          );
        setIsFollowing(
          String(res.data.filter
            (key=>(String(key.followee))===(String(followeeId)))[0].followee)===String(followeeId)
          )
        }
    ).catch(
      error=>console.log('error...',error)
    )
  },[loginId,followeeId])

  if(isFollowing){
    return(
      <button className={Style.stopRegisteringChannel}
        onClick={(e)=>pushFavoriteButton(loginId,followeeId,e)}
        id = {'favoriteOf'+String(loginId)+'and'+String(followeeId)}>
        登録解除
      </button>
    )
  }else if(!isFollowing){
    return(
      <button className={Style.registerChannel}
        onClick={(e)=>pushFavoriteButton(loginId,followeeId,e)}
        id = {'favoriteOf'+String(loginId)+'and'+String(followeeId)}>
        チャンネル登録
      </button>
    )
  }
}

const Public = (props) => {
  const [song,setSong] = useState([])
  const [like,setLike] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW)
    .then(res=>{setSong(res.data)}).catch(console.log('error...'))
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
        {song.map(
          song => SongGridItemForPublic(
            song.song_title,
            song.audio_file,
            song.user_id.username,
            song.user_id.id,
            props.loginId,
            song.song_id,
            like.filter(key=>String(key.song_id)===String(song.song_id)).length,
        ))}
      </ul>
    </div>
  )
}

const SortByUser = (props) => {
  return(
    <div>
      <h3>
        Sort by Genre
      </h3>
      <hr/>
      <ul>
      </ul>
      <h3>test</h3><hr/>
      <ul>
      </ul>
    </div>
  )
}

const SortByGenre = (props) => {
  const [song,setSong] = useState([])// eslint-disable-line
  const [like,setLike] = useState([])// eslint-disable-line
  const [userRelations,setUserRelations] = useState([])//add

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW)
    .then(res=>{setSong(res.data)})
  },[props.loginId]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLike(res.data)})
  },[props.loginId]);

  useEffect(()=>{
    axios.get(DRFUSERRELATION_API_URL_FORVIEW + '?follower='+ String(props.loginId))
    .then(
      res=>setUserRelations(res.data)
    ).catch(
      error=>console.log('error...',error)
    )
  },[props.loginId])

  return(
    <div>
      <h3>
        Sort by Genre
      </h3>
      <hr/>
      <ul>
        {userRelations.map(
          userRelations=>(
            <div>
              <li>{userRelations.followee.username}</li>
              <div>length...:{String(userRelations.followee.username)}</div>
            </div>
          ))}
      </ul>
      <h3>test</h3><hr/>
      <ul>
        {ChannelRegisterButton(props.loginId,6)}
      </ul>
    </div>
  )
}

const Mypage = (props) => {
  const [song,setSong] = useState([])
  const [like,setLike] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW)
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id.id)===String(props.loginId)))})
  },[props.loginId]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLike(res.data)})
  },[]);

  return(
    <div>
      <h3>
        You're Posts
      </h3>
      <Link to={'/mypage/'+props.loginName+'/mypost'}>
        <button className={Style.linkToUploadSong}>曲を追加</button>
      </Link>
      <hr/>
      <ul>
        {song.map(
          song => SongGridItemForPrivate(
            song.song_title,
            song.audio_file,
            props.loginId,
            song.song_id,
            like.filter(key=>String(key.song_id)===String(song.song_id)).length,
          )
        )
        }
      </ul>
    </div>
  )
}

const EachUsersPage = (props) =>{
  const {followeeName} =useParams();
  const [song,setSong]=useState([]);
  const [likes,setLikes] = useState([]);
  const [isFollowing,setIsFollowing] = useState(false)
  const [followeeId,setFolloweeId] = useState([])

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW)
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id.username)===String(followeeName)))})
  },[followeeName,]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLikes(res.data)})
  },[]);

  useEffect(()=>{
    axios.get(DRFUSERRELATION_API_URL_FORVIEW + '?follower='+ String(props.loginId))
    .then(
      res=>{
        setIsFollowing(
          String(res.data.filter
            (key=>(String(key.followee.username))===(String(followeeName)))[0].followee.username)===String(followeeName)
          );
      }
    ).catch(
      error=>console.log('error...',error)
    )
  },[props.loginId,followeeName]);

  useEffect(()=>{
    axios.get(DRFCUSTOMUSER_API_URL+'?username='+String(followeeName))
    .then(res=>{
      setFolloweeId(res.data[0].id)
    })
    .catch(error=>console.log('error...',error))
  },[props.loginId,followeeName])

  return (
    <div>
      <h3> {followeeName}aaa </h3>
      <div>{PutChannelRegisterButton(
        isFollowing,
        props.loginId,
        followeeId,
      )}</div>
      <hr/>
      <ul key={song.song_id}>
        {song.map(
          song=>SongGridItemForFavorite(
            song.song_title,
            song.audio_file,
            song.user_id.username,
            song.user_id.id,
            props.loginId,
            song.song_id,
            likes.filter(key=>String(key.song_id)===String(song.song_id)).length,
          ))}
      </ul>
    </div>
  );
}

const MainContents = {
  SongGridItemForPublic,
  SongGridItemForPrivate,
  Public,
  SortByUser,
  SortByGenre,
  Mypage,
  EachUsersPage,
};

export default MainContents
