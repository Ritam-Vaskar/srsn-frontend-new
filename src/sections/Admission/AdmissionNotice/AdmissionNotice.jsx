import React from 'react';
import styles from './AdmissionNotice.module.scss';
import AdmissionImgPrimary from './../../../assets/images/IhVCz.jpg';
import AdmissionImgSecondary from './../../../assets/images/photo-1596180262479-467c9ef61fdc.avif'
import { Link } from 'react-router-dom';

const AdmissionNotice = ({flag}) => {
  return (
    <>
      <div className={styles.admissionNoticeContainer}>
        <img src={flag ? AdmissionImgPrimary : AdmissionImgSecondary} alt="Admission" className={styles.admissionImg} />
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
