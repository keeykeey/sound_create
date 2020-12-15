import React, { useState } from 'react'
import Style from './Register.module.scss'

const RegisterControl = ()=> {

  const [inputUsername,setInputUsername] = useState([])
  const [inputEmailAdress,setInputEmailAdress] = useState('')
  const [inputPassword,setInputPassword] = useState([])


  const handleInputUsername = () => event => {
    const value = event.target.value;
    setInputUsername(value)
  }

  const handleInputEmailAdress = () => event => {
    const value = event.target.value;
    setInputUsername(value)
  }

  const handleInputPassword = () => event => {
    const value = event.target.value;
    setInputPassword(value)
  }

  return (
    <div>
      <div className={Style.register_form_area}>
        <h3 className={Style.title}>
          Register
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
            <button className={Style.button} type='button' >
              アカウントを作成する<span/><i class="fas fa-user-plus"></i>
            </button>
            <p className={Style.description}>
              ログインすることで<a href=''>利用規約</a>に同意するものとみなされます。
            </p>
          </div>
        </form>
      </div>

      <div className={Style.path_to_login}>
        <p className={Style.description_to_login}>
          初めてのご利用ですか？
        </p>
        <form>
          <a href=''><button className={Style.button_to_login} type='submit'>
            ログインする<span/> <i className="fas fa-sign-in-alt"></i>
          </button></a>
        </form>
      </div>
    </div>
  );
}
export default RegisterControl;
