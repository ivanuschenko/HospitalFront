  export const sort = (list, sortingWay, sortingField) => {    
    const sortedList = [...list].sort((a, b) => {
      if (a[sortingField] === b[sortingField]) {
        return 0;
      }      
      if (sortingWay === 'asc') {   
        return a[sortingField] > b[sortingField] ? 1 : -1; 
      }
      if (sortingWay === 'desc') {       
        return a[sortingField] < b[sortingField] ? 1 : -1;  
      }
    });        
    return sortedList;    
  }