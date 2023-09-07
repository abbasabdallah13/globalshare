import {React, useState, useEffect} from "react";
import {CiLogout} from 'react-icons/ci'
import { GoogleLogout } from "react-google-login";
import { useNavigate, useParams } from "react-router";
import { userQuery, userCreatedPinsQuery, userSavedPinsQuery } from "../Utils/Data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from './Spinner';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [pinsRequested, setPinsRequested] = useState('created');
  
  const [loading, setLoading] = useState(false);
  
  const [pins, setPins] = useState([]);
  const [user, setUser] = useState([]);
  
  
useEffect(() => {
  const query = userQuery(userId);
  client.fetch(query).then(data => setUser(data[0]));
}, [userId]);


  useEffect(() => {
    if(pinsRequested === 'created'){
      const query = userCreatedPinsQuery(user._id);
      client.fetch(query).then((data) => {setPins(data); setLoading(false)});
    }else if(pinsRequested === 'saved'){
      const query = userSavedPinsQuery(user._id);
      client.fetch(query).then(data => {setPins(data);setLoading(false)})
    }
  }, [pinsRequested, user._id]);
  

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  
  const activeStyle = 'rounded-lg bg-red-700 text-white font-semibold p-2';
  const notActiveStyles = 'rounded-lg bg-slate-200 text-black p-2'
  return (
  <div className="w-full">
    <div className="flex justify-center relative p-2">
      <div className="absolute bottom-[-15%] w-full flex flex-col items-center">
        <img className="w-[10%] rounded-full"   src={user.image} alt='user img' />
        <p className='font-semibold text-2xl mt-2'>{user.username}</p>
      </div>
      <GoogleLogout 
            clientId="638494229255-3v8sit2hqo79es7bqongsdeqvps779n3.apps.googleusercontent.com"
            render={(renderProps)=>(
                <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className='absolute right-0 flex items-center justify-center bg-red-500 h-fit p-2 text-white rounded-full font-semibold'
                >
                    <CiLogout size='1.5rem' />
                </button>
                )}
            onLogoutSuccess={logout}
            cookiePolicy='single_host_origin'
     />
      <img className="w-[80%]" src='https://source.unsplash.com/1600x900/?nature,photography,technology' alt='image'  />
    </div>
    <div className="mt-20 flex justify-center gap-2">
      <button onClick={()=>{setLoading(true);setPinsRequested('created')}}
        className={`${pinsRequested === 'created' ? activeStyle : notActiveStyles}`}
       >Created</button>
      <button onClick={()=> {setPinsRequested('saved');setLoading(true);}}
        className={`${pinsRequested === 'saved' ? activeStyle : notActiveStyles}`}
      >Saved</button>
    </div>
   {
    loading ?<div  className='mt-20'><Spinner  /></div> :
    pins.length ? (
   <MasonryLayout pins={pins} />):
   <div className="flex justify-center mt-20"><p className="font-semibold text-2xl">No pins yet :(</p></div>
  }
    
  </div>)
};

export default UserProfile;
