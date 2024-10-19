import React, { useState } from 'react';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';
import styles from './Admission.module.scss';

const Admission = () => {
  const [isPrimary, setIsPrimary] = useState(true);

  return (
    <div className={styles.admissionContainer}>
      <h3>Welcome to Admission Details Portal</h3>
      <div className={styles.toggleButtons}>
        <p 
          className={isPrimary ? styles.selected : ''} 
          onClick={() => setIsPrimary(true)}
        >
          Primary School
        </p>
        <p 
          className={!isPrimary ? styles.selected : ''} 
          onClick={() => setIsPrimary(false)}
        >
          Secondary School
        </p>
      </div>

      <AdmissionNotice id="notice" flag={isPrimary}/>
      <AgeCriteria id="age" flag={isPrimary}/>
      <Procedure id="procedure"/>
      <Syllabus id="syllabus" flag={isPrimary}/>
    </div>
  );
};

export default Admission;



// useEffect(() => {
  //   const scrollToSection = () => {
  //     const hash = window.location.hash; // Get the current hash
  //     if (hash) {
  //       const element = document.getElementById(hash.substring(1)); // Find the element
  //       if (element) {
  //         element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
  //       }
  //     }
  //   };

  //   // Scroll on initial load
  //   scrollToSection();

  //   // Scroll on hash change
  //   window.addEventListener('hashchange', scrollToSection);

  //   // Cleanup event listener on unmount
  //   return () => {
  //     window.removeEventListener('hashchange', scrollToSection);
  //   };
  // }, []);