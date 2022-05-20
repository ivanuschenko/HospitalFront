import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SignIn from 'src/components/SignIn/SignIn';
import SignUp from 'src/components/SignUp/SignUp';
import Appointment from 'src/components/Appointment/Appointment';
import { Context } from 'src/index';
import './app.scss';


const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {      
      store.checkAuth();
    }
  }, []);

  if (!store.getIsAuth()) {       
    return (
      <Routes>        
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/signIn' element={<SignIn/>} /> 
        <Route path='/appointment' element={<Navigate to='/signIn' />} />       
        <Route path='/*' element={<Navigate to='/signIn' />} />               
      </Routes>      
    );
  }
  
  if (store.getIsAuth()) {     
    return (
      <div>
        <Routes>
          <Route path='/appointment' element={<Appointment/>} />
          <Route path='*' element={<Navigate to='/appointment' />} />
        </Routes>
      </div>
    );
  }
}

export default observer(App);
