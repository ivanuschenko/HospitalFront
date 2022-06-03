import { useContext } from 'react';
import { Context } from 'src/index';
import './style.scss';

const ModaleDelete = ({setModalDelIsOpen, changeableLine , setList}) => {
  const {store} = useContext(Context);
  const {_id} = changeableLine;  

  const deleteAppointment = async (id) => { 
    const response = await store.deleteApointment(id);
    setList(response.data);
    setModalDelIsOpen(false);    
  }

  return (
    <div className='modal-delete'>
      <div className='modal-delete-block'>
        <div className='modal-delete-block_title'>
          <h1>Удалить прием</h1>
        </div>
        <div className='modal-delete-block_text__notification'>
          <p>Вы действительно хотите удалить прием?</p>
        </div>               
        <div className='modal-delete-block_buttons'>
          <button className='modal-delete-block_buttons__cancel' type='button' onClick={() => setModalDelIsOpen(false)}>Отмена</button>
          <button className='modal-delete-block_buttons__delete' type='button' onClick={() => deleteAppointment(_id)}>Удалить</button>
        </div>        
      </div>
    </div>
  )
}

export default ModaleDelete; 
