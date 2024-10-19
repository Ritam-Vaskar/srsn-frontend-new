import React, { useState, useRef } from 'react';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';
import styles from './Admission.module.scss';

const Admission = () => {
  const [isPrimary, setIsPrimary] = useState(true);

  // Refs for sections
  const noticeRef = useRef(null);
  const ageRef = useRef(null);
  const procedureRef = useRef(null);
  const syllabusRef = useRef(null);

  // Function to scroll to a particular section
  const handleScroll = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.admissionContainer}>
      <div className={styles.btncon}>
      <h3>Welcome to Admission Details Portal</h3>

      {/* Toggle buttons for Primary and Secondary School */}
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
      </div>


      {/* Sections */}
      <div className={styles.sections}>
        <section id="notice" ref={noticeRef}>
          <AdmissionNotice flag={isPrimary} />
        </section>
        <section id="age" ref={ageRef}>
          <AgeCriteria flag={isPrimary} />
        </section>
        <section id="procedure" ref={procedureRef}>
          <Procedure />
        </section>
        <section id="syllabus" ref={syllabusRef}>
          <Syllabus flag={isPrimary} />
        </section>
      </div>
    </div>
  );
};

export default Admission;
