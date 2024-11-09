import React from 'react';
import styles from './PrivacyPolicy.module.scss'


function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <h2 className={styles.privacy}>Privacy Policy</h2>
      <p className={styles.privacyparadiv}>At Sri Ramakrishna Siksha Niketan, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you visit our website.</p>

      <h3 className={styles.h3div}>Information Collection</h3>
      <p className={styles.paradiv}>We collect information that you provide voluntarily, such as your name, email address, and other personal details when you contact us through the website.</p>

      <h3 className={styles.h3div}>Use of Information</h3>
      <p className={styles.paradiv}>The information we collect is used to respond to your queries, improve our website, and provide you with the best possible experience.</p>

      <h3 className={styles.h3div}>Data Security</h3>
      <p className={styles.paradiv}>We use industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>

      <h3 className={styles.h3div}>Cookies</h3>
      <p className={styles.paradiv}>Our website may use cookies to enhance the user experience. Cookies are small files stored on your device that help us track usage and improve site performance.</p>

      <h3 className={styles.h3div}>Third-Party Links</h3>
      <p className={styles.paradiv}>Our website may contain links to third-party sites. We are not responsible for the content or privacy practices of these sites.</p>

      <h3 className={styles.h3div}>Changes to Privacy Policy</h3>
      <p className={styles.paradiv}>We reserve the right to update this privacy policy at any time. Changes will be posted on this page with an updated date.</p>

      <p>Last updated: November 2024</p>
    </div>
  );
}

export default PrivacyPolicy;
