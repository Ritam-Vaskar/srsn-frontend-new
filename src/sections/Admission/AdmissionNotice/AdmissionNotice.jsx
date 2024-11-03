import React, { useState, useEffect } from 'react';
import styles from './AdmissionNotice.module.scss';
import { Link } from 'react-router-dom';
import SummaryApi from '../../../common';

const AdmissionNotice = ({ flag }) => {

  const [admissionOpen, setAdmissionOpen] = useState(false);

  const fetchAdmissionOpen = async () => {
    try {
      const response = await fetch(SummaryApi.AdmissionFetch.url, {
        method: SummaryApi.AdmissionFetch.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const result = await response.json();
      console.log(result);
      setAdmissionOpen(result.admission.isOngoing);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdmissionOpen();
  }, []);

  // Set up state for the image URL
  const [admissionImgPrimary, setAdmissionImgPrimary] = useState('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713c800923a46758fd19249_295664335_5705538002798067_2231674055699424621_n.jpg');
  const [admissionImgSecondary, setAdmissionImgSecondary] = useState('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg');

  useEffect(() => {
    // Function to handle image change based on window width
    const handleResize = () => {
      if (window.innerWidth < 480) {
        // For mobile width < 480px, set different images
        setAdmissionImgPrimary('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713cbf27fc1310273ef68f1_295575251_5705537952798072_3442865364378167403_n.jpg');
        setAdmissionImgSecondary('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34e03c2b125c749e9c_28071260_1907983642553541_4952021693143437781_o.jpg');
      } else {
        // Revert to original images for wider screens
        setAdmissionImgPrimary('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713c800923a46758fd19249_295664335_5705538002798067_2231674055699424621_n.jpg');
        setAdmissionImgSecondary('https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/6713bd34be2521c91c45aefb_301128514_562327412349985_3679940258914638492_n.jpg');
      }
    };

    // Run on initial render and on window resize
    handleResize(); // Check on component mount
    window.addEventListener('resize', handleResize); // Add resize listener

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <div className={styles.admissionNoticeContainer}>
        {/* Dynamically use either primary or secondary image based on the flag */}
        <img src={flag ? admissionImgPrimary : admissionImgSecondary} alt="Admission" className={styles.admissionImg} />
        <div className={styles.admissionOverlay}>
          <div className={styles.admissionSlider}>
            <div className={styles.admissionText}>
              {admissionOpen ? (
                <Link to='/school/admission_form'>🎉 Admission Open! Click Now! 🎉</Link>
              ) : (
                <div>Admission will open Soon</div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionNotice;
