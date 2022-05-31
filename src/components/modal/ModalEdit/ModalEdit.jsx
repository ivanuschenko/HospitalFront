import { useState, useContext } from 'react';
import { Context } from 'src/index';
import { listDoctors } from 'src/constants';
import './style.scss';

const ModalEdit = ({
  modalEditActive,
  setEditActive,   
  id,
  list,
  setList
}) => {

  const line = list.find(list=> list._id === id);
  const {patient, doctor, date, complaint} = line;  
  const {store} = useContext(Context);
  const [modalInputValue, setModalInputValue] = useState({
    modalInputName : patient,
    modalInputDoctor: doctor,
    modalInputData : date,
    modalInputAppoint : complaint
  });
  
  const {modalInputName, modalInputDoctor, modalInputData, modalInputAppoint} = modalInputValue;  
  const handleChange = (key, value) => {    
    setModalInputValue({...modalInputValue, [key]:value});
  };
  
  const editAppoint = async () => {       
    const response = await store.updateApointment(id, modalInputName, modalInputDoctor, modalInputData, modalInputAppoint);
    setList(response.data);    
    setEditActive(false);
  };

  const disabledButton = !modalInputName && !modalInputDoctor && !modalInputData && !modalInputAppoint;
  
  return (
    <div className={modalEditActive? 'modal-edit active' : 'modal-edit'} onClick={() => setEditActive(false)}>
      <div className='modal-edit-block' onClick={(e) => e.stopPropagation()}>
        <div className='modal-edit-block_header'>
          <h1>Изменить прием</h1>
        </div>        
        <div className='modal-edit-block_input'>
          <label>Имя:</label>
          <input 
            className='modal-edit-block_input__text' 
            type='text'
            value={modalInputName} 
            onChange={(e)=>handleChange('modalInputName',e.target.value)}
          />            
        </div>
        <div className='modal-edit-block_input'>
          <label>Врач:</label>
          <select 
            className='modal-edit-block_input__text'
            id='listadder-input__doctor'
            onChange={(e)=>handleChange('modalInputDoctor',e.target.value)}
            value={modalInputDoctor} 
          >          
            {
              listDoctors.map((doctor, index) =>             
                <option value={doctor} key={`doctor-${index}`}>{doctor}</option>                            
              )
            }
          </select>
        </div>
        <div className='modal-edit-block_input'>
          <label>Дата:</label>
          <input 
            className='modal-edit-block_input__text' 
            type='date'
            value={modalInputData} 
            onChange={(e)=>handleChange('modalInputData', e.target.value)}
          />
        </div>
        <div className='modal-edit-block_input'>
          <label>Жалобы</label>
          <textarea 
            className='modal-edit-block_input__textarea'
            type='text'
            value={modalInputAppoint} 
            onChange={(e)=>handleChange('modalInputAppoint',e.target.value)}
          />
        </div>
        <div className='modal-edit-block_buttons'>
          <button type='button' onClick={()=>setEditActive(false)} className='modal-edit-block_buttons__cancel'>Отмена</button>
          <button type='button' disabled={disabledButton} onClick={editAppoint} className='modal-edit-block_buttons__edit'>Сохранить</button>
        </div>        
      </div>
    </div>  
  )
};

export default ModalEdit;