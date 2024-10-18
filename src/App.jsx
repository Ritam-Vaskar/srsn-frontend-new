import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar/AshramNavbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
