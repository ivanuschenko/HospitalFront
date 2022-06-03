import { useState } from 'react';
import Moment from 'react-moment';
import ModaleDelete from 'src/components/modal/ModalDelete/ModalDelete';
import ModalEdit from 'src/components/modal/ModalEdit/ModalEdit';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';
import './style.scss';

const List = ({list, setList}) => {

  const [modalDelIsOpen, setModalDelIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);  
  const [changeableLine, setChangeableLine] = useState(null);
   
  const deleteAppointment = (obj) => {
    setChangeableLine(obj);
    setModalDelIsOpen(true);
  }   

  const editAppointment = (obj) => {
    setChangeableLine(obj);   
    setModalEditIsOpen(true);
  } 

  return (
    <div className='abc'>    
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
                  <button type='button' className='list-table_button' onClick={() => editAppointment(list[index])}><img src={Edit} alt="Edit"/></button>
                  <button type='button' className='list-table_button' onClick={() => deleteAppointment(list[index])}><img src={Delete} alt="Delete"/></button>                                
                </td>
              </tr>                   
            )
          }
        </tbody>      
      </table>
      {modalDelIsOpen && <ModaleDelete
          setModalDelIsOpen={setModalDelIsOpen} 
          changeableLine={changeableLine} 
          setList={setList}
        />}
        {modalEditIsOpen && <ModalEdit           
          setEditIsOpen={setModalEditIsOpen}               
          changeableLine={changeableLine}        
          setList={setList}                                  
        />} 
    </div>    
  )
}

export default List; 
