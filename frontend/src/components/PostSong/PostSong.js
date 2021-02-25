import {useState,useRef} from 'react'
import Style from './PostSong.module.scss'
import axios from 'axios'
import endPoint from '../../services/endPoint'

const DRFPOSTSONG_API_URL = endPoint.getPostSongUrl()

const PostSongPage = (props) =>{
  return(
    <div>
      <h3>
        Post you're song...
      </h3>
      <hr/>
      <div>
        <div className={Style.form}>
          <PostSongForm loginId={props.loginId}/>
        </div>
      </div>
    </div>
  )
}

const PostSongForm = (props) => {
  const audioFileForm = useRef();
  const [songTitle,setSongTitle]=useState()
  const [radioVal,setRadioVal] = useState(false)
  const [genre,setGenre] = useState('')
  const [tag,setTag] = useState('')

  const handleSongTitleInput = (e)=>{
    setSongTitle(e.target.value)
  }

  const handleRadio = (boolean) => {
    setRadioVal(boolean)
  }

  const handleGenreInput = (e) => {
    setGenre(e.target.value)
  }

  const handleTagInput = (e) => {
    setTag(e.target.value)
  }

  const handlePushUploadButton = () =>{
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

    const fileFormToUpload = new FormData()
    fileFormToUpload.append('user_id',props.loginId)
    fileFormToUpload.append('song_title',songTitle)
    fileFormToUpload.append('is_public',radioVal)
    fileFormToUpload.append('genre',genreConverter[String(genre)])
    fileFormToUpload.append('tag',tag)
    fileFormToUpload.append('audio_file',audioFileForm.current.files[0])

    const errorMessageField = document.querySelector('#errorMessageField')

    axios.post(DRFPOSTSONG_API_URL,
      fileFormToUpload,
      {headers:{
        'Content-Type':'multipart/form-data',
      }
    }).then(res=>{
      errorMessageField.innerHTML = 'success!'
    }).catch(err=>{
      errorMessageField.innerHTML='投稿に失敗しました。ログイン状態を確認してください。'
    })
  }

  return(
    <div>
      <div className = {Style.block}>
        <div className = {Style.textLabel}>
          曲名
        </div>
        <input
          className={Style.songTitle}
          type='text'
          onChange={handleSongTitleInput}
          placeholder='song title'
        />
      </div>
      <br/>

      <div className = {Style.block}>
        <div className = {Style.textLabel}>曲の公開</div>
        <input
          className={Style.radio}
          id = 'radioPublic'
          type='radio'
          onChange={(e)=>{handleRadio(true,e)}}
          checked={radioVal===true}
        />
        <label className={Style.textRadio}>公開</label>
        <input
          className={Style.radio}
          id = 'radioPrivate'
          type='radio'
          onChange={(e)=>{handleRadio(false,e)}}
          checked={radioVal===false}
        />
        <label className={Style.textRadio}>非公開</label>
      </div>
      <br/>

      <div className = {Style.block}>
        <div className={Style.textLabel}>
          ジャンル
        </div>
        <select onChange={handleGenreInput}
          className={Style.select}
        >
          <option value=''>------</option>
          <option value='Rock'>rock</option>
          <option value='Pops'>pops</option>
          <option value='Hip-Hop'>hip-hop</option>
          <option value='Classic'>classic</option>
          <option value='Hard-Rock'>hard-rock</option>
          <option value='Heavy-Metal'>heavy-metal</option>
          <option value='Groovy'>groovy</option>
        </select>
      </div>
      <br/>

      <div className = {Style.block}>
        <div className={Style.textLabel}>
          タグ
        </div>
        <input
          className={Style.tag}
          id = 'tag'
          type='text'
          onChange={handleTagInput}
          //validations = {[sampleFunc]}
          placeholder='tag'
        />
      </div>
      <br/>

      <div className = {Style.block}>
        <div className={Style.textLabel}>
          オーディオ
        </div>
        <input
          className={Style.audioUpload}
          id = 'audio-upload'
          type='file'
          ref={audioFileForm}
          accept = 'audio/'
        >
        </input>
      </div>
        <div className={Style.errorMessage} id='errorMessageField'>{/*put error message here when validation is False*/}
        </div>
      <br/>

      <button
        className={Style.button}
        onClick = {handlePushUploadButton}>
        アップロード
        <i className="fas fa-upload"></i>
      </button>
    </div>
  )
}

const PostSong = {
  PostSongPage,
  PostSongForm,
}

export default PostSong
