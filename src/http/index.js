import axios from 'axios';
import { url } from 'src/constants';

const api = axios.create({
  withCredentials: true,
  baseURL: url
});

api.interceptors.request.use((config)=> {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

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

const refresh = async () => {
  try {
    const response = await axios.get(`${url}/api/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('token', response.data.accessToken);
  } catch (e) {
    alert('Не авторизован');
  }
};

export default api;