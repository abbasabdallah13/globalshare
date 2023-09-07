import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { client, urlFor } from "../client";
import {v4 as uuidv4} from 'uuid';

import party from '../assets/party.png'
import cool from '../assets/cool.png'
import great from '../assets/great.png'
import love from '../assets/love.png'
import mmm from '../assets/mmm.png'
import onFire from '../assets/onFire.png'
import inLove from '../assets/inLove.png'
import thumbsUp from '../assets/thumbsUp.png'
import yeay from '../assets/yeay.png'
import commentBubble from '../assets/comment-bubble.png' 
import { useSyncExternalStore } from "react";
import { fetchUser } from "../Utils/fetchUser";
import { pinDetailQuery } from "../Utils/Data";

const PinDetails = () => {
  const { pinId } = useParams();

  const [reactionText, setReactionText] = useState('React');
  

  const reactions = [
    {
      title: 'Love',
      src: love
    },
    {
      title: 'Cool',
      src: cool
    },
    {
      title: 'Great',
      src: great
    },
    {
      title: 'mmm',
      src: mmm
    },
    {
      title: 'On Fire',
      src: onFire
    },
    {
      title: 'In Love',
      src: inLove
    },
    {
      title: 'Thumbs Up',
      src: thumbsUp
    },
    {
      title: 'Yeay',
      src: yeay
    }
  ]
  
  const [pin, setPin] = useState(null);
  const [reactionsOverlay, setReactionsOverlay] = useState(false);
  const [reaction, setReaction] = useState(party);
  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState('');
  

  
  
  
const user = fetchUser();

  

  useEffect(() => {
   const query = pinDetailQuery(pinId);
    client.fetch(query)
   .then((data) => {setPin(data[0])})
  }, []);
  
  
  const alreadySaved = (pin?.save?.filter((item) => item.postedBy._id === user.googleId))?.length;

  const savePin = (id) => {
      id.preventDefault();
      client.patch(pin._id).
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
      then((data) => {
        window.location.reload();
      })
  }

  const handleComment = (e) => {
    e.preventDefault();
      client.patch(pinId).
      setIfMissing({comments: []}).
      insert('after','comments[-1]',[{
        comment,
        _key: uuidv4(),
        postedBy: {
          _type: 'postedBy',
          _ref: user.googleId
        }
      }]).
      commit().
      then((data) => {
        window.location.reload();
      }).catch(err => console.error(err));
  }


  return( 
  <div className='p-4 flex flex-col md:flex-row'>
    <div className='flex flex-col md:w-1/2'>
      {pin && (<img src={urlFor(pin?.image?.asset?.url)} alt='pin image'  />)}
      {pin && (<div className = 'flex justify-between items-center gap-2 border-2 border-slate-400  px-2 py-1'>
        <Link
          to={`/user-profile/${pin?.userId}`}
          className="flex gap-2 items-center">
          <img className="w-8 h-8 rounded-full"  src={pin?.postedBy?.image} /> 
          <h4 className="font-semibold">{pin?.postedBy?.username}</h4>
        </Link>
        <p>{pin?._createdAt.match(/\d{4}-\d+-\d+/g)}</p>
        </div>)}
      <div className="flex gap-2 mt-2">
         {alreadySaved ? (
              <button className="bg-red-500/75 font-semibold hover:bg-red-500 hover:shadow-lg text-white rounded-lg px-2">{pin?.save?.length} Saved</button>
            ):
            (<button className="bg-orange-500/75 font-semibold hover:bg-orange-500 hover:shadow-lg text-white rounded-lg px-2"  onClick={savePin}>Save</button>)
          }
        <div className='relative'
          onMouseEnter={()=>setReactionsOverlay(true)}
          onMouseLeave={()=>setReactionsOverlay(false)}
        >
          <button 
            style={{backgroundColor: reaction!==party && 'white', border: reaction!==party && '1px solid black' }}
            className="bg-emerald-200 px-2 rounded-lg font-semibold flex items-center">
            {reactionText} &nbsp;<img className="w-5 h-5" src={reaction} alt='party' />
          </button>
            {reactionsOverlay && (
              <div className="absolute bottom-0 bg-emerald-200 mt-2 reactions-overlay w-40">
                {reactions.map(el => (
                  <div className='flex gap-2 p-2 items-center justify-around  border-b-2 border-black hover:bg-white cursor-pointer' 
                        key={el.title + 'reaction'}
                        onClick={()=>{setReaction(el.src); setReactionText(el.title); setReactionsOverlay(false)}}
                        >
                    <img className="w-7 h-7"  src={el.src} alt={el.title} />
                    <h4>{el.title}</h4>
                  </div>
                ))}
              </div>
            )}
        </div>  
        <button style={{backgroundColor:'#757578'}} className='flex gap-2 items-center text-white px-2 rounded-lg'
          onClick={()=>setCommentModal(true)}>Comment <img className='w-5 h-5'  src={commentBubble} alt='comment bubble' /></button>
      </div>
      {commentModal && (
        <div className='w-full flex mt-2 gap-2'>
          <div className="border-2  flex items-center justify-center p-2 rounded-full"><img className="w-16 h-12 rounded-full"  src={user[0]?.image} /></div>
          <input type='text' placeholder="Add a Comment" className='p-2 w-full border-2  border-slate-200 focus:border-slate-300  rounded-md' onChange={(e)=>setComment(e.target.value)}   />
          <button className='p-2 rounded-lg'style={{backgroundColor:'#aad0d2'}} onClick={handleComment} >Comment</button>
        </div>
      )}
    </div>
    <div className='flex flex-col p-4'>
        <h1 className="text-xl font-bold">{pin?.title}</h1>
        <div className="mt-2">
          <h1 className="font-semibold">About:</h1>
          <h3 className="ml-2">{pin?.about}</h3>
        </div>
        <div className="flex flex-col mt-2">
          <h1 className="text-l font-semibold">Comments:</h1>
          {!pin?.comments?.length  && (<h1 className='m-2'>No comments yet :( </h1>)}
          {pin?.comments?.map(el => (
            <div className='flex gap-2 items-center  p-2'>
              <Link to={`/user-profile/${el.postedBy._id}`}>
                <img 
                  src={el.postedBy.image}
                  alt='commentor img'
                  className="w-7 h-7 rounded-full"
                />
              </Link>
              <div className='flex flex-col justify-center'>
                <p className="font-semibold">{el.postedBy.username}</p>
                <p key={pin._id}>{el.comment}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  </div>
)};

export default PinDetails;
