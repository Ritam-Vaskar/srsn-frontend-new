import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar/AshramNavbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default App;
