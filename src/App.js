import {Routes, Route} from 'react-router-dom';
import SignUp from './component/signUp/signUp';
import SimpleSnackbar from './component/snack/snack';

const App = () => {
  return (
      <Routes>        
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/*' element ={<SignUp/>}/>               
      </Routes>      
  );
}
export default App;
