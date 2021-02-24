import React, { useState ,useRef} from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Style from './RegisterControl.module.scss'
import AuthService from '../../services/auth.service.js'
import {isEmail} from 'validator'
import {withRouter} from 'react-router-dom';//to enable props.history.push

const required = (value) => {
  if (!value){
    return (
      <div className={Style.alert_text} role='alert'>
        入力必須です。
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)){
    return(
      <div className={Style.alert_text} role='alert'>
        有効なメールアドレスではありません。
      </div>
    )
  }
};

const validUsername = (value) => {
  if (value.length <4 || value.length > 21){
    return(
      <div className={Style.alert_text} role='alert'>
        4文字以上かつ20文字以内で入力してください。
      </div>
    )
  }else(console.log('ここにユーザ名がユニーク出なかった場合の処理をかく'))
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 41){
    return(
      <div className={Style.alert_text} role='alert'>
        ６文字以上かつ４０文字以内で入力してください。
      </div>
    );
  }
};

const RegisterControl = (props)=> {
  const form = useRef();

  const [inputUsername,setInputUsername] = useState('');
  const [inputEmailAdress,setInputEmailAdress] = useState('');
  const [inputPassword1,setInputPassword1] = useState('');
  const [isAgreedOnCheckbox,setIsAgreedOnCheckbox] = useState(false);

  const handleInputUsername = (event) => {
    const username = event.target.value;
    setInputUsername(username)
  }

  const handleInputEmailAdress = (event) => {
    const email = event.target.value;
    setInputEmailAdress(email)
  }

  const handleInputPassword1 = (event) => {
    const password1 = event.target.value;
    setInputPassword1(password1)
  }

  const checkPw1AndPw2 = () => {
    const password1 = document.querySelector('#password1').value
    const password2 = document.querySelector('#password2').value
    if (password1 !== password2){
      return (
        <div className={Style.alert_text} role='alert'>
          パスワードが一致しません。
        </div>
      )
    }
  }

  const onChangeCheckbox = () => {
    const checkbox = document.querySelector('#agree');
    const isAgreed = checkbox.checked;
    setIsAgreedOnCheckbox(isAgreed)
  }

  const handleRegister = (event) => {
    event.preventDefault();
    form.current.validateAll();

    if (isAgreedOnCheckbox){
      AuthService.register(inputUsername,inputEmailAdress,inputPassword1).then(
        (response) => {
          console.log('registerd')
          AuthService.login(inputUsername,inputPassword1).then(
            AuthService.getUserId(inputUsername)
          ).then(()=>{
              props.history.push('/');
              window.location.reload();
            })
          },
        (error) => {
            const askForValidInput = document.querySelector('#askForValidInput')
            askForValidInput.innerHTML='入力内容が有効ではありません。'
        }
      );
    }else{
      const askForConsent = document.querySelector('#askForConsent')
      askForConsent.innerHTML = '利用規約に同意してログインする場合は、<br/>チェックボックスにチェックして下さい。'
    }
  };

  const handleMoveToLogin = (event) => {
    event.preventDefault();
    props.history.push('/login/');
    window.location.reload();
  }

  return (
    <div>
      <div className={Style.register_form_area}>
        <h3 className={Style.title}>
          Register
        </h3>
        <Form onSubmit={handleRegister} ref={form}>
          <div className={Style.locate_center}>
          <label>
            <Input
              className={Style.form_content}
              type='text'
              onChange={handleInputUsername}
              validations = {[required,validUsername]}
              name='username'
              placeholder='username'
            />
            <Input
              className={Style.form_content}
              type='email'
              onChange={handleInputEmailAdress}
              validations = {[required,validEmail]}
              name='email'
              placeholder='email'
            />
            <Input
              className={Style.form_content}
              id = 'password1'
              type='password'
              onChange={handleInputPassword1}
              validations = {[required,validPassword]}
              name='password1'
              placeholder='password'
            />
            <Input
              className={Style.form_content}
              id = 'password2'
              type='password'
              validations = {[required,checkPw1AndPw2]}
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
                onChange={onChangeCheckbox}
              />
              会員登録をするにあたり<a href='/#/terms'>利用規約</a>に同意します。
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

      <div className={Style.path_to_login}>
        <p className={Style.description_to_login}>
          既にアカウントをお持ちですか？
        </p>
        <form onSubmit={handleMoveToLogin}>
          <a href='/'><button className={Style.button_to_login} type='submit'>
            ログイン画面へ<span/> <i className="fas fa-sign-in-alt"></i>
          </button></a>
        </form>
      </div>
    </div>
  );
}
export default withRouter(RegisterControl);
