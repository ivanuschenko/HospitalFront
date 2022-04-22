import React from 'react';
import { Snackbar } from '@mui/material';

 const SimpleSnackbar = ({snackText, open, setOpen}) => {   
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
 
  return (
    <div>      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackText}       
      />
    </div>
  );
}
export default SimpleSnackbar