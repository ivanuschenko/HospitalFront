import api from '/home/user/Medecine/Front/HospitalFront/src/http/index';

export default class AuthService {

  static async registration(name, password) {
    return api.post('/api/registration', {name, password});
  };
// i use static method for use function without creating instance of class
  static async signIn(name, password) {
    return api.post('/api/signIn', {name, password});
  };  
}
