import React from 'react';
import styles from './TermsAndConditions.module.scss'

function TermsAndConditions() {
  return (
    <div className={styles.containert}>
      <h2 className={styles.privacyt}>Terms and Conditions</h2>      
      <h3 className={styles.h3divt}>Introduction</h3>
      <p className={styles.paradivt}>These terms and conditions outline the rules and regulations for the use of Sri Ramakrishna Siksha Niketan's website.</p>

      <h3 className={styles.h3divt}>Acceptance of Terms</h3>
      <p className={styles.paradivt}>By accessing this website, you agree to abide by these terms. If you disagree with any part of these terms, you should not use this site.</p>

      <h3 className={styles.h3divt}  >Use of Site</h3>
      <p className={styles.paradivt}>Users are permitted to use the website for personal and educational purposes only. Commercial use of content on this site is prohibited without prior permission.</p>

      <h3 className={styles.h3divt}>Limitation of Liability</h3>
      <p className={styles.paradivt}>Sri Ramakrishna Siksha Niketan is not responsible for any damages arising from the use of this site or its content.</p>

      <h3 className={styles.h3divt}>Changes to Terms</h3>
      <p className={styles.paradivt}>We reserve the right to modify or update these terms at any time. Please review this page periodically for any changes.</p>

    </div>
  );
}

export default TermsAndConditions;
