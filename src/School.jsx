import React from 'react'
import Navbar from './layouts/Navbar/SchoolNavbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Home from './Schoolpages/Home/Home';
import Headroom from "react-headroom";


const School = () => {
  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>
      {/* <Home /> */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default School
