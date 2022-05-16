import api from 'src/http/index';

//this folder needs for keep request to backend

export default class AuthService {

  /*Static method use for call class method without creating instance of class
  This static methods calle from store and send to backend a request.
  api - is configuration of axios with interceptors on request and respone */

  static async registration(name, password) {
    return api.post('/api/registration', {name, password});
  };

  static async signIn(name, password) {
    return api.post('/api/signIn', {name, password});
  };

  static async signOut() {
    return api.post('/api/signOut');
  };  
}
