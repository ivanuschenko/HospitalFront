import { useState, useEffect, useContext } from 'react';
import { Context } from 'src';
import Header from 'src/components/Header/Header';
import ListAdder from 'src/components/ListAdder/ListAdder';
import Sorting from 'src/components/Sorting/Sorting';
import Filter from 'src/components/Filter/Filter';
import List from 'src/components/List/List';
import Main from 'src/components/Main/Main';
import { fields, tableList, directions } from 'src/constants';
import { sort } from 'src/helper/helperSorting';
import addSort from 'src/img/plus.png';
import './style.scss';

const Appointment = () => {  
  const { store } = useContext(Context);  
  const [list, setList] = useState([]);
  const [sortingField, setSortingField] = useState(fields[0].value);
  const [sortingWay, setSortingWay] = useState(directions[0].value);
  const [openFilter, setOpenFilter] = useState(false);
  const [appointment, setAppointment] = useState({
    inputName : '',
    inputDoctor: '',
    inputData : '',
    inputComplaint : ''
  }); 

  useEffect( () => {    
    getAllAppointments();                       
  }, [sortingField, sortingWay]); 

  const getAllAppointments = async () => {
    const response = await store.getAllAppointments();        
    setList(sort(response.data, sortingWay, sortingField));               
  };

  const hideFilter = async () => {    
    const response = await store.getAllAppointments();
    setList(response.data);
    setOpenFilter(false);       
  };

  return (
    <div className="appointment">           
      <Header>
        <h1>Прием</h1>
        <button 
          className="appointment-header__button"
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
        <div className="appointment-body">
          <div className="appointment-body-sort">
            <Sorting           
              setSortingField={setSortingField}          
              setSortingWay={setSortingWay}
              setOpenFilter={setOpenFilter}
            />
            <div className="appointment-body-button">
              <label htmlFor="appointment-body-button_button__open-filter">Добавить фильтр по дате:</label>
              <button 
                type="button" 
                id="appointment-body-button_button__open-filter" 
                className="appointment-body-button_button__open-filter"
                onClick={() => setOpenFilter(true)} 
              >
                <img src={addSort} 
                  alt="btn-open-filter" 
                  className="appointment-body-button_img__open-filter"               
                />
              </button>          
            </div>
          </div>        
          {openFilter && <Filter
            list={list}
            setList={setList} 
            hideFilter={hideFilter}
          />}                          
          <div className="appointment-table">       
            <table className="appointment-table__head"> 
              <tbody>
                <tr>
                  {
                    tableList.map(th =>
                      <th className="appointment-table__head-cell" key={`appointment-table__head-cell-${th.id}`}>{th.field}</th>                                       
                    )
                  }               
                </tr>
              </tbody> 
            </table>          
            <List list={list} setList={setList}/>
          </div>
        </div>         
      </Main>     
    </div>
  )
}

export default Appointment;
