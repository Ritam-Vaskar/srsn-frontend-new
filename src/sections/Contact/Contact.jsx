import React from 'react';
import './styles/Contact.css';
import logo from '../../assets/images/Logo.png';

const ContactPage = () => {
  return (
    <div className="contact-container">
      <div className="contact-left">
        <img src={logo} alt="Organization Logo" className="logo" />
        <h2>Contact Information</h2>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Phone: +123 456 7890</p>
        <p>Email: info@organization.com</p>
      </div>
      
      <div className="contact-right">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="email" placeholder="Email ID" required />
          <input type="text" placeholder="Identity" required />
          <textarea placeholder="Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
