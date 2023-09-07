import React from "react";
import { useState } from "react";
import {Route, Routes} from 'react-router-dom';
import { Navbar, Feed, PinDetails, CreatePin, Search } from "../components";

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');


  
  return (
    <div className="w-full">
        <div className="w-full">
          <Navbar setSearchTerm={setSearchTerm} searchTerm={searchTerm} user={user} />
        </div>
        <div className="h-full">
          <Routes>
            <Route path='/' element={<Feed />}  />
            <Route path='/category/:categoryId' element={<Feed />}  />
            <Route path='/pin-detail/:pinId' element={<PinDetails user={user && user} />}  />
            <Route path='create-pin' element={<CreatePin user={user && user} />}  />
            <Route path='/search' element={<Search searchTerm={searchTerm}  />}  />
          </Routes>
        </div>
    </div>
  )};

export default Pins;
