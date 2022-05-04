import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import authService from '/home/user/Medecine/Front/HospitalFront/src/services/AuthServices';
import { url } from '/home/user/Medecine/Front/HospitalFront/src/constants';

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  registration = async (name, password) => {
    try {
      const response = await authService.registration(name, password);          
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);          
      return ('success')
    } catch (e) {
      return(e.response?.data?.message);
    }
  }

  signIn = async (name, password) => {
    try {
      const response = await authService.signIn(name, password);      
      localStorage.setItem('token', response.data.accessToken);            
      this.setAuth(true);
      this.setUser(response.data.user);
      return('success');       
    } catch (e) {
      return(e.response?.data?.message);
    }
  }   

  checkAuth = async () => {
    this.setLoading(true);
    try {
      const response = await axios.get(`${url}/refresh`, {withCredentials: true});          
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      alert(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }  
}
