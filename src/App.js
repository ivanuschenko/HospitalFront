import { Routes, Route } from 'react-router-dom';
import SignIn from 'src/components/SignIn/SignIn';
import SignUp from 'src/components/SignUp/SignUp';
import Appointment from 'src/components/Appointment/Appointment';
import './app.scss';

const App = () => {
  return (
    <Routes>        
      <Route path='/signUp' element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>} />
      <Route path='/appointment' element={<Appointment/>} />
      <Route path='/*' element ={<SignUp/>} />               
    </Routes>      
  );
}

export default App;
