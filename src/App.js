import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Context } from 'src/index';
import SignIn from 'src/components/SignIn/SignIn';
import SignUp from 'src/components/SignUp/SignUp';
import Appointment from 'src/components/Appointment/Appointment';
import './app.scss';

const App = () => {
  const { store } = useContext(Context);
  const [auth, setAuth] = useState(store.isAuth)

  useEffect(() => {        
    store.checkAuth();
    store.subscribe(() => {
      setAuth(store.isAuth)
    }) 
  }, []); 
   
  if (!auth) {       
    return (
      <Routes>        
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn/>} />            
        <Route path="*" element={<Navigate to="/signIn" />} />               
      </Routes>      
    );
  } 
  return (      
    <Routes>
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="*" element={<Navigate to="/appointment" />} />
    </Routes>      
  );  
}

export default App;
