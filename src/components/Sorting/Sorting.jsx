import { useEffect, useState } from 'react';
import addSort from 'src/img/plus.png';
import { fields } from 'src/constants';
import './style.scss';

const Sorting = ({list, setList}) => { 
    
  const [sortingField, setSortingField] = useState('');
  const [openSortDirection, setOpenSortDirection] = useState(false); 
  const [sortingWay, setSortingWay] = useState('asc');

  const sort = () => {    
    const sortedList = [...list].sort((a, b) => (    
      (a[sortingField] > b[sortingField]) ? -1 : ((a[sortingField] < b[sortingField]) ? 1 : 0))  
    );
    if (sortingWay === 'desc') sortedList.reverse();         
    setList(sortedList);    
  } 

  useEffect( () => {         
    sort();     
  }, [sortingField, sortingWay]); 

  return (
    <div className='sorting'>    
      <div className='sorting-body'>
        <div className='sorting-block'>
          <label className='sorting-block_label__field' htmlFor='sorting-block_select__field'>Сортировать по:</label>
          <select 
            className='sorting-block_select__field'
            onClick={() => setOpenSortDirection(true)}
            onChange={(e) => setSortingField(e.target.value)}
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
        <div className={openSortDirection ? 'sorting-block__direction active' : 'sorting-block__direction '} >
          <label htmlFor='sorting-select__direction'>Направление:</label>
          <select 
            className='sorting-block_select__direction' 
            onChange={(e) => setSortingWay(e.target.value)}>
              <option></option>
              <option className='sorting-block_option__direction' value='asc' >По возрастанию</option>
              <option className='sorting-block_option__direction' value='desc'>По убыванию</option>
          </select>
        </div>
        <div className='sorting-block'>
          <label htmlFor='sorting-block_button__open-filter'>Добавить фильтр по дате:</label>
          <button 
            type='button' 
            id='sorting-block_button__open-filter' 
            className='sorting-block_button__open-filter'
          >
            <img src={addSort} 
              alt='btn-add-filter' 
              className='sorting-block_img__addFilter' 
              onClick={() => alert('future logic for open filter components')}  //future logic for open filter components 
            />
          </button>          
        </div>                
      </div>     
    </div>
  )
}

export default Sorting;
