import React, { useState, useEffect,useRef} from 'react';
import {useParams} from 'react-router-dom';
import Style from './MainContents.module.scss';
import {Link} from 'react-router-dom';
import AudioControl from '../AudioControl/AudioControl';
import LinkToLogin from '../Login/LinkToLogin.js'
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl()
const DRFPOSTSONG_API_URL = endPoint.getPostSongUrl()
const DRFPOSTSONG_API_URL_FORVIEW = endPoint.getPostSongUrlForView()
const DRFLIKES_API_URL = endPoint.getLikesUrl()
const DRFUSERRELATION_API_URL = endPoint.getUserRelationUrl()
const DRFUSERRELATION_API_URL_FORVIEW = endPoint.getUserRelationUrlForView()//add
const DRFPOSTSONG_API_URL_FORDELETE = endPoint.getPostSongUrlForPutDelete()

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

const pushLikesIcon = (song_id,user_id,modalWhenPushLike,setModalWhenPushLike) =>{
  const likeIcon = document.querySelector(
    '#likeOf'+String(song_id)+'and'+String(user_id)
  )
  const presentLikeNum = Number(likeIcon.textContent)

  if(!user_id){
    console.log('not logged in...')
    setModalWhenPushLike(true)
  }else if(user_id){
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
  }
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

const ChannelRegisterButton = (loginId,followeeId,props) => {
  //const [userRelations,setUserRelations] = useState([])
  const [isFollowing,setIsFollowing] = useState(false)

  useEffect(()=>{
    axios.get(DRFUSERRELATION_API_URL + '?follower='+ String(loginId))
    .then(
      res=>{
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
  const [modalWhenPushLike,setModalWhenPushLike]=useState(false)

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW)
    .then(res=>{setSong(res.data)}).catch(console.log('error...'))
  },[]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLike(res.data)})
  },[]);

  const ModalWhenPushLike = (
    {modalWhenPushLike,setModalWhenPushLike}
  ) => {
    if(modalWhenPushLike){
      return(
        <div className={Style.overlayWhenPushLike} onClick={()=>setModalWhenPushLike(false)}>
          <div className={Style.insideOverlay} onClick={(e)=>e.stopPropagation()}>
            評価するにはログインしてください。
            <hr/>
            <LinkToLogin/>
          </div>
        </div>
      )}else{
        return null;
      }
  }

  return(
    <div>
      <h3>
        Page for everyone
      </h3>
      <hr/>
      <ModalWhenPushLike
        modalWhenPushLike={modalWhenPushLike}
        setModalWhenPushLike={setModalWhenPushLike}/>
      <ul>
        {
         song.map(song=>
           <div key={song.song_id} className={Style.eachSongBlock}>
             <div className={Style.item}>
               <div className={Style.songTitle} >{song.song_title} </div>
               <audio id = {'audioTagIdOfSong'+song.song_id}
                      className={Style.audio}
                      src={String(song.audio_file).replace('https://','').replace('http://','')}
                      />
               <div>
                 {AudioControl(song.song_id)}
               </div>
               <div className={Style.userName} >
                 user_name : {song.user_id.username}
                 <Link to={'/owner/'+song.user_id.username}>
                   <button className={Style.linkToEachUsersPage}> チャンネルへ移動 </button>
                 </Link>
               </div>
               <button  className={Style.like}
                        onClick={(e)=>pushLikesIcon(
                          song.song_id,
                          props.loginId,
                          modalWhenPushLike,
                          setModalWhenPushLike,
                          e)} >
                 <i className="fas fa-thumbs-up" id={'likeOf'+song.song_id+'and'+props.loginId}>
                   {like.filter(key=>String(key.song_id)===String(song.song_id)).length}
                 </i>
               </button>
             </div>
             <div className={Style.item}>
             </div>
           </div>
         )}
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
            <div key={userRelations.id}>
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
  const [modalEdit,setModalEdit] = useState(false)
  const [modalDelete,setModalDelete] = useState(false)

  useEffect(()=>{
    axios.get(DRFPOSTSONG_API_URL_FORVIEW.replace('?is_public=true',''))
    .then(res=>{setSong(res.data.filter(key=>String(key.user_id.id)===String(props.loginId)))})
  },[props.loginId]);

  useEffect(()=>{
    axios.get(DRFLIKES_API_URL)
    .then(res=>{setLike(res.data)})
  },[]);

  function deleteSong(song_id){
    axios.delete(
      DRFPOSTSONG_API_URL_FORDELETE + String(song_id)
    ).then(res=>{
      window.location.reload();
    }).catch(err=>{
      alert('削除に失敗しました。入力内容を確認してください。')
    })
  }

  const ModalDeleteSong = ({
    songId,
    checkId,
    modalDelete,
    setModalDelete
  }) => {
    if(modalDelete && String(songId)===String(checkId)){
      return(
        <div className={Style.overlay} onClick={()=>setModalDelete(false)}>
          <div className={Style.insideOverlay} onClick={(e)=>e.stopPropagation()}>
            <div className={Style.row}>
              <div className={Style.nullSpace}/>
              <div className={Style.closeIcon}>
                <i className="far fa-window-close" onClick={()=>setModalDelete(false)}></i>
              </div>
            </div>
            <p>削除しますか？</p>
            <button onClick={()=>deleteSong(songId)}>
              yes</button>
            <button onClick={()=>setModalDelete(false)}>
              no</button>
          </div>
        </div>
      )}else{
        return null;
      }
  }

  const ModalEditSong = (
    {songId,
     checkId,
     modalEdit,
     setModalEdit,
     songTitle,
     isPublic,
     songGenre,
     songTag
    }
  ) => {
    const audioFileForm = useRef()

    function get_value_from_element(id){
      const element=document.getElementById(id)
      return element.value
    }

    function putSong(){
      const genreConverter = {
        '':null,
        'Rock':'RO',
        'Pops':'PO',
        'Hip-Hop':'HH',
        'Classic':'CL',
        'Hard-Rock':'HR',
        'Heavy-Metal':'HM',
        'Groovy':'GR',
      }

      const songTitle = get_value_from_element('song_title_modal'+String(songId))
      const radioVal = get_value_from_element('is_public_modal'+String(songId))
      const songGenre = get_value_from_element('song_genre_modal'+String(songId))
      const songTag = get_value_from_element('song_tag_modal'+String(songId))
      const fileFormToUpload = new FormData()

      fileFormToUpload.append('song_id',songId)
      fileFormToUpload.append('user_id',props.loginId)
      fileFormToUpload.append('song_title',songTitle)
      fileFormToUpload.append('is_public',radioVal)
      fileFormToUpload.append('genre',genreConverter[String(songGenre)])
      fileFormToUpload.append('tag',songTag)
      fileFormToUpload.append('audio_file',audioFileForm.current.files[0])

      const errorMessageField = document.querySelector('#errorMessage'+String(songId))

      axios.put(DRFPOSTSONG_API_URL.replace('?is_public=true','')+String(songId)+'/',
      //axios.put(DRFPOSTSONG_API_URL+'/'+String(songId),
        fileFormToUpload,
        {headers:{
          'content-Type':'multipart/form-data',
        }}).then(res=>{
          errorMessageField.innerHTML = 'success!'
        }).catch(err=>{
          errorMessageField.innerHTML='失敗しました。'
          console.log('err...',err)
        })
    }

    if(modalEdit && String(songId)===String(checkId)){
      return(
        <div className={Style.overlay} onClick={()=>setModalEdit(false)}>
          <div className={Style.insideOverlay} onClick={(e)=>e.stopPropagation()}>
            <div className={Style.row}>
              <div className={Style.nullSpace}/>
              <div className={Style.closeIcon}>
                <i className="far fa-window-close" onClick={()=>setModalEdit(false)}></i>
              </div>
            </div>
            <input type='text'
                   className={Style.songTitle}
                   id = {'song_title_modal'+String(songId)}
                   placeholder={'既入力値 : '+songTitle}
                   /><br/>

            <select
               className={Style.select}
               id = {'is_public_modal'+String(songId)}
            >
               <option value={0}>---------</option>
               <option value={true} selected={isPublic}>公開</option>
               <option value={false} selected={!isPublic}>非公開</option>
            </select><br/>
            <select
              className={Style.select}
              id = {'song_genre_modal'+String(songId)}
            >
              <option value=''>------------</option>
              <option value='Rock' selected={String(songGenre)===String('RO')}>rock</option>
              <option value='Pops' selected={String(songGenre)===String('PO')}>pops</option>
              <option value='Hip-Hop' selected={String(songGenre)===String('HH')}>hip-hop</option>
              <option value='Classic' selected={String(songGenre)===String('CL')}>classic</option>
              <option value='Hard-Rock' selected={String(songGenre)===String('HR')}>hard-rock</option>
              <option value='Heavy-Metal' selected={String(songGenre)===String('HM')}>heavy-metal</option>
              <option value='Groovy' selected={String(songGenre)===String('GR')}>groovy</option>
            </select><br/>
            <input
              className={Style.tag}
              id = {'song_tag_modal'+String(songId)}
              type='text'
              //validations = {[sampleFunc]}
              placeholder={'既入力値 : '+songTag}
            /><br/>
            <input
              className={Style.audioUpload}
              id = {'audio_file_modal'+String(songId)}
              type='file'
              ref={audioFileForm}
              accept = 'audio/'
            >
            </input>
            <div className={Style.errorMessage} id={'errorMessage'+String(songId)}>{/*put error message here when validation is False*/}
            </div>
            <button
              className={Style.button}
              onClick = {putSong}>
              登録内容を修正する
              <i className="fas fa-upload"></i>
            </button><br/>

          </div>
        </div>
      )}else{
        return null;
      }
  }

  const [modalWindowId,setModalWindowId]=useState()
  const [modalWindowSongTitle,setModalWindowSongTitle]=useState()
  const [modalWindowIsPublic,setModalWindowIsPublic]=useState()
  const [modalWindowSongGenre,setModalWindowSongGenre]=useState()
  const [modalWindowSongTag,setModalWindowSongTag]=useState()

  function showModalDelete(songId){
    setModalWindowId(songId)
    setModalDelete(true)
  }
  function showModalEdit(
    songId,songTitle,isPublic,songGenre,songTag
  ){
    setModalWindowId(songId)
    setModalWindowSongTitle(songTitle)
    setModalWindowIsPublic(isPublic)
    setModalWindowSongGenre(songGenre)
    setModalWindowSongTag(songTag)
    setModalEdit(true)
  }

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
        {song.map(song=>
          <div key={song.song_id} className={Style.eachSongBlock}>
            <div className={Style.item}>
              <div className={Style.songTitle} >{song.song_title} </div>
              <audio id = {'audioTagIdOfSong'+song.song_id}
                     className={Style.audio}
                     src={String(song.audio_file).replace('https://','').replace('http://','')}
                     />
              <div>
                {AudioControl(song.song_id)}
              </div>
              <br/>
              <div className={Style.row}>
                <button
                  className={Style.like}
                  onClick={(e)=>pushLikesIcon(
                    song.song_id,
                    props.loginId,
                    e)} >
                  <i className="fas fa-thumbs-up"
                     id={'likeOf'+song.song_id+'and'+props.loginId}
                  >{like.filter(key=>String(key.song_id)===String(song.song_id)).length}</i>
                </button>
                <button className={Style.deleteButton}
                        onClick={(e)=>showModalDelete(song.song_id,e)}>
                  <i className="far fa-trash-alt"></i>
                </button>
                <ModalDeleteSong songId={modalWindowId}
                                 checkId={song.song_id}
                                 modalDelete={modalDelete}
                                 setModalDelete={setModalDelete}
                                 />
                <button className={Style.editPageButton}
                        onClick={(e)=>showModalEdit(
                          song.song_id,
                          song.song_title,
                          song.is_public,
                          song.genre,
                          song.tag,
                          e
                        )}>
                   <i className="fas fa-edit"></i>
                </button>
                <ModalEditSong songId={modalWindowId}
                               checkId={song.song_id}
                               modalEdit={modalEdit}
                               setModalEdit={setModalEdit}
                               songTitle={modalWindowSongTitle}
                               isPublic={modalWindowIsPublic}
                               songGenre={modalWindowSongGenre}
                               songTag={modalWindowSongTag}
                               />

              </div>
            </div>
            <div className={Style.item} id={'rightSideOf'+String(song.song_id)}>
            </div>
          </div>
        )}
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
  const [modalWhenPushLike,setModalWhenPushLike]=useState(false)

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

  const ModalWhenPushLike = (
    {modalWhenPushLike,setModalWhenPushLike}
  ) => {
    if(modalWhenPushLike){
      return(
        <div className={Style.overlayWhenPushLike} onClick={()=>setModalWhenPushLike(false)}>
          <div className={Style.insideOverlay} onClick={(e)=>e.stopPropagation()}>
            評価するにはログインしてください。
            <hr/>
            <LinkToLogin/>
          </div>
        </div>
      )}else{
        return null;
      }
  }

  return (
    <div>
      <h3> {followeeName} </h3>
      <div>{PutChannelRegisterButton(
        isFollowing,
        props.loginId,
        followeeId,
      )}</div>
      <hr/>
      <ModalWhenPushLike
        modalWhenPushLike={modalWhenPushLike}
        setModalWhenPushLike={setModalWhenPushLike}/>
      <ul key={song.song_id}>
        {
          song.map(song=>
            <div className={Style.eachSongBlock}>
              <div className={Style.item}>
                <div className={Style.songTitle} >{song.song_title} </div>
                <audio id = {'audioTagIdOfSong'+song.song_id}
                       className={Style.audio}
                       src={String(song.audio_file).replace('https://','').replace('http://','')}
                       />
                <div>
                  {AudioControl(song.song_id)}
                </div>
                <div className={Style.userName} >
                  user_name : {song.user_name}
                </div>
                <button  className={Style.like}
                         onClick={(e)=>pushLikesIcon(
                           song.song_id,
                           props.loginId,
                           modalWhenPushLike,
                           setModalWhenPushLike,
                           e)} >
                  <i className="fas fa-thumbs-up" id={'likeOf'+song.song_id+'and'+props.loginId}>
                    {likes.filter(key=>String(key.song_id)===String(song.song_id)).length}
                  </i>
                </button>
              </div>
              <div className={Style.item}>
              </div>
            </div>)
        }
      </ul>
    </div>
  );
}

const MainContents = {
  Public,
  SortByUser,
  SortByGenre,
  Mypage,
  EachUsersPage,
};

export default MainContents
