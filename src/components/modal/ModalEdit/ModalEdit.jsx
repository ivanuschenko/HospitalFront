import { useState, useContext } from 'react';
import { Context } from 'src/index';
import { listDoctors } from 'src/constants';
import './style.scss';

const ModalEdit = ({modalEditIsOpen, setEditIsOpen, changeableLine, setList}) => {
  const {_id, patient, doctor, date, complaint } = changeableLine;  
  const {store} = useContext(Context);
  const [modalInputValue, setModalInputValue] = useState({
    modalInputName : patient,
    modalInputDoctor: doctor,
    modalInputData : date,
    modalInputComplaint : complaint
  });
  
  const { modalInputName, modalInputDoctor, modalInputData, modalInputComplaint } = modalInputValue;  
  const handleChange = (key, value) => {    
    setModalInputValue({...modalInputValue, [key]:value});
  };
  
  const editAppoint = async () => {       
    const response = await store.updateApointment(_id, modalInputName, modalInputDoctor, modalInputData, modalInputComplaint);
    setList(response.data);    
    setEditIsOpen(false);
  };

  const disabledButton = !modalInputName && !modalInputDoctor && !modalInputData && !modalInputComplaint;
  
  return (
    <div className={modalEditIsOpen ? 'modal-edit open' : 'modal-edit'} onClick={() => setEditIsOpen(false)}>
      <div className='modal-edit-block' onClick={(e) => e.stopPropagation()}>
        <div className='modal-edit-block_header'>
          <h1>Изменить прием</h1>
        </div>        
        <div className='modal-edit-block_input'>
          <label htmlFor='modal-edit_input__name'>Имя:</label>
          <input 
            className='modal-edit-block_input__text'
            id='modal-edit_input__name' 
            type='text'
            value={modalInputName} 
            onChange={(e) => handleChange('modalInputName', e.target.value)}
          />            
        </div>
        <div className='modal-edit-block_input'>
          <label htmlFor='modal-edit_select__doctor'>Врач:</label>
          <select 
            className='modal-edit-block_input__text'
            id='modal-edit_select__doctor'
            onChange={(e) => handleChange('modalInputDoctor', e.target.value)}
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
          <label htmlFor='modal-edit_input__date'>Дата:</label>
          <input 
            className='modal-edit-block_input__text'
            id='modal-edit_input__date'  
            type='date'
            value={modalInputData} 
            onChange={(e) => handleChange('modalInputData', e.target.value)}
          />
        </div>
        <div className='modal-edit-block_input'>
          <label htmlFor='modal-edit_input__complaint'>Жалобы</label>
          <textarea 
            className='modal-edit-block_input__textarea'
            id='modal-edit_input__complaint'
            type='text'
            value={modalInputComplaint} 
            onChange={(e) => handleChange('modalInputComplaint', e.target.value)}
          />
        </div>
        <div className='modal-edit-block_buttons'>
          <button type='button' onClick={() => setEditIsOpen(false)} className='modal-edit-block_buttons__cancel'>Отмена</button>
          <button type='button' disabled={disabledButton} onClick={editAppoint} className='modal-edit-block_buttons__edit'>Сохранить</button>
        </div>        
      </div>
    </div>  
  )
};

export default ModalEdit;