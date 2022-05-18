import { useContext } from 'react';
import { Context } from 'src/index';
import { listDoctors } from 'src/constants';
import './style.scss';

const UnderHeader = ({list, setList, appointment, setAppointment}) => {
  const {inputName, inputDoctor, inputData, inputComplaint} = appointment;
  const {store} = useContext(Context);

  const handleChange = (key, value) => {    
    setAppointment({...appointment, [key]:value})
  };

  const disableButton = () => {
    return (!inputName || !inputDoctor || !inputData || !inputComplaint);    
  };
  
  const addAppointment = async (e) => {
    e.preventDefault();    
    const response = await store.createAppointment(inputName, inputDoctor, inputData, inputComplaint); 
    if (Array.isArray(response.data)) setList(response.data);          
    setAppointment({
      inputName : '',
      inputDoctor: '',
      inputData : '',
      inputComplaint : ''
    });        
  };

  return (
    <form className="underheader-form">
      <div className='underheader-block'>
        <label htmlFor='underheader-input__name' className='underheader-label'>Имя:</label>
        <input 
          type = 'text' 
          className = 'underheader-input'
          id='underheader-input__name'
          value = {inputName}
          onChange={(e) => handleChange('inputName', e.target.value)}
        />        
      </div>
      <div className='underheader-block'>
        <label htmlFor='underheader-input__doctor' className='underheader-label'>Врач:</label>
        <select 
          className='underheader-input'
          id='underheader-input__doctor'
          onChange={(e) => handleChange('inputDoctor', e.target.value)}
          value = {inputDoctor}
        >
        <option></option>
          {
            listDoctors.map((doctor, index) =>             
              <option value = {doctor} key = {`doctor-${index}`} >{doctor}</option>                            
            )
          }
        </select>       
      </div>
      <div className='underheader-block'>
        <label htmlFor='underheader-input__data' className='underheader-label'>Дата:</label>
        <input 
          type = 'date' 
          className = 'underheader-input'
          id='underheader-input__data'
          value = {inputData}          
          onChange={(e) => handleChange('inputData',e.target.value)}
        /> 
      </div>
      <div className='underheader-block'>
        <label htmlFor='underheader-input__complaint' className='underheader-label'>Жалобы:</label>
        <input 
          type = 'text' 
          className = 'underheader-input'
          id='underheader-input__complaint'
          value = {inputComplaint}
          onChange={(e) => handleChange('inputComplaint', e.target.value)}           
        />
      </div>      
      <button className='underheader-button' disabled = {disableButton()} onClick = {addAppointment}>Добавить</button>
    </form>
  )
}

export default UnderHeader;
