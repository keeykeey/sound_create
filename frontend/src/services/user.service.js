import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http:127.0.0.1/api/test';
const TOKEN = 'Token 686f3dcae81cfe82ec6c84fc8f2ab0a953a9fd05';

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getUserBoard = () => {
  return axios.get(API_URL + 'user',{
    headers:authHeader()
  });
};

const getModerateBoard = () => {
  return axios.get(API_URL + 'mod',{
    headers:authHeader()
  });
};

export default{
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
