import React from 'react'
import Navbar from './DummySchoolNav';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';

const School = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />    
    </div>
  )
}

export default School
