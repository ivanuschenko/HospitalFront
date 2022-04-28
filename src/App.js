import { Routes, Route } from 'react-router-dom';
import SignUp from './component/signUp/SignUp';

const App = () => {
  return (
    <Routes>        
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/*' element ={<SignUp/>} />               
    </Routes>      
  );
}
export default App;
