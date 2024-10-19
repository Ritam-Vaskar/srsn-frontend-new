import React from 'react'
import Navbar from './layouts/Navbar/AshramNavbar';
import Footer from './layouts/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Headroom from "react-headroom";

const Ashram = () => {
  return (
    <div>
      {/* <Headroom> */}
        <Navbar />
      {/* </Headroom> */}
      <Outlet />
      <Footer />
    </div>
  )
}

export default Ashram
