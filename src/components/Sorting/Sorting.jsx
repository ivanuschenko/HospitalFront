import React, { useEffect, useState } from 'react';
import addSort from 'src/img/plus.png';
import { fields } from 'src/constants';
import './style.scss';

const Sorting = ({list, setList}) => { 
    
  const [sortField, setSortField] = useState('');
  const [opensortField, setOpensortField] = useState(false); 
  const [sortWay, setSortWay] = useState('asc');

  const sort = () => {    
    const sortedList = [...list].sort((a, b) => (    
      (a[sortField] > b[sortField]) ? -1 : ((a[sortField] < b[sortField]) ? 1 : 0))  
    );
    if (sortWay === 'desc') sortedList.reverse();         
    setList(sortedList);    
  } 

  useEffect( () => {         
    sort();     
  },[sortField, sortWay]); 

  return (
    <div className='sorting'>    
      <div className='sorting-body'>
        <div className='sorting-block'>
          <label className='sorting-block_label__byfield' htmlFor="sorting-block_select__field">Сортировать по:</label>
          <select 
            className="sorting-block_select__field"
            onClick= {() => setOpensortField(true)}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option></option>          
            {
              fields.map((item, index) => (
                <option 
                  value={item.value} 
                  key={index}
                  className='sorting-block_option__field'               
                >
                  {item.name}
                </option>
              ))        
            }
          </select>
        </div>        
        <div className={opensortField ? 'sorting-block__direction active' : 'sorting-block__direction '} >
          <label htmlFor="sorting-select__direction">Направление:</label>
          <select 
            className="sorting-block_select__direction" 
            onChange={(e)=> setSortWay(e.target.value)}>
              <option></option>
              <option className='sorting-block_option__direction' value="asc" >По возрастанию</option>
              <option className='sorting-block_option__direction' value="desc">По убыванию</option>
          </select>
        </div>
        <div className='sorting-block'>
          <label htmlFor="sorting-block_button__open-filter">Добавить фильтр по дате:</label>
          <button 
            type='button' 
            id='sorting-block_button__open-filter' 
            className='sorting-block_button__open-filter'
          >
            <img src={addSort} 
              alt="btn-add-filter" 
              className='sorting-blokc_img__addFilter' 
              onClick={()=>alert(true)} 
            />
          </button>          
        </div>                
      </div>     
    </div>
  )
}

export default Sorting;
