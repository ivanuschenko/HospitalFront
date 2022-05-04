import { Routes, Route } from 'react-router-dom';
import SignIn from './component/SignIn/SignIn';
import SignUp from './component/SignUp/SignUp';

const App = () => {
  return (
    <Routes>        
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='/*' element ={<SignUp/>} />               
    </Routes>      
  );
}
export default App;
