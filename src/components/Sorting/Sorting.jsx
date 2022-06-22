import { useState } from 'react';
import { fields, directions } from 'src/constants';
import './style.scss';

const Sorting = ({ setSortingField, setSortingWay, setOpenFilter }) => {     
  const [openSortDirection, setOpenSortDirection] = useState(false);
  
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
      </div>      
    </div>
  )
}

export default Sorting;
