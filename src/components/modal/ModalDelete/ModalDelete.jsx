import './style.scss';

const ModaleDelete = ({setModalDelIsOpen, deleteAppointment}) => {   
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
          <button className='modal-delete-block_buttons__delete' type='button' onClick={deleteAppointment}>Удалить</button>
        </div>        
      </div>
    </div>
  )
}

export default ModaleDelete; 
