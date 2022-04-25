import api from '../http/index';

export default class AuthService {

  static async registration(name, password){
      return api.post('/api/registration', {name, password})
  }
  
}