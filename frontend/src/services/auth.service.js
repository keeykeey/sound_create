import axios from 'axios';
import endPoint from './endPoint';

const DRFCUSTOMUSER_API_URL = endPoint.getCustomUserUrl();
const JWT_API_URL = endPoint.getJwtUrl();

const register = (username,email,password) => {
  return axios.post(DRFCUSTOMUSER_API_URL,{
    username,
    email,
    password,
  });
};

const getUserId = (username) => {
  axios.get(DRFCUSTOMUSER_API_URL)
  .then(res => {
    const user_id = res.data.filter(key=>String(key.username)===String(username))[0]['id'];
    localStorage.setItem('user_id',user_id);
  },[])
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const login = (username,password) => {
  return axios
    .post(JWT_API_URL + 'create/',{
      username,
      password,
    })
    .then((res) => {
      if (res.data.access){
        localStorage.setItem('user',JSON.stringify(res.data));
        localStorage.setItem('username',username);
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem('user_id')
  localStorage.removeItem('user');
  localStorage.removeItem('username');
}

const AuthService = {
  register,
  getUserId,
  login,
  logout,
  getCurrentUser,
};

export default AuthService
