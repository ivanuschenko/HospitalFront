import axios from 'axios';
import authService from 'src/services/AuthServices';
import { url } from 'src/constants';

// this folder needs for interaction with global storage(context)

export default class Store {
  user = {};  
  isLoading = false;

  setUser(user) {
    this.user = user;
  }

  setLoading(boolean) {
    this.isLoading = boolean;
  }

  /* request come here after called from components, where in try/catch block run static method of authService class and response returns to components.
  If we have bad response, block catch will send type of mistakes which will be show in snackbar.
  I wrote return('success') recently like a "plug" for return in snackbar successful execution of request, I did it becouse i havent
  any  components for this time of check. */

  registration = async (name, password) => {
    try {      
      const response = await authService.registration(name, password);          
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);         
    } catch (e) {
      return e.response.data.message;
    }
  }

  signIn = async (name, password) => {
    try {
      const response = await authService.signIn(name, password);      
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
    } catch (e) {

      /* This 'e.response.data.message' return error which generated on backend in static method in ApiError class which extend class 'Error'.
      For example then we trying register user with login which already exist in database, we'll got error that 'this user with this name already exist'   
      */

      return e.response.data.message;
    }
  }   

  checkAuth = async () => {
    this.setLoading(true);
    try {
      const response = await axios.get(`${url}/refresh`, {withCredentials: true});          
      localStorage.setItem('token', response.data.accessToken);      
      this.setUser(response.data.user);
    } catch (e) {
      alert (e.response.data.message);
    } finally {
      this.setLoading(false);
    }
  }

  static refresh = async () => {
    try {
      const response = await axios.get(`${url}/api/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
    } catch (e) {
      alert('Не авторизован');
      this.setUser({})
    }
  };  
}
