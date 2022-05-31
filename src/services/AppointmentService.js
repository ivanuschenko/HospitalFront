import api from 'src/http/index';
  
export default class AppointmentService {

  static fetchAppointments() {
    return api.get('/allList');
  };

  static createAppointment( name, doctor, date, complaint ) {    
    return api.post('/createAppointment', { name, doctor, date, complaint });
  };
  
  static updateAppointment( id, patient, doctor, date, complaint) {    
    return api.patch(`/updateAppointment`, { id, patient, doctor, date, complaint });
  }
  
  static deleteAppointment(id) {     
    return api.delete(`/deleteAppointment?_id=${id}`);
  }
}

