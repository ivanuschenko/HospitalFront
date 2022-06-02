import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import ModaleDelete from 'src/components/modal/ModalDelete/ModalDelete';
import ModalEdit from 'src/components/modal/ModalEdit/ModalEdit';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';
import './style.scss';

const List = ({list, setList}) => {

  const [modalDelIsOpen, setModalDelIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [id, setId] = useState('');
  const [changeableLine, setChangeableLine] = useState({});
   
  const deleteAppointment = (id) => {
    setId(id);
    setModalDelIsOpen(true);
  }   

  const editAppointment = (obj) => {
    setChangeableLine(obj);   
    setModalEditIsOpen(true);
  } 

  return (
    <table className='list-table__list'>
      <tbody>             
        { 
          list.map(({_id, patient, doctor, date, complaint}, index) =>                                
            <tr className='list-table__line' key={`list-${_id}`}>                  
              <td className='list-table__line-cell'>{patient}</td> 
              <td className='list-table__line-cell'>{doctor}</td>
              <td className='list-table__line-cell'><Moment format='DD.MM.YYYY'>{date}</Moment></td>
              <td className='list-table__line-cell'>{complaint}</td>
              <td className='list-table__line-cell'>                                
                <input type='image' src={Edit} onClick={() => editAppointment(list[index])} alt='Edit' />
                <input type='image' src={Delete} onClick={() => deleteAppointment(_id)} alt='Delete' />                
              </td>
            </tr>                   
          )
        }
      </tbody>
      {modalDelIsOpen && <ModaleDelete
        list={list} 
        modalDelIsOpen={modalDelIsOpen} 
        setModalDelIsOpen={setModalDelIsOpen} 
        id={id} 
        setList={setList}
      />}
      {modalEditIsOpen && <ModalEdit 
        modalEditIsOpen={modalEditIsOpen} 
        setEditIsOpen={setModalEditIsOpen}               
        changeableLine={changeableLine}        
        setList={setList}                                  
      />} 
    </table>    
  )
}

export default List; 
