import Moment from 'react-moment';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';
import './style.scss';

const List = ({list}) => {

  const editAppointment = (id) => {
    //logic for open popup for edit
  };

  const deleteAppointment = (id) => {
    //logic for open popup for delete
  };

  return (
    <table className='list-table__list'>
      <tbody>             
        { 
          list             
          .map(({_id, patient, doctor, date, complaint}) =>                                
              <tr className='list-table__line' key={`list-${_id}`}>                  
                <td className='list-table__line-cell'>{patient}</td> 
                <td className='list-table__line-cell'>{doctor}</td>
                <td className='list-table__line-cell'><Moment format='DD.MM.YYYY'>{date}</Moment></td>
                <td className='list-table__line-cell'>{complaint}</td>
                <td className='list-table__line-cell'>
                  <img src = {Edit} alt='Edit' onClick={() => editAppointment(_id)} />
                  <img src = {Delete} alt='Delete' onClick={() => deleteAppointment(_id)} />
                </td>
              </tr>                   
            )
        }
      </tbody>
    </table>
  )
}

export default List;