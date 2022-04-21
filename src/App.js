import React from "react";
import {Routes, Route} from 'react-router-dom';
import SignUp from "./component/signUp/signUp";

function App() {
  return (
      <Routes>        
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/*" element ={<SignUp/>}/>               
      </Routes> 
  );
}
export default App;
