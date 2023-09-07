import React, { useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import {IoMdAdd, IoMdSearch} from 'react-icons/io';

const Navbar = ({searchTerm, setSearchTerm, user}) => {
  const navigate = useNavigate();
 

  if(!user) return null;
  return (
    <div className="w-full mt-5 flex justify-between p-2">
      <div className="flex items-center p-2 w-full">
        <div className="p-1 bg-gray-300 border-[1px] border-black"><IoMdSearch size='2rem'className="" /></div>
        <input 
          type={'text'}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder='Search'
          onFocus={()=> navigate('/home/search')}
          className="shadow-md w-full border-[1px] border-black p-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <Link to={`/home/user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user?.image} alt='user-image' className="rounded-full w-16 h-14" />
        </Link>
        <Link to='/home/create-pin'>
          <IoMdAdd className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center"  />
        </Link>
      </div>

    </div>)
};

export default Navbar;
