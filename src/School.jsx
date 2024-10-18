import React from 'react'
import Navbar from './layouts/Navbar/SchoolNavbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Home from './Schoolpages/Home/Home';


const School = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <Outlet />
      <Footer />    
    </div>
  )
}

export default School
