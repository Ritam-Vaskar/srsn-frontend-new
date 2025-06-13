import React, { useRef } from 'react';
import styles from './Source.module.scss';

const Source = () => {
  const linkBoxRef = useRef(null);

  const handleMouseMove = (e) => {
    const box = linkBoxRef.current;
    const boxRect = box.getBoundingClientRect();
    const offsetX = (e.clientX - boxRect.left) / boxRect.width - 0.5;
    const offsetY = (e.clientY - boxRect.top) / boxRect.height - 0.5;

    box.style.transform = `translate(${offsetX * 10}px, ${offsetY * 10}px)`;
  };

  const handleMouseLeave = () => {
    if (linkBoxRef.current) {
      linkBoxRef.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Project Repositories</h2>
      <div 
        className={styles.linkBox}
        ref={linkBoxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <a 
          href="https://github.com/Ritam-Vaskar/srsn-frontend-new" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          <span>Frontend Repository</span>
        </a>
        <a 
          href="https://github.com/sandipto729/SRSNBackend" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          <span>Backend Repository</span>
        </a>
        <a 
          href="https://github.com/sandipto729/SRSN-Chatbot.git"
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          <span>Chatbot Repository</span>
        </a>
      </div>
    </div>
  );
};

export default Source;
