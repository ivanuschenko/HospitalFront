import { useContext } from 'react';
import { Context } from 'src/index';
import { listDoctors } from 'src/constants';
import './style.scss';

const ListAdder = ({list, setList, appointment, setAppointment}) => {
  const {inputName, inputDoctor, inputData, inputComplaint} = appointment;
  const { store } = useContext(Context);

  const handleChange = (key, value) => {    
    setAppointment({...appointment, [key]:value});
  }; 
  const disabledButton = !inputName || !inputDoctor || !inputData || !inputComplaint;
  
  const addAppointment = async (e) => {
    e.preventDefault();    
    const response = await store.createAppointment(inputName, inputDoctor, inputData, inputComplaint); 
    if (response.data) {
      setList(response.data);
    };                      
    setAppointment({
      inputName : '',
      inputDoctor: '',
      inputData : '',
      inputComplaint : ''
    });        
  };

  return (
    <form className="listadder">
      <div className='listadder-block'>
        <label htmlFor='listadder-input__name' className='listadder-block_label'>Имя:</label>
        <input 
          type='text' 
          className='listadder-block_input'
          id='listadder-input__name'
          value={inputName}
          onChange={(e) => handleChange('inputName', e.target.value)}
        />        
      </div>
      <div className='listadder-block'>
        <label htmlFor='listadder-input__doctor' className='listadder-block_label'>Врач:</label>
        <select 
          className='listadder-block_input'
          id='listadder-input__doctor'
          onChange={(e) => handleChange('inputDoctor', e.target.value)}
          value={inputDoctor}
        >
        <option></option>
          {
            listDoctors.map((doctor, index) =>             
              <option value={doctor} key={`doctor-${index}`}>{doctor}</option>                            
            )
          }
        </select>       
      </div>
      <div className='listadder-block'>
        <label htmlFor='listadder-input__data' className='listadder-block_label'>Дата:</label>
        <input 
          type='date' 
          className='listadder-block_input'
          id='listadder-input__data'
          value={inputData}          
          onChange={(e) => handleChange('inputData',e.target.value)}
        /> 
      </div>
      <div className='listadder-block'>
        <label htmlFor='listadder-input__complaint' className='listadder-block_label'>Жалобы:</label>
        <input 
          type='text' 
          className='listadder-block_input'
          id='listadder-input__complaint'
          value={inputComplaint}
          onChange={(e) => handleChange('inputComplaint', e.target.value)}           
        />
      </div>
      <div className='listadder-block'>
        <input 
          type="submit" 
          value="Добавить" 
          className='listadder-block_button' 
          disabled={disabledButton} 
          onClick={addAppointment} 
        />
      </div>
    </form>
  )
}

export default ListAdder;
