import React, {useState,useRef} from 'react';
import Style from './LoginControl.module.scss';
import AuthService from '../../services/auth.service.js';
import Form from 'react-validation/build/form';
import {withRouter} from 'react-router-dom';//to enable props.history.push

const required = (value) => {
  if (!value){
    return (
      <div role='alert'>
        this field is required!
      </div>
    );
  }
};

const LoginControl = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [message,setMessage] = useState('');

  const onChangeUsername = (event) => {
    const username = event.target.value;
    console.log('username:',username)
    setUsername(username);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;
    console.log('password:',password)
    setPassword(password);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    form.current.validateAll();

    if (checkBtn | 1*0 === 0){
      AuthService.login(username,password).then(
        () => {
          props.history.push('/');
          window.location.reload();
        },
        (error) => {
          console.log('error...')
          const resMessage =
            (error.response &&
               error.response.data &&
               error.response.data.message) ||
             error.message ||
             error.toString();
          setLoading(false);
          setMessage(resMessage);
          alert('認証に失敗しました。名前とパスワードを確認して下さい。');
        }
      );
    }else{
      setLoading(false);
    }
  };

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
          <p/>
            <button className={Style.button} disabled={loading} >
              {loading}
              <span>
                ログインする
              </span>
              <i className="fas fa-sign-in-alt"></i>
            </button>
            <p className={Style.description}>
              ログインすることで<a href='/'>利用規約</a>に同意するものとみなされます。
            </p>
          </div>
        </Form>
      </div>

      <div className={Style.path_to_register}>
        <p className={Style.description_to_register}>
          初めてのご利用ですか？
        </p>
        <Form>
          <a href='/'><button className={Style.button_to_register} type='submit'>
            アカウントを作成する<span/><i className="fas fa-user-plus"></i>
          </button></a>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(LoginControl)



















//
