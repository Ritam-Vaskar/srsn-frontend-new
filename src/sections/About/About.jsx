import React, { useEffect, useState } from 'react';
import AboutCard from '../../components/AboutCard/AboutCard';
import aboutData from '../../data/About.json';

const About = () => {
    const [cards, setCards] = useState([]);
  
    useEffect(() => {
      setCards(aboutData);
    }, []);
  
    return (
      <div className="about-container">
        {cards.map((card) => (
          <AboutCard 
            key={card.id} 
            image={card.image} 
            description={card.description} 
          />
        ))}
      </div>
    );
  };
  
  export default About;