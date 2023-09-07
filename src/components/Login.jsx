import {React, useEffect} from "react";
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import logo from '../assets/globalshare.png';
import socialMediaVideo from '../assets/socialMediaVideo.mp4';
import { client } from '../client'
import {gapi} from 'gapi-script';


const Login = () => {
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: '638494229255-3v8sit2hqo79es7bqongsdeqvps779n3.apps.googleusercontent.com' ,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
     }, []);
     
    const navigate = useNavigate();

   
    const responseGoogle = (response) => {
        localStorage.setItem('user',JSON.stringify(response.profileObj));

        const { name, googleId, imageUrl } = response.profileObj;

        const doc = {
            _id:googleId,
            _type:'user',
            username:name,
            image:imageUrl
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/home',{replace: true})
        })
    }
  return (
  <div className="h-screen">
    <video
        src={socialMediaVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className="object-cover h-full w-full"
        />
    <div className="bg-blackOverlay w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center">
    <div className="bg-white/70 p-4 rounded-lg flex flex-col justify-center items-center">
        <img src={logo} alt='logo'  />
        
    </div>
   
    <GoogleLogin 
            clientId="638494229255-3v8sit2hqo79es7bqongsdeqvps779n3.apps.googleusercontent.com"
            render={(renderProps)=>(
                <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className='mt-4 flex items-center justify-center bg-mainColor p-2 rounded-full cursor-pointer '

                >
                    <FcGoogle />&nbsp; Sign in with Google
                </button>
                )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
     />

    </div>
    

  </div>)
};

export default Login;
