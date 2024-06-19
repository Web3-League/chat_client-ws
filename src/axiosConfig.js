import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.16:3000', // Utilisez le port du service d'authentification
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

