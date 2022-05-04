import axios from 'axios';
import { url } from '/home/user/Medecine/Front/HospitalFront/src/constants';

const api = axios.create({
  withCredentials: true,
  baseURL: url
});

api.interceptors.request.use((config)=> {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

const refresh = () => {
  try {
    const response = axios.get(`${url}/api/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('token', response.data.accessToken);
  } catch (e) {
    alert('Не авторизован');
  }
};

api.interceptors.response.use((config) => {
  return config;
  }, async (error) => {
    const originalRequest = error.config;   
    if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      await refresh();
      return api.request(originalRequest);
    } else { 
      throw error;
    }
  } 
);

export default api;