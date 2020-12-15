import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Style from './LoginControl.module.scss'
import User from './User'

const LoginControl = ()=> {
  const [drfUserInfo,setDrfUserInfo] = useState([])
  useEffect(() => {
      axios.get('http://127.0.0.1:8000/user/drfcustomuser',{
          headers:{
              'Authorization':'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05'
          }
      })
      .then(res => {setDrfUserInfo(res.data);});
  },[]);

  const [inputUsername,setInputUsername] = useState([])
  const [inputPassword,setInputPassword] = useState([])


  {/*const getUsername = (id) => {
    axios.get(`http://localhost:8000/drfPostSong/${id}`,{
        headers:{
            'Authorization':'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05'
        }})
    .then(res => {setInputUsername(res.data)})
  }*/}

  const handleInputUsername = () => event => {
    const value = event.target.value;
    setInputUsername(value)
  }

  const handleInputPassword = () => event => {
    const value = event.target.value;
    setInputPassword(value)
  }

  const clickLoginButton = async () => {
    try{
      await User.login(inputUsername,inputPassword);
      console.log('success')
      window.history.push({pathname:'/'})
    }catch(e){
      console.log('error')
    }
  };



  return(
    <div>
      <div className={Style.login_form_area}>
        <h3 className={Style.title}>
          Login
        </h3>
        <form method='post'>
          <div className={Style.locate_center}>
          <label>
            <input className={Style.form_content} type='text'
             onChange={handleInputUsername()} name='username' placeholder='username' />

            <input className={Style.form_content} type='text'
             onChange={handleInputPassword()} name='password' placeholder='password' />
          </label>
          <p/>
            <button className={Style.button} type='button' onClick={clickLoginButton()}>
              ログインする<span/> <i className="fas fa-sign-in-alt"></i>
            </button>
            <p className={Style.description}>
              ログインすることで<a href=''>利用規約</a>に同意するものとみなされます。
            </p>
          </div>
        </form>
      </div>

      <div className={Style.path_to_register}>
        <p className={Style.description_to_register}>
          初めてのご利用ですか？
        </p>
        <form>
          <a href=''><button className={Style.button_to_register} type='submit'>
            アカウントを作成する<span/><i class="fas fa-user-plus"></i>
          </button></a>
        </form>
      </div>
    </div>
  );
}
export default LoginControl



















//
