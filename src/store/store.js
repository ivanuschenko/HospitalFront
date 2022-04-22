import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { url } from '../Constants/Constants';
import AuthService from '../services/AuthServices';

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
          console.log('registation',response)
          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
      } catch (e) {
          console.log(e.response?.data?.message);
      }
  }    

  async checkAuth() {
      this.setLoading(true);
      try {
          const response = await axios.get(`${url}/refresh`, {withCredentials: true})
          console.log(response);
          localStorage.setItem('token', response.data.accessToken);
          this.setAuth(true);
          this.setUser(response.data.user);
      } catch (e) {
          console.log(e.response?.data?.message);
      } finally {
          this.setLoading(false);
      }
    }  
}
