import axios from 'axios';
import { url } from 'src/constants';
import Store from 'src/store/store';

const api = axios.create({
  withCredentials: true,
  baseURL: url
});

api.interceptors.request.use((config)=> {
  config.headers.Authorization = `${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use((config) => {
  return config;
  }, async (error) => {
    const originalRequest = error.config;   
    if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      await Store.refresh();
      return api.request(originalRequest);
    } else { 
      throw error;  //throw statement throws a user-defined exception
    }
  } 
);


export default api;