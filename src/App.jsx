import React from 'react';
import './App.css';
import Navbar from './layouts/Navbar/Navbar';
import Footer from './layouts/Footer/Footer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import all the pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Activities from './pages/Activities/Activities';
import NewsEvent from './pages/NewsEvent/NewsEvent';
import Media from './pages/Media/Media';
import Contact from './pages/Contact/Contact';
import Donate from './pages/Donate/Donate';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <>
        <Navbar/>
        <Home />
        <Footer/>
      </>
  },
  {
    path: '/about',
    element: 
      <>
        <Navbar/>
        <About />
        <Footer/>
      </>
  },
  {
    path: '/activities',
    element: 
      <>
        <Navbar/>
        <Activities />
        <Footer/>
      </>
  },
  {
    path: '/news_event',
    element: 
      <>
        <Navbar/>
        <NewsEvent />
        <Footer/>
      </>
  },
  {
    path: '/media',
    element: 
      <>
        <Navbar/>
        <Media />
        <Footer/>
      </>
  },
  {
    path: '/contact',
    element: 
      <>
        <Navbar/>
        <Contact />
        <Footer/>
      </>
  },
  {
    path: '/donate',
    element: 
      <>
        <Navbar/>
        <Donate />
        <Footer/>
      </>
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
