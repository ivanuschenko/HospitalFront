import { Snackbar } from '@mui/material';

 const SimpleSnackbar = ({snackText, openSnack, setOpenSnack}) => {   
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
 
  return (
    <div>      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackText}       
      />
    </div>
  );
}
export default SimpleSnackbar;