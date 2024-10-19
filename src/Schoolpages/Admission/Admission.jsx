import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';
import styles from './Admission.module.scss';



const Admission = () => {
  const [isPrimary, setIsPrimary] = useState(true);
  const location = useLocation();  

  // Refs for sections
  const noticeRef = useRef(null);
  const ageRef = useRef(null);
  const procedureRef = useRef(null);
  const syllabusRef = useRef(null);

  // Scroll to the section based on the URL hash
  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash;

      switch (hash) {
        case '#notice':
          noticeRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        case '#age':
          ageRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        case '#procedure':
          procedureRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        case '#syllabus':
          syllabusRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    // Trigger scroll when hash changes
    scrollToSection();

    // Listen for future hash changes
    window.addEventListener('hashchange', scrollToSection);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, [location]); // Re-run when location changes

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

      <div ref={noticeRef}>
        <AdmissionNotice id="notice" flag={isPrimary} />
      </div>
      <div ref={ageRef}>
        <AgeCriteria id="age" flag={isPrimary} />
      </div>
      <div ref={procedureRef}>
        <Procedure id="procedure" />
      </div>
      <div ref={syllabusRef}>
        <Syllabus id="syllabus" flag={isPrimary} />
      </div>
    </div>
  );
};

export default Admission;
