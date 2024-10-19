import React, { useEffect, useState } from 'react';
import AboutCard from '../../components/AboutCard/AboutCard';
import aboutData from '../../data/vision.json';

const Mission = () => {
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      setCards(aboutData);
    }, []);
  
    return (
      <div className="about-container" style={{marginTop:'30px'}}>
        <center><h1 style={{fontSize: '30px'}}>Mission & Vision</h1></center>
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
