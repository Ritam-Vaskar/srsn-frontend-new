import React from 'react'
import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Ashram = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Ashram
