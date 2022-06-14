import { useState, useEffect, useContext } from 'react';
import { Context } from 'src/index';
import Header from 'src/components/Header/Header';
import ListAdder from 'src/components/ListAdder/ListAdder';
import Sorting from 'src/components/Sorting/Sorting'
import List from 'src/components/List/List';
import Main from 'src/components/Main/Main';
import { tableList } from 'src/constants';
import './style.scss';

const Appointment = () => {  
  const { store } = useContext(Context);  
  const [list, setList] = useState([]);
  const [sortingField, setSortingField] = useState('name');
  const [sortingWay, setSortingWay] = useState('asc');
  const [appointment, setAppointment] = useState({
    inputName : '',
    inputDoctor: '',
    inputData : '',
    inputComplaint : ''
  }); 

  useEffect( () => {    
    getAllAppointments();
    sort()                    
  }, []);  
  
  useEffect( () => {            
    sort()
  }, [sortingField, sortingWay]);

  const getAllAppointments = async () => {
    const response = await store.getAllAppointments();    
    setList(response.data)               
  };

  const sort = () => {    
    const sortedList = [...list].sort((a, b) => {
      if (sortingWay === 'asc') {
        if (a[sortingField] === b[sortingField]) {
          return 0;
        } 
        return a[sortingField] > b[sortingField] ? 1 : -1;  
      }
      if (sortingWay === 'desc') {
        if (a[sortingField] === b[sortingField]) {
          return 0;
        } 
        return a[sortingField] < b[sortingField] ? 1 : -1;  
      }      
    });        
    return sortedList;    
  }

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
            sortingField={sortingField}
            sortingWay={sortingWay}
            setSortingField={setSortingField}
            setSortingWay={setSortingWay}
            sort={sort}
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
            <List list={sort()} setList={setList}/>
          </div>
        </div>         
      </Main>     
    </div>
  )
}

export default Appointment;
