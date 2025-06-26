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

  const containerStyle = {
    marginTop: '60px',
    padding: '0 20px',
    minHeight: '100vh',
    position: 'relative'
  };

  const headerContainerStyle = {
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    padding: '40px 0'
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ff6a00, #ff8c19, #ffb347)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '16px',
    letterSpacing: '-0.02em',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    fontSize: '18px',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6',
    fontWeight: '400'
  };

  const decorativeElementStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(255, 140, 25, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: '-1'
  };

  const floatingShapeStyle = {
    position: 'absolute',
    width: '60px',
    height: '60px',
    background: 'linear-gradient(45deg, rgba(255, 106, 0, 0.1), rgba(255, 140, 25, 0.15))',
    borderRadius: '12px',
    top: '20%',
    right: '10%',
    transform: 'rotate(15deg)',
    animation: 'float 6s ease-in-out infinite'
  };

  const floatingShape2Style = {
    position: 'absolute',
    width: '40px',
    height: '40px',
    background: 'linear-gradient(45deg, rgba(255, 179, 71, 0.12), rgba(255, 140, 25, 0.08))',
    borderRadius: '50%',
    bottom: '30%',
    left: '8%',
    animation: 'float 8s ease-in-out infinite reverse'
  };

  const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '40px',
    flexWrap: 'wrap'
  };

  const statItemStyle = {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 140, 25, 0.1)',
    minWidth: '120px'
  };

  const statNumberStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#ff6a00',
    display: 'block',
    marginBottom: '8px'
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  // Responsive styles
  const responsiveStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(15deg); }
      50% { transform: translateY(-20px) rotate(15deg); }
    }
    
    @media (max-width: 768px) {
      .mission-title {
        font-size: 36px !important;
      }
      .mission-subtitle {
        font-size: 16px !important;
        padding: 0 20px;
      }
      .stats-container {
        gap: 20px !important;
      }
      .floating-shapes {
        display: none;
      }
    }
    
    @media (max-width: 480px) {
      .mission-title {
        font-size: 28px !important;
      }
      .mission-subtitle {
        font-size: 14px !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <div style={containerStyle}>
        <div style={decorativeElementStyle}></div>
        <div style={floatingShapeStyle} className="floating-shapes"></div>
        <div style={floatingShape2Style} className="floating-shapes"></div>
        
        <div style={headerContainerStyle}>
          <h1 style={titleStyle} className="mission-title">
            Mission & Vision
          </h1>
          <p style={subtitleStyle} className="mission-subtitle">
            Discover our commitment to excellence and innovation through our core values and future aspirations
          </p>
        </div>

       

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
    </>
  );
};

export default Mission;