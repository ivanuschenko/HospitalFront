import { useState } from 'react';
import { fields, directions } from 'src/constants';
import addSort from 'src/img/plus.png';
import './style.scss';

const Sorting = ({ setSortingField, setSortingWay}) => {     
  const [openSortDirection, setOpenSortDirection] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="sorting">    
      <div className="sorting-body">
        <div className="sorting-block">
          <label className="sorting-block_label__field" htmlFor="sorting-block_select__field">Сортировать по:</label>
          <select 
            className="sorting-block_select__field"
            onClick={() => setOpenSortDirection(true)}
            onChange={(e) => setSortingField(e.target.value)}
          >                      
            {
              fields.map((item, index) => (
                <option 
                  value={item.value} 
                  key={index}
                  className="sorting-block_option__field"                                                 
                >
                  {item.name}
                </option>
              ))        
            }
          </select>
        </div>
        {openSortDirection && 
          <div className="sorting-block__direction">
            <label htmlFor="sorting-select__direction">Направление:</label>
            <select 
              className="sorting-block_select__direction" 
              onChange={(e) => setSortingWay(e.target.value)}>                            
                { 
                  directions.map(({ value, way }) =>
                    <option className="sorting-block_option__direction" key={`direction-${value}`} value={value} >{way}</option>
                  )
                }              
            </select>
          </div>
        }
        <div className="sorting-block">
          <label htmlFor="sorting-block_button__open-filter">Добавить фильтр по дате:</label>
          <button 
            type="button" 
            id="sorting-block_button__open-filter" 
            className="sorting-block_button__open-filter"
            onClick={() => setOpenFilter(true)}   //future logic for open filter components 
          >
            <img src={addSort} 
              alt="btn-open-filter" 
              className="sorting-block_img__open-filter"               
            />
          </button>          
        </div>                
      </div>     
    </div>
  )
}

export default Sorting;
