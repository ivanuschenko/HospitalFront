import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthServices";
import axios from 'axios';
import { url } from "../component/Constants/Constants";
import AppointmentService from '../services/AppointmentService';

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

    async signIn(name, password) {
        try {
            const response = await AuthService.signIn(name, password);
            console.log('signIn', response)
            localStorage.setItem('token', response.data.refreshToken);            
            this.setAuth(true);
            this.setUser(response.data.user);
           
        } catch (e) {
            console.log(e.response?.data?.message);
        }
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

    async signOut() {
        try {
            const response = await AuthService.signOut();
            localStorage.removeItem('token');            
            this.setAuth(false);
            this.setUser({});            
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
  async getAllAppointments() {    
    try {
      const response = await AppointmentService.fetchAppointments();
      return response;
              
    } catch (e) {
      alert('Ошибка ' + e.name + ":" + e.message);;
    }
  }
  async createAppointment(name, doctor, date, complaint) {
    try {
      const response = await AppointmentService.createAppointment(name, doctor, date, complaint);
      return response;     
    } catch (e) {
      alert('Ошибка ' + e.name + ":" + e.message);;
    }
  }
}
