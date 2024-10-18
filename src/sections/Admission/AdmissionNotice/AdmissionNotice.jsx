import React from 'react';
import styles from './AdmissionNotice.module.scss';
import AdmissionImg from './../../../assets/images/IhVCz.jpg';
import { Link } from 'react-router-dom';

const AdmissionNotice = () => {
  return (
    <>
      <div className={styles.admissionNoticeContainer}>
        <img src={AdmissionImg} alt="Admission" className={styles.admissionImg} />
        <div className={styles.admissionOverlay}>
          <div className={styles.admissionSlider}>
            <div className={styles.admissionText}>
              <Link to='/'>🎉 Admission Open! Click Now! 🎉</Link>
              {/* <Link to='/'>🎉 Admission Open! Click Now! 🎉</Link> */}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default AdmissionNotice;
