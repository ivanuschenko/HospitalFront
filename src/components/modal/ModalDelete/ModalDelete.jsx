import { useContext } from 'react';
import { Context } from 'src/index';
import './style.scss';

const ModaleDelete = ({list, active, setActive, id, setList}) => {
  const {store} = useContext(Context);

  const deleteAppointment = async (id) => { 
    await store.deleteApointment(id);   
    const temp = list.filter(el => el._id !== id);    
    setList(temp);
    setActive(false);    
  }
  return (
    <div className={active? 'modal-delete active' : 'modal-delete'} onClick={() => setActive(false)}>
      <div className='modal-delete-block' onClick={(e) => e.stopPropagation()}>
        <div className='modal-delete-block_title'>
          <h1>Удалить прием</h1>
        </div>
        <div className='modal-delete-block_text__notification'>
          <p>Вы действительно хотите удалить прием?</p>
        </div>               
        <div className='modal-delete-block_buttons'>
          <button className='modal-delete-block_buttons__cancel' type='button' onClick={()=>setActive(false)}>Отмена</button>
          <button className='modal-delete-block_buttons__delete' type='button' onClick={()=>deleteAppointment(id)}>Удалить</button>
        </div>        
      </div>
    </div>
  )
}

export default ModaleDelete; 
