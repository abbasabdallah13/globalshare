import React from "react";
import {Circles} from 'react-loader-spinner'

const Spinner = ({message}) => {
  return (
  <div className="flex flex-col justify-center items-center w-full h-full z-10">
   <Circles
    color='#00Bfff'
    height={50}
    width={200}
    className='mt-5'
    />
    <p>{message}</p>
    </div>
)};

export default Spinner;
