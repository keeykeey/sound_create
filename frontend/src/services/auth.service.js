import axios from 'axios';

const API_URL = 'http:localhost:8000/api/auth/';
const TOKEN = 'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05'

const register = (username,email,password1,password2) => {
  return axios.post(API_URL + 'signup',{
    username,
    email,
    password1,
    password2,
  });
};

const login = (username,password) => {
  return axios
    .post(API_URL + 'signin',{
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken){
        localStorage.setItem('user',JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

esport default {
  register,
  login,
  logout,
  getCurrentUser,
};









//
