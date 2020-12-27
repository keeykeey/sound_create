import axios from 'axios';

const DRFCUSTOMUSER_API_URL = 'http://localhost:8000/user/drfcustomuser/'
const DRFPOSTSONG_API_URL = 'http://localhost:8000/drfPostSong/'
const JWT_API_URL = 'http://localhost:8000/api/auth/jwt/';
const TOKEN = 'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05'

const register = (username,email,password) => {
  return axios.post(DRFCUSTOMUSER_API_URL,{
    username,
    email,
    password,
  });
};

const getUserId2 = (username) => {
  const user_id = axios.get(DRFCUSTOMUSER_API_URL)
  .then(res=>console.log('getuserid',res.data.filter(key=>key.username==username)[0]))
}

const getUserId = (username) => {
  const user_id = axios.get(DRFCUSTOMUSER_API_URL)
  .then(res => {
    const user_id = res.data.filter(key=>key.username==username)[0]['id'];
    localStorage.setItem('user_id',user_id);
  },[])
}

const sample = (username) =>{
  alert(username);
}

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
  localStorage.removeItem('test');
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};



const AuthService = {
  register,
  getUserId,
  getUserId2,
  login,
  logout,
  getCurrentUser,
};

export default AuthService




//
