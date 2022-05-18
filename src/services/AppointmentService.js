import api from 'src/http/index';
  
export default class AppointmentService {

  static fetchAppointments() {
    return api.get('/allList');
  };

  static createAppointment( name, doctor, date, complaint ) {    
    return api.post('/createAppointment', { name, doctor, date, complaint });
  };     
}

