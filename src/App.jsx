import React from 'react';
import { useRef } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { setAlumniDetails } from './store/alumniSclice';
import { useState, useEffect } from 'react';
import Context from './Context';
import Chatbot from './Chatbot/Chatbot';
import { requestPermission } from './firebase';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { UAParser } from 'ua-parser-js';
import { onMessage } from "firebase/messaging";
import { makeAuthenticatedRequest, hasAccessToken, clearTokens, makeAlumniAuthenticatedRequest, hasAlumniAccessToken, clearAlumniTokens, startUserTokenRefreshService, stopUserTokenRefreshService } from './helper/tokenManager';


function App() {

  const dispatch = useDispatch();

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const fetchUser = async () => {
    try {
      // Check if user has access token
      if (!hasAccessToken()) {
        dispatch(setUserDetails(null));
        stopUserTokenRefreshService(); // Stop refresh service if no token
        return;
      }

      const response = await makeAuthenticatedRequest(SummaryApi.UserProfile.url, {
        method: SummaryApi.UserProfile.method
      });
      
      const result = await response.json();
      // console.log(result);
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setUserDetails(null));
        clearTokens(); // Clear tokens if user fetch fails
        stopUserTokenRefreshService(); // Stop refresh service
        return;
      }
      dispatch(setUserDetails(result.user));
      startUserTokenRefreshService(); // Start automatic token refresh
    } catch (err) {
      // toast.error(err.message);
      console.log('fetchUser error:', err);
      
      // Only clear tokens if it's an authentication error
      if (err.message?.includes('authentication failed') || err.message?.includes('login again')) {
        console.log('Authentication failed, clearing tokens and stopping refresh service');
        dispatch(setUserDetails(null));
        clearTokens(); // Clear tokens only on auth failure
        stopUserTokenRefreshService(); // Stop refresh service
      } else {
        // For other errors (network, etc.), don't clear tokens - might be temporary
        // Keep the refresh service running so it can retry
        console.log('fetchUser non-auth error (keeping tokens):', err.message);
      }
    }
  }
  const fetchAlumni = async () => {
    try {
      // Check if alumni has access token
      if (!hasAlumniAccessToken()) {
        dispatch(setAlumniDetails(null));
        return;
      }

      const response = await makeAlumniAuthenticatedRequest(SummaryApi.AlumniDetailsFetch.url, {
        method: SummaryApi.AlumniDetailsFetch.method
      });
      
      const result = await response.json();
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setAlumniDetails(null));
        clearAlumniTokens(); // Clear alumni tokens if fetch fails
        return;
      }
      const data = result;
      console.log(data.user);
      dispatch(setAlumniDetails(data.user));
    } catch (err) {
      console.log('fetchAlumni error:', err);
      
      // Only clear tokens if it's an authentication error
      if (err.message?.includes('authentication failed') || err.message?.includes('login again')) {
        dispatch(setAlumniDetails(null));
        clearAlumniTokens(); // Clear alumni tokens only on auth failure
      } else {
        // For other errors, just log and don't clear tokens
        console.log('fetchAlumni non-auth error:', err.message);
      }
    }
  }
  useEffect(() => {
    fetchUser();
    fetchAlumni();
  }, [])

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


  const user = useSelector(state => state?.user?.user);

  const tokenSentRef = useRef(false);

  useEffect(() => {
    // Only request FCM permission for authenticated users
    if (!user || !user._id || tokenSentRef.current) return;

    const sendTokenDetails = async () => {

      const userId = user._id;
      const role = user.role;

      const token = await requestPermission(userId, role);
      if (!token) return;

      const parser = new UAParser();
      const ua = parser.getResult();

      let ip = '';
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const json = await res.json();
        ip = json.ip;
      } catch (err) {
        console.warn("IP fetch failed:", err);
      }

      const payload = {
        token,
        userId,
        role,
        deviceInfo: {
          browser: ua.browser.name,
          os: ua.os.name,
          ip,
        }
      };

      await axios.post(SummaryApi.FcmTokenSend.url, payload);
      console.log("✅ Token sent successfully");
      tokenSentRef.current = true;
    };

    sendTokenDetails();
  }, [user]);

  useEffect(() => {
    import("./firebase").then(({ messaging }) => {
      if (!messaging) {
        console.error("🚨 Firebase Messaging is undefined");
        return;
      }

      onMessage(messaging, (payload) => {
        console.log("📬 Foreground message received:", payload);
        toast.info(`${payload.notification?.title}\n${payload.notification?.body}`);
      });
    }).catch(err => {
      console.error("❌ Error loading Firebase:", err);
    });
  }, []);



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
