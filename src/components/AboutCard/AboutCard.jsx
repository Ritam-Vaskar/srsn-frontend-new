import React from 'react';
import styles from './styles/AboutCard.module.css';

const AboutCard = ({ image, description, title }) => {
  return (
    <div className={styles.aboutCard}>
      <div className={styles.imgDiv}>
        <img src={image} alt="About" className={styles.aboutCardImage} />
        <div className={styles.imageOverlay}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>Featured</span>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.aboutCardDescription}>{description}</p>
        <button className={styles.learnMoreBtn}>
          <span>Learn More</span>
          <svg className={styles.arrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AboutCard;