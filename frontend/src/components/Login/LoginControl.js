import React, {useState,useRef} from 'react'
import Style from './LoginControl.module.scss'
import AuthService from '../../services/auth.service.js'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
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

const LoginControl = (props) => {
  const form = useRef();

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [isAgreedOnCheckbox,setIsAgreedOnCheckbox] = useState(false);
  const [loading,setLoading] = useState(false);

  const onChangeUsername = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    setPassword(password);
  }

  const onChangeCheckbox = () => {
    const checkbox = document.querySelector('#agree');
    const isAgreed = checkbox.checked;
    setIsAgreedOnCheckbox(isAgreed)
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);

    form.current.validateAll();

    if (isAgreedOnCheckbox){
      AuthService.login(username,password)
      .then(AuthService.getUserId(username))
      .then(
        () => {
          props.history.push('/mypage/');
          window.location.reload();
        },
        (error) => {
          const askForValidInput = document.querySelector('#askForValidInput')
          askForValidInput.innerHTML='認証に失敗しました。名前とパスワードを確認して下さい。'
        }
      );
    }else{
      const askForConsent = document.querySelector('#askForConsent')
      askForConsent.innerHTML = '利用規約に同意してログインする場合は、<br/>チェックボックスにチェックして下さい。'
      setLoading(false);
    }
  };

  const handleMoveToRegister = (event) => {
    event.preventDefault();
    props.history.push('/register/');
    window.location.reload();
  }

  return(
    <div>
      <div className={Style.login_form_area}>
        <h3 className={Style.title}>
          Please Login
        </h3>
        <Form onSubmit={handleLogin} ref={form}>
          <div className={Style.locate_center}>
          <label>
            <input
              className={Style.form_content}
              type='text'
              onChange={onChangeUsername}
              validations = {[required]}
              name='username'
              placeholder='username'
            />
            <input
              className={Style.form_content}
              type='password'
              onChange={onChangePassword}
              validations = {[required]}
              name='password'
              placeholder='password'
            />
          </label>
            <p className={Style.description}>
              <input
                className={Style.checkbox}
                type='checkbox'
                value = 'true'
                id = 'agree'
                onChange={onChangeCheckbox}
              />
              ログインするにあたり<a href='/'>利用規約</a>に同意します。
            </p>
            <p
              className={Style.alert_text}
              id='askForConsent'>
            </p>
            <button className={Style.button} disabled={loading} >
              {loading}
              <span>
                ログインする
              </span>
              <i className="fas fa-sign-in-alt"></i>
            </button>
            <p
              className={Style.alert_text}
              id='askForValidInput'>
            </p>
          </div>
        </Form>
      </div>

      <div className={Style.path_to_register}>
        <p className={Style.description_to_register}>
          初めてのご利用ですか？
        </p>
        <form onSubmit={handleMoveToRegister}>
          <a href='/'><button className={Style.button_to_register} type='submit'>
            アカウントを作成する<span/><i className="fas fa-user-plus"></i>
          </button></a>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginControl)



















//
