import api from '/home/user/Medecine/Front/HospitalFront/src/http/index';

export default class AuthService {

  //Static method use for call class method without creating instance of class

  static async registration(name, password) {
    return api.post('/api/registration', {name, password});
  };

  static async signIn(name, password) {
    return api.post('/api/signIn', {name, password});
  };  
}
