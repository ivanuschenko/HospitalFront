import React from "react";
import {Routes, Route, } from 'react-router-dom';
import SignIn from "./component/signIn/signIn";
import SignUp from "./component/signUp/signUp";




function App() {
  return (
      <Routes>        
        <Route path="/signIn" element={<SignIn/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/*" element ={<SignIn/>}/>               
      </Routes> 
  );
}

export default App;
