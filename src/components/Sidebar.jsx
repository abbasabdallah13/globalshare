import React from "react";
import { Link, NavLink } from "react-router-dom";
import {AiOutlineHome} from 'react-icons/ai';
import { categories } from "../Utils/Data";
import Logo from '../assets/globalshare.png';

const Sidebar = ({user, setToggleSidebar}) => {

    const closeSidebar = () => {
      if(setToggleSidebar){ //to prevent an error on clicking sidebar elements on large screens where the sidebar is already open
        setToggleSidebar(false)
      }
    }

    const links = categories;
  
        const activeStyle = 'flex gap-2 items-center text-green-600 border-r-2 w-full border-black font-extrabold capitalize';
        const nonActiveStyle = 'flex gap-2 items-center text-black hover:text-black capitalize'
  return (
    <div className="flex flex-col mt-4 overflow-y-scroll">
    <Link
        to='/home'
        className="flex justify-center w-full"><img className="w-20 h-16"  src={Logo} alt='logo' /></Link>
    <div className="flex flex-col p-2 gap-4 mt-4">
        <NavLink
            to={'/home'}
            className={({isActive}) => isActive ? activeStyle:nonActiveStyle}
            onClick={closeSidebar}
            >
            <div className="flex items-center"><AiOutlineHome /> &nbsp; Home</div>
            </NavLink>
            
            <h2 className="font-semibold">Discover Categories:</h2>
        {links.map((el,i) => (
            <NavLink
            key={i}
            to={`category/${el.name}`}
            className={({isActive}) => isActive ? activeStyle:nonActiveStyle}
            onClick={closeSidebar}
            >
              <img className='w-8 h-8 rounded-full'   src={el.image} alt={el.name}  />
            {el.name}
            </NavLink>
        ))}
    </div>
    </div>
)};

export default Sidebar;
