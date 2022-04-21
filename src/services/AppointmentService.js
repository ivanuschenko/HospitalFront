import api from '../http/index';

export default class AppointmentService {
  static fetchAppointments() {
    return api.get('/allList');
  }

  static createAppointment( name, doctor, date, complaint) {    
    return api.post('/createAppointment', { name, doctor, date, complaint });
  }

  static deleteAppointment(id) {
    return api.post('/deleteAppointment', { id });
  }

  static updateAppointment(id, name, doctor, date, complaint) {
    return api.patch('/updateAppointment', { id, name, doctor, date, complaint });
  }
}

