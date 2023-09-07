import {React, useEffect, useRef, useState} from "react";
import { Link, Routes, Route } from "react-router-dom";
import Logo from '../assets/globalshare.png';
import {TfiMenu} from 'react-icons/tfi';
import {GrClose} from 'react-icons/gr';
import {client} from '../client';
import { userQuery } from "../Utils/Data";
 import { Sidebar, UserProfile } from "../components";
 import Pins from "./Pins";

const Home = () => {
    const userProfile = JSON.parse(localStorage.getItem('user'));
    
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState([]);
    const scrollRef = useRef(null);
    
    useEffect(() => {
      scrollRef.current.scrollTo(0,0);
    }, []);
    
    

    useEffect(() => {
       const query = userQuery(userProfile.googleId);
       client.fetch(query).then((data) => {setUser(data[0])}); 
    }, []);

    

    
  return (
  <div className="flex flex-col md:flex-row">
      <div className="hidden md:flex h-screen w-1/5 pl-2">
          <Sidebar user={user && user} />
      </div>
    
      <div className="flex justify-between p-4 shadow-lg md:hidden z-10">
        <div onClick={(()=>{setToggleSidebar(true)})}><TfiMenu size='2rem'  /></div>
        <Link 
          to='/home'>
          <img className="w-20 h-16" src={Logo} alt='logo' />
        </Link>
        <Link
          to={`user-profile/${user?._id}`}
          ><img className="h-12 w-12 rounded-full" src={user?.image} alt='user-img' />
        </Link>
        {toggleSidebar && (
          <div className="fixed overflow-y-scroll w-3/5 left-0 top-0 bg-slate-200 transition-all duration-500 ease-in-out animate-slide-in">
            <div className="flex justify-end w-full p-2">
              <GrClose size='1.3rem' className="z-10"  onClick={()=> setToggleSidebar(false)}  />
            </div>
            <Sidebar user={user && user} setToggleSidebar={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className="h-screen overflow-y-scroll w-full bg-gray-100" ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>
      </div>

  </div>
)};

export default Home;
