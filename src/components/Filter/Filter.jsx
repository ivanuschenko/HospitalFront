import { useState } from 'react';
import moment from 'moment';
import { dateTimeFormat } from 'src/constants';
import hideImg from 'src/img/bin.svg';
import './style.scss';

const Filter = ({ list, setList, hideFilter }) => {  
  const [initialData, setInitialData] = useState('');
  const [finalData, setFinalData] = useState('');  
  const [listBackup, setListBackup] = useState(list);
  const startFilter =  () => {        
    let filtredList = [];
    if (initialData && !finalData) {      
      filtredList = listBackup.filter(item =>
        moment(item.date, dateTimeFormat).isAfter(initialData)
      );
    }

    if (initialData && finalData) {
      filtredList = listBackup.filter(item =>
        moment(item.date, dateTimeFormat).isBetween(initialData, finalData, 'date', '[]')   
      );
    }

    if (!initialData && finalData) {
      filtredList = listBackup.filter(item =>
        moment(item.date, dateTimeFormat).isBefore(finalData)
      );      
    }
    setList(filtredList);    
  }

  const closeFilterAndClearBackup = () => {
    hideFilter();
    setListBackup('');
  }

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
          <button
            type="button" 
            className="filter-block-buttons_button__hideFilter"
            onClick={closeFilterAndClearBackup} 
          >
          <img
            className="filter-block-buttons_img" 
            src={hideImg} 
            alt="hide"            
          /> 
          </button> 
        </div>                        
      </div>
    </div>
  )
}

export default Filter;