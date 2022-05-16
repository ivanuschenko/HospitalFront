import { useState, useEffect, useContext } from 'react';
import { Context } from 'src/index';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Header from 'src/components/Header/Header';
import UnderHeader from 'src/components/underHeader/UnderHeader';
import Main from 'src/components/Main/Main';
import './style.scss';
import Delete from 'src/img/bin.svg';
import Edit from 'src/img/edit.svg';

const Appoinment = () => {  
  const {store} = useContext(Context);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState({
    inputName : '',
    inputDoctor: '',
    inputData : '',
    inputAppoint : ''
  });  

  useEffect( () => {
    if (localStorage.getItem('token')) {     
    } else {
      navigate('/signIn');
    }
    const getAllAppointments = async () => {
      const response = await store.getAllAppointments();       
      setList(response.data);      
    }  
    getAllAppointments();    
    }, []);
    
  const logOut = (e) => {
    e.preventDefault();    
    store.signOut();
    navigate('/signIn');   
  }
  
  const editAppoint = (id) => {
    //logic for open popup for edit
  }

  const deleteAppoint = (id) => {
    //logic for open popup for delete
  }

  return(
    <div className='appointment'>           
      <Header>
        <h1>Прием</h1>
        <button 
          className='header-children__button'
          onClick={logOut}>
            Выход
        </button>
      </Header>      
      <UnderHeader list = {list} setList = {setList} inputValue = {inputValue} setInputValue = {setInputValue}/> 
      <Main>
        <div className='appointments-body'>        
        <div className='appointments-table'>
          <table className='appointments-table__head'> 
            <tbody>
              <tr>
                <th className='appointments-table__head-cell'>Имя</th>
                <th className='appointments-table__head-cell'>Доктор</th>
                <th className='appointments-table__head-cell'>Дата</th>
                <th className='appointments-table__head-cell'>Жалобы</th>
                <th className='icons'></th>            
              </tr>
            </tbody> 
          </table>
          <table className='appointments-table__list'>
            <tbody>             
              { 
                list             
                .map((task) => 
                  {
                  const {_id, patient, doctor, date, complaint} = task
                  return (                    
                    <tr className='appointments-table__line' key={`appointments-${_id}`}>                  
                      <td className='appointments-table__line-cell'>{patient}</td> 
                      <td className='appointments-table__line-cell'>{doctor}</td>
                      <td className='appointments-table__line-cell'><Moment format='DD.MM.YYYY'>{date}</Moment></td>
                      <td className='appointments-table__line-cell'>{complaint}</td>
                      <td className='appointments-table__line-cell'>
                        <img src = {Edit} alt='Edit' onClick={() => editAppoint(_id)} />
                        <img src = {Delete} alt='Edit' onClick={() => deleteAppoint(_id)} />
                      </td>
                    </tr>                   
                  )                
                  })
              }
            </tbody> 
          </table>
        </div> 
        </div>
      </Main>     
    </div>
  )
}

export default Appoinment;
