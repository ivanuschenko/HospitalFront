import { useState } from 'react';
import Moment from 'react-moment';
import ModaleDelete from 'src/components/modal/ModalDelete/ModalDelete';
import ModalEdit from 'src/components/modal/ModalEdit/ModalEdit';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';
import './style.scss';

const List = ({list, setList}) => {

  const [modalDelActive, setModalDelActive ] = useState(false);
  const [modalEditActive, setModalEditActive ] = useState(false);
  const [id, setId] = useState('')

  const deleteAppointment = (id) => {
    setId(id);
    setModalDelActive(true);
  }   

  const editAppointment = (id) => {    
    setId(id);    
    setModalEditActive(true);    
  } 

  return (
    <table className='list-table__list'>
      <tbody>             
        { 
          list.map(({_id, patient, doctor, date, complaint}) =>                                
            <tr className='list-table__line' key={`list-${_id}`}>                  
              <td className='list-table__line-cell'>{patient}</td> 
              <td className='list-table__line-cell'>{doctor}</td>
              <td className='list-table__line-cell'><Moment format='DD.MM.YYYY'>{date}</Moment></td>
              <td className='list-table__line-cell'>{complaint}</td>
              <td className='list-table__line-cell'>                                
                <input type='image' src={Edit} onClick={() => editAppointment(_id)} alt='Edit' />
                <input type='image' src={Delete} onClick={() => deleteAppointment(_id)} alt='Delete' />                
              </td>
            </tr>                   
          )
        }
      </tbody>
      {modalDelActive && <ModaleDelete
        list={list} 
        active={modalDelActive} 
        setActive={setModalDelActive} 
        id={id} 
        setList={setList}
      />}
      {modalEditActive && <ModalEdit 
        modalEditActive={modalEditActive} 
        setEditActive= {setModalEditActive}               
        id={id}
        list={list}
        setList={setList}                                  
      />} 
    </table>    
  )
}

export default List; 
