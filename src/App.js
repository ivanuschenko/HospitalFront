import { Routes, Route } from 'react-router-dom';
import SignIn from '/home/user/Medecine/Front/HospitalFront/src/components/SignIn/SignIn';
import SignUp from '/home/user/Medecine/Front/HospitalFront/src/components/SignUp/SignUp';

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
