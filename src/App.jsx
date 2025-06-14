import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import {setAlumniDetails} from './store/alumniSclice';
import { useState,useEffect } from 'react';
import Context from './Context';
import Chatbot from './Chatbot/Chatbot';


function App() {
  const dispatch = useDispatch();

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(SummaryApi.UserProfile.url, {
        method: SummaryApi.UserProfile.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setUserDetails(null));
        return;
      }
      dispatch(setUserDetails(result.user));
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    }
  }
  const fetchAlumni=async()=>{
    try{
        const response = await fetch(SummaryApi.AlumniDetailsFetch.url, {
            method: SummaryApi.AlumniDetailsFetch.method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const result = await response.json();
        if (!result.success) {
            // toast.error(result.message);
            return;
        }
        const data=result;
        console.log(data.user);
        dispatch(setAlumniDetails(data.user));
    }catch(err){
        console.log(err);
        // toast.error(err.message);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchAlumni();
  })

  // //chatbat added
  // useEffect(() => {
  //   // Create script for Botpress chat
  //   const scriptInject = document.createElement('script');
  //   scriptInject.src = import.meta.env.VITE_BOTPRESS_CHAT_URL;
  //   document.body.appendChild(scriptInject);

  //   // Create configuration script
  //   const scriptConfig = document.createElement('script');
  //   scriptConfig.src = import.meta.env.VITE_BOTPRESS_CONFIG_URL;
  //   scriptConfig.defer = true;
  //   document.body.appendChild(scriptConfig);

  //   // Cleanup function to remove scripts on component unmount
  //   return () => {
  //     document.body.removeChild(scriptInject);
  //     document.body.removeChild(scriptConfig);
  //   };
  // }, []);


  return (
    <>
      <Context.Provider value={{ fetchUser, fetchAlumni }}>
        {/* <Navbar /> */}
        <ToastContainer />
        {/* Chatbot Integration */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onToggle={toggleChatbot} 
      />
        <Outlet />
        {/* <Footer /> */}
      </Context.Provider>
    </>
  );
}

export default App;
