import axios from 'axios';

const DRFCUSTOMUSER_API_URL = 'http://localhost:8000/user/drfcustomuser/'
const JWT_API_URL = 'http://localhost:8000/api/auth/jwt/';

const register = (username,email,password) => {
  return axios.post(DRFCUSTOMUSER_API_URL,{
    username,
    email,
    password,
  });
};

const login = (username,password) => {
  return axios
    .post(JWT_API_URL + 'create/',{
      username,
      password,
    })
    .then((response) => {
      if (response.data.access){
        localStorage.setItem('user',JSON.stringify(response.data));
        localStorage.setItem('username',username);
        console.log(localStorage);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('username');
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};






//
