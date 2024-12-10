import React, { useEffect, useState } from 'react';
import AboutCard from '../../components/AboutCard/AboutCard';
import aboutData from '../../data/vision.json';
import AboutCardSkeleton from '../../layouts/Skeletons/AboutCard/AboutCardSkeleton';

const Mission = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(aboutData);
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-container" style={{ marginTop: '30px' }}>
      <center>
        <h1 style={{ fontSize: '30px' }}>Mission & Vision</h1>
      </center>
      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              <AboutCardSkeleton key={index} isEven={index % 2 === 0} />
            ))
        : cards.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              image={card.image}
              description={card.description}
            />
          ))}
    </div>
  );
};

export default Mission;
