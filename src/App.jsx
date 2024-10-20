import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
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
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setUserDetails(null));
        return;
      }
      dispatch(setUserDetails(result.user));
    } catch (err) {
      toast.error(err.message);
    }
  }
  useEffect(() => {
    fetchUser();
  })


  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
