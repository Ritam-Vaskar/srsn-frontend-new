import React, { useEffect, useState } from 'react';
import AboutCard from '../../components/AboutCard/AboutCard';
import aboutData from '../../data/vision.json';

const Mission = () => {
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      setCards(aboutData);
    }, []);
  
    return (
      <div className="about-container">
        <center><h1>Mission & Vision</h1></center>
        {cards.map((card) => (
          <AboutCard 
            key={card.id} 
            title= {card.title}
            image={card.image} 
            description={card.description} 
          />
        ))}
      </div>
    );
  };
  
  export default Mission;
