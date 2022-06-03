import { useState, useContext } from 'react';
import { Context } from 'src/index';
import Moment from 'react-moment';
import ModaleDelete from 'src/components/modal/ModalDelete/ModalDelete';
import ModalEdit from 'src/components/modal/ModalEdit/ModalEdit';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';
import './style.scss';

const List = ({list, setList}) => {
  const {store} = useContext(Context);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);  
  const [modalDelIsOpen, setModalDelIsOpen] = useState(false);
  const [changeableLine, setChangeableLine] = useState(null);

  const openEditModal = (appointment) => {      
    setChangeableLine(appointment);   
    setModalEditIsOpen(true);
  }

  const openDeleteModal = (appointment) => {
    setChangeableLine(appointment);
    setModalDelIsOpen(true);
  }

  const editAppointment = async (appointment, id) => {    
    const { modalInputName, modalInputDoctor, modalInputData, modalInputComplaint } = appointment;    
    const response = await store.updateApointment(id, modalInputName, modalInputDoctor, modalInputData, modalInputComplaint);
    setList(response.data);
    setModalEditIsOpen(false);
  }

  const deleteAppointment = async () => {
    const {_id} = changeableLine;
    await store.deleteApointment(_id);
    const temp = list.filter((list) => list._id !== _id); 
    setList(temp)
    setModalDelIsOpen(false);
  }   

  return (
    <div className='list'>    
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
                  <button type='button' className='list-table_button' onClick={() => openEditModal(list[index])}><img src={Edit} alt="Edit"/></button>
                  <button type='button' className='list-table_button' onClick={() => openDeleteModal(list[index])}><img src={Delete} alt="Delete"/></button>                                
                </td>
              </tr>                   
            )
          }
        </tbody>      
      </table>
      {modalDelIsOpen && <ModaleDelete
        setModalDelIsOpen={setModalDelIsOpen} 
        deleteAppointment={deleteAppointment}        
      />}
      {modalEditIsOpen && <ModalEdit           
        setEditIsOpen={setModalEditIsOpen}
        editAppointment={editAppointment}
        changeableLine={changeableLine}                                       
      />} 
    </div>    
  )
}

export default List; 
