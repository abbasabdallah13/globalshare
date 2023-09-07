import {React, useEffect} from "react";
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './container/Home'
import { fetchUser } from "./Utils/fetchUser";

const App = () => {

  useEffect(() => {
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  }, []);
  

  return(
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home/*' element={<Home />} />
        </Routes>
      </div> 
    )
  }
;

export default App;
