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
    if (inputName && inputDoctor && inputData && inputComplaint) {
      return false;
    } else {
      return true;
    };
  };

  const addAppoint = async (e) => {
    e.preventDefault();    
    const response = await store.createAppointment(inputName, inputDoctor, inputData, inputComplaint); 
    if (Array.isArray(response.data)) setList(response.data)          
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
        <label className='underheader-label'>Имя:</label>
        <input 
          type = 'text' 
          className = 'underheader-input'
          value = {inputName}
          onChange={(e) => handleChange('inputName', e.target.value)}
        />        
      </div>
      <div className='underheader-block'>
        <label className='underheader-label'>Врач:</label>
        <select 
          className='underheader-input'
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
        <label className='underheader-label'>Дата:</label>
        <input 
          type = 'date' 
          className = 'underheader-input'
          value = {inputData}          
          onChange={(e) => handleChange('inputData',e.target.value)}
        /> 
      </div>
      <div className='underheader-block'>
        <label className='underheader-label'>Жалобы:</label>
        <input 
          type = 'text' 
          className = 'underheader-input'
          value = {inputComplaint}
          onChange={(e) => handleChange('inputComplaint', e.target.value)}           
        />
      </div>      
      <button className='underheader-button' disabled = {disableButton()} onClick = {addAppoint}>Добавить</button>
    </form>
  )
}

export default UnderHeader;
