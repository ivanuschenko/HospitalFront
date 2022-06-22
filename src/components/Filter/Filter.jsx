import { useState, useContext } from 'react';
import moment from 'moment';
import { Context } from 'src/index';
import { dateTimeFormat } from 'src/constants';
import hideImg from 'src/img/bin.svg';
import './style.scss';

const Filter = ({ list, setList, setOpenFilter }) => {  
  const [initialData, setInitialData] = useState('');
  const [finalData, setFinalData] = useState('');
  const { store } = useContext(Context);  
 
  const startFilter = () => {        
    let filtredList = [];
    if (initialData && finalData) {
      filtredList = list.filter( item =>
        moment(item.date, dateTimeFormat).isBetween(initialData, finalData, 'date', '[]')   
      );
      setList(filtredList)
    } 
    if (initialData) {
      filtredList = list.filter( item =>
        moment(item.date, dateTimeFormat).isAfter(initialData)
      );
      setList(filtredList);
    } 
    if (finalData) {
      filtredList = list.filter( item =>
        moment(item.date, dateTimeFormat).isBefore(finalData)
      );
      setList(filtredList);
    }
    return filtredList;
  }
  
  const hideFilter = async () => {
    setOpenFilter(false);
    const response = await store.getAllAppointments();
    setList(response.data); 
  };

  return (
    <div className="filter">
       <div className="filter-block">
        <div className="filter-block-initial">
          <label className="filter-block-initial_label" htmlFor="filter-block-initial_input__initialData">с:</label>
          <input 
            type="date" 
            className="filter-block-initial_input__initialData"
            onChange={(e) => setInitialData(e.target.value)}           
          />
        </div>
        <div className="filter-block-final">
          <label className="filter-block-final_label" htmlFor="filter-block-final_input__finalData">по:</label>
          <input 
            type="date" 
            className="filter-block-final_input__finalData"
            onChange={(e) => setFinalData(e.target.value)}
          />
        </div>
        <div className="filter-block-buttons">
          <button
            type="button" 
            className="filter-block-buttons_button__startFilter"
            onClick={startFilter}
          >
            Фильтровать        
          </button>
          <button className='filter-block-buttons_button__hideFilter'>
          <img
            className="filter-block-buttons_img" 
            src={hideImg} 
            alt="hide"
            onClick={hideFilter} 
          /> 
          </button> 
        </div>                        
      </div>
    </div>
  )
}

export default Filter;