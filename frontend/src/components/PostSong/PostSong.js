import react, {useState,useRef} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Style from './PostSong.module.scss'


const sampleFunc = () =>{
  return 0;
}

const PostSong = (props) => {
  const form = useRef();
  const [songTitle,setSongTitle]=useState()
  const [radioVal,setRadioVal] = useState(true)
  const [genre,setGenre] = useState('')
  const [tag,setTag] = useState('')
  const [audioFile,setAudioFile]=useState('')

const sample1 = () => {
  console.log('0...',radioVal)
}

const handleSongTitleInput = (e)=>{
  setSongTitle(e.target.value)
}

const handleRadio = (boolean) => {
  setRadioVal(boolean)
}

const handleGenreInput = (e) => {
  setGenre(e.target.value())
}

const handleTag = (e) => {
  setTag(e.target.value())
}

const handleAudioFileUpload = () => {
  return 0;
}

  return(
    <div>
      <h3>
        Post you're song   ....{String(radioVal)}......
      </h3>
      <hr/>
      <ul>
        <li>{songTitle}</li>
        <li>{String(radioVal)}</li>

      </ul>
      <div>
      <Form onSubmit={sampleFunc} ref={form}>
        <div className={Style.locate_center}>
        <label>
          <Input
            className={Style.form_content}
            type='text'
            onChange={handleSongTitleInput}
            validations = {[sampleFunc]}
            name='song_title'
            placeholder='song title'
          />
          <input
            className={Style.radio}
            id = 'radioPublic'
            type='radio'
            onChange={(e)=>{handleRadio(true,e)}}
            checked={radioVal===true}
          />公開
          <input
            className={Style.radio}
            id = 'radioPrivate'
            type='radio'
            onChange={(e)=>{handleRadio(false,e)}}
            checked={radioVal===false}
          />非公開
          <Input
            className={Style.form_content}
            id = 'password1'
            type='password'
            onChange={sampleFunc}
            validations = {[sampleFunc]}
            name='password1'
            placeholder='password'
          />
          <Input
            className={Style.form_content}
            id = 'password2'
            type='password'
            onChange={sampleFunc}
            validations = {[sampleFunc]}
            name='password2'
            placeholder='password again'
          />
          <Input
            className={Style.form_content}
            id = 'password2'
            type='password'
            onChange={sampleFunc}
            validations = {[sampleFunc]}
            name='password2'
            placeholder='password again'
          />
        </label>
          <p className={Style.description}>
            <input
              className={Style.checkbox}
              id = 'agree'
              type='checkbox'
              value = 'true'
              onChange={sampleFunc}
            />
            会員登録をするにあたり<a href='/'>利用規約</a>に同意します。
          </p>
          <p
            className={Style.alert_text}
            id='askForConsent'>
          </p>
          <button className={Style.button} >
            <span>
              アカウントを作成する
            </span>
            <i className="fas fa-user-plus"></i>
          </button>
          <p
            className={Style.alert_text}
            id='askForValidInput'>
          </p>
        </div>
      </Form>

      </div>
    </div>
  )
}

export default PostSong
