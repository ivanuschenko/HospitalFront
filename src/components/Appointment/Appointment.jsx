import { useState, useEffect, useContext } from 'react';
import { Context } from 'src/index';
import Header from 'src/components/Header/Header';
import ListAdder from 'src/components/ListAdder/ListAdder';
import Sorting from 'src/components/Sorting/Sorting'
import List from 'src/components/List/List';
import Main from 'src/components/Main/Main';
import { fields, tableList, directions } from 'src/constants';
import { sort } from 'src/helper/helperSorting';
import './style.scss';

const Appointment = () => {  
  const { store } = useContext(Context);  
  const [list, setList] = useState([]);
  const [sortingField, setSortingField] = useState(fields[0].value);
  const [sortingWay, setSortingWay] = useState(directions[0].value);
  const [appointment, setAppointment] = useState({
    inputName : '',
    inputDoctor: '',
    inputData : '',
    inputComplaint : ''
  }); 

  useEffect( () => {    
    getAllAppointments();                       
  }, []);  
  
  useEffect( () => {            
    sort(list, sortingWay, sortingField)
  }, [sortingField, sortingWay]);

  const getAllAppointments = async () => {
    const response = await store.getAllAppointments();    
    setList(response.data);               
  };

  return (
    <div className='appointment'>           
      <Header>
        <h1>Прием</h1>
        <button 
          className='appointment-header__button'
          onClick={store.signOut}
        >
          Выход
        </button>        
      </Header>      
      <ListAdder 
        list={list} 
        setList={setList} 
        appointment={appointment} 
        setAppointment={setAppointment}
      /> 
      <Main> 
        <div className='appointment-body'>
          <Sorting 
            setSortingField={setSortingField}          
            setSortingWay={setSortingWay}
          />                
          <div className='appointment-table'>       
            <table className='appointment-table__head'> 
              <tbody>
                <tr>
                  {
                    tableList.map(th =>
                      <th className='appointment-table__head-cell' key={`appointment-table__head-cell-${th.id}`}>{th.field}</th>                                       
                    )
                  }               
                </tr>
              </tbody> 
            </table>          
            <List list={sort(list, sortingWay, sortingField)} setList={setList}/>
          </div>
        </div>         
      </Main>     
    </div>
  )
}

export default Appointment;
