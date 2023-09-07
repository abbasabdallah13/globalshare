import {React, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {client} from '../client';
import {categories} from '../Utils/Data'
import Spinner from './Spinner';

import {BsFillCloudArrowUpFill} from 'react-icons/bs';
import  {AiTwotoneDelete} from 'react-icons/ai'


const CreatePin = ({user}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [category, setCategory] = useState('');
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  const updateImageAsset = (e) => {
    const img = e.target.files[0];
    setLoading(true);
    if(img.type === 'image/png' || img.type === 'image/svg' || img.type === 'image/jpeg' || img.type === 'image/gif' || img.type === 'image/tiff'){
      client.assets
      .upload('image',img, {contentType:img.type, filename:img.name})
      .then(document => {setImageAsset(document); setLoading(false)})
      .catch(err => console.log('upload failed', err.message))
    }
  } 
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const doc = {
      _type:'pin',
      title: title,
      about: about,
      destination: destination,
      category: category,
      userId: user?._id,
      postedBy: {
        _type:'postedBy',
        _ref:user?._id
      },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset?._id,
        },
      },
    }

    client.create(doc).then(()=> {navigate('/home'); window.location.reload()})
  }

return <div>
    <form onSubmit={handleSubmit} className='flex flex-col justify-center p-4'>
      <label htmlFor="title">Title:</label>
      <input  className="p-2 ml-2 mt-1"   type='text' onChange={(e)=> setTitle(e.target.value)} placeholder='enter pin title'  />

      <label htmlFor="about" className="mt-4">About:</label>
      <input className="p-2 ml-2 mt-1"   type='text' onChange={(e)=> setAbout(e.target.value)} placeholder='enter pin description'  />

      <label htmlFor="destination" className="mt-4">Destination:</label>
      <input  className="p-2 ml-2 mt-1"  type='text' onChange={(e)=> setDestination(e.target.value)} placeholder='enter pin url'  />

      <label htmlFor="category" className="mt-4">Category:</label>
      <select 
        value={(category)} 
        onChange={(e)=>setCategory(e.target.value)}
        className='capitalize p-2 ml-2 mt-1'>
        {categories.map(el => (
          <option value={el.name} className='capitalize' >{el.name}</option>
        ))}
      </select>

      { !imageAsset && !loading ? (
      <label htmlFor="upload-image" className="flex m-4 ">
        <div className="relative w-60 h-60 bg-stone-400 flex flex-col items-center justify-center text-white ">
            <input 
              type='file'
              name='image'
              onChange={updateImageAsset}
              className='h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer'
              />  
            <h3 className=" flex items-center gap-2 text-xl font-semibold">Upload Image <BsFillCloudArrowUpFill size='1.5rem'/> </h3>
            <p className='text-center mt-4'>Use high quality images<br></br> (JPEG, TIFF, PNG)</p>
        </div> 
      </label>
      ):!imageAsset && loading ? <Spinner /> : (
        <div className='flex'>
          <div className="flex justify-center flex-col items-center mt-4 relative">
            
            <img src={imageAsset?.url} alt='pin image' />
            <div 
              onClick={()=>setImageAsset(false)}
              className="cursor-pointer absolute z-10 bottom-2 right-2 bg-gray-300 hover:bg-gray-500 hover:text-white  rounded-full p-2 h-8 w-8 flex items-center justify-center"><button><AiTwotoneDelete /></button></div>
          </div>
        </div>
      )}

      <button type="submit" className="bg-black text-white w-fit p-2 rounded-md mt-4"  >Save Pin</button>
    </form>
  </div>;
};

export default CreatePin;
