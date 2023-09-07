import {React, useState} from "react";
import { Link, useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import  {MdDownloadForOffline} from 'react-icons/md'
import  {AiTwotoneDelete} from 'react-icons/ai'
import  {BsFillArrowUpRightCircleFill, BsFilter} from 'react-icons/bs'


import { urlFor, client } from "../client";
import {fetchUser} from '../Utils/fetchUser';

const Pin = ({pin}) => {
 const { postedBy, image, _id, destination, save} = pin;
 const [postHovered, setPostHovered] = useState(false);
 const [savingPost, setSavingPost] = useState(false);
 const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
 

 const navigate = useNavigate();
 const user = fetchUser();
 const alreadySaved = (pin?.save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length;
  
const savePin = (id) => {
  if(!alreadySaved){
    client.patch(id).
    setIfMissing({save: []}).
    insert('after','save[-1]',[{
      _key: uuidv4(),
      userId: user.googleId,
      postedBy: {
        _type: 'postedBy',
        _ref: user.googleId
      }
    }]).
    commit().
    then(() => {
      window.location.reload();
    })
  }
}

const deletePin = (id) => {
  client.delete(id).then(()=>window.location.reload());
}

return <div className="m-2 ">
  <div 
      onMouseEnter={()=> setPostHovered(true)}
      onMouseLeave={()=> setPostHovered(false)}
      onClick={()=> navigate(`/home/pin-detail/${_id}`)}
      className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'>
    {image && (
      <img className="rounded-lg w-full" alt="user-post" src={urlFor(image).width(250).url()}  />
    )}
    {postHovered && (
      <div
        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2"
        style={{height:'100%'}}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a  
              href={`${image?.asset?.url}?dl=`} download
              onClick={(e)=> e.stopPropagation}
              className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
          </div>
          {
            alreadySaved ? 
            (<button className="bg-red-500/75 font-semibold hover:bg-red-500 hover:shadow-lg text-white rounded-lg px-2"
              onClick={(e)=>e.stopPropagation()}
            >{save?.length} Saved</button>):
            (<button className="bg-orange-500/75 font-semibold hover:bg-orange-500 hover:shadow-lg text-white rounded-lg px-2" onClick={(e)=> {
              e.stopPropagation();
              savePin(_id);
            }}>Save</button>
            )} 
        </div>
        <div className="flex justify-between items-center gap-2 w-full pr-2">
          {destination && (
            <a 
              href={destination}
              onClick={(e)=>{e.stopPropagation()}}
              target='_blank'
              rel="noreferrer"
              className='bg-white flex items-center gap-2 text-black font-bold p-2 rounded-full opacity-70 hover:100 hover:shadow-md'
              >
                <BsFillArrowUpRightCircleFill />
                {destination.length > 20 ? destination.slice(8,20) : destination.slice(8,20)}...
              </a>
              )
          }
          {
            postedBy?._id === user.googleId && (
              <div 
                className="bg-sky-50 hover:bg-slate-300 p-2 rounded-full text-dark font-semibold"
                onClick={(e)=>{e.stopPropagation();setConfirmDeleteModal(true)}}
              >
                <button ><AiTwotoneDelete /></button> 
              </div>
            )
            }
            
          </div>  
          
      </div>      
    )}
    {
              confirmDeleteModal && (
                <div 
                  className="h-full w-full bg-black/90 flex flex-col items-center justify-center absolute top-0 left-0 text-white p-4"
                  onClick={(e)=>e.stopPropagation()}
                  >
                  <h4>Are you sure you want to delete this pin ?</h4>
                  <div className="flex gap-2 mt-2"> 
                    <button className='bg-red-500 px-2' onClick={()=>deletePin(_id)}>Delete</button>
                    <button className='bg-slate-500 px-2 text-black' onClick={(e)=>{e.stopPropagation();setConfirmDeleteModal(false)}}>Cancel</button>
                  </div> 
                </div>
              )
            }
    
    </div>
    {postedBy && (
      <Link className="flex gap-2 w-full items-center font-semibold cursor-pointer" to={`/user-profile/${postedBy?._id}`}>
        <img src={postedBy.image} alt='posted by' className="w-7 h-7 rounded-full"  />
        <p>{postedBy.username}</p>
      </Link>
    )}
  </div>;
};

export default Pin; 
