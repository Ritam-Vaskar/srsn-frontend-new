import React, { useEffect, useState } from 'react';
import AboutCard from '../../components/AboutCard/AboutCard';
import aboutData from '../../data/About.json';
import Skeleton from '../../layouts/Skeletons/AboutCard/AboutCardSkeleton';


const About = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a delay to showcase skeleton loader
    const timer = setTimeout(() => {
      setCards(aboutData);
      setLoading(false); // Set loading to false once data is loaded
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="about-container">
      {loading
        ? Array(3) // Show 3 skeletons during loading
            .fill(0)
            .map((_, index) => <Skeleton key={index} />)
        : cards.map((card) => (
            <AboutCard
              key={card.id}
              image={card.image}
              description={card.description}
              title={card.title} // Added title prop
            />
          ))}
    </div>
  );
};

export default About;
