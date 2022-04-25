import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthServices';
import { url } from '../Constants/Constants';

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

  async registration(name, password) {
      try {
          const response = await AuthService.registration(name, password);          
          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);          
          return ('success')
      } catch (e) {
          return(e.response?.data?.message);
      }
  }    

  checkAuth() {
      this.setLoading(true);
      try {
          const response = axios.get(`${url}/refresh`, {withCredentials: true})
          console.log(response);
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