import React, { createContext } from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import Store from './store/store';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = new Store();

export const Context = createContext({
  store,
})

root.render(    
  <Context.Provider value={{
    store
  }}> 
    <BrowserRouter>    
      <App />
    </BrowserRouter>
  </Context.Provider> 
);


