import { useState, useEffect, useContext } from 'react';
import { Context } from 'src/index';
import { useNavigate } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import UnderHeader from 'src/components/underHeader/UnderHeader';
import List from 'src/components/List/List';
import Main from 'src/components/Main/Main';
import './style.scss';
import { tableList } from 'src/constants';

const Appointment = () => {  
  const {store} = useContext(Context);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [appointment, setAppointment] = useState({
    inputName : '',
    inputDoctor: '',
    inputData : '',
    inputComplaint : ''
  });  

  useEffect( () => {
    !localStorage.getItem('token') ? navigate('/signIn') : getAllAppointments();
  }, []);

  const getAllAppointments = async () => {
    const response = await store.getAllAppointments();       
    setList(response.data);      
  };  
    
  const logOut = () => {      
    store.signOut();
    navigate('/signIn');   
  };

  return (
    <div className='appointment'>           
      <Header>
        <h1>Прием</h1>
        <button 
          className='header-children__button'
          onClick={logOut}>
            Выход
        </button>        
      </Header>      
      <UnderHeader list = {list} setList = {setList} appointment = {appointment} setAppointment = {setAppointment}/> 
      <Main>
        <div className='appointments-body'>        
        <div className='appointments-table'>
          <table className='appointments-table__head'> 
            <tbody>
              <tr>
                {
                  tableList
                  .map((th, id) => 
                    <th className='appointments-table__head-cell' key={`appointments-table__head-cell-${id}`}>{th}</th>
                  )
                }               
              </tr>
            </tbody> 
          </table>          
          <List list = {list}/>
        </div> 
        </div>
      </Main>     
    </div>
  )
}

export default Appointment;
