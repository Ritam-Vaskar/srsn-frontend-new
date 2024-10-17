import React from 'react';
import './styles/HolyTrio.css';
import Button from '../../components/Core/Button';

const HolyTrio = () => {
  return (
    <div className="hero-section">
        <h1>THE <span style={{"color":"var(--ashram-yellow)"}}>HOLY-TRIO</span></h1>
        <div className="imgContent">
      <div className="hero-image">
        <img src="https://www.rkmvnarendrapur.org/img/swami-vivekananda.jpg" alt="Hero Image 1" />
      </div>
      <div className="hero-image">
        <img src="https://www.rkmvnarendrapur.org/img/sri-ramakrishna.jpg" alt="Hero Image 2" />
      </div>
      <div className="hero-image">
        <img src="https://www.rkmvnarendrapur.org/img/sarada-devi.jpg" alt="Hero Image 3" />
      </div>
      </div>
      <Button>View Details</Button>
    </div>
  );
};

export default HolyTrio;
