import React from 'react';
import styles from './styles/HolyTrio.module.css';

const HolyTrio = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.decorativeElement}></div>
      <div className={styles.floatingShape}></div>
      <div className={styles.floatingShape2}></div>
      
      <div className={styles.headerContainer}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>Sacred Trinity</span>
        </div>
        <h1 className={styles.title}>
          THE <span className={styles.highlight}>HOLY-TRIO</span>
        </h1>
        <p className={styles.subtitle}>
          The divine trinity that guides our spiritual journey and enlightenment
        </p>
      </div>
      
      <div className={styles.imgContent}>
        <div className={styles.heroImage}>
          <div className={styles.imageContainer}>
            <img src="https://www.rkmvnarendrapur.org/img/swami-vivekananda.jpg" alt="Swami Vivekananda" />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayContent}>
                <h3>Swami Vivekananda</h3>
                <p>The Spiritual Leader</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <div className={styles.imageContainer}>
            <img src="https://www.rkmvnarendrapur.org/img/sri-ramakrishna.jpg" alt="Sri Ramakrishna" />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayContent}>
                <h3>Sri Ramakrishna</h3>
                <p>The Divine Master</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <div className={styles.imageContainer}>
            <img src="https://www.rkmvnarendrapur.org/img/sarada-devi.jpg" alt="Sarada Devi" />
            <div className={styles.imageOverlay}>
              <div className={styles.overlayContent}>
                <h3>Sarada Devi</h3>
                <p>The Holy Mother</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomDecoration}>
        <div className={styles.decorativeLine}></div>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeLine}></div>
      </div>
    </div>
  );
};

export default HolyTrio;