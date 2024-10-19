import React, { useState, useRef } from 'react';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';
import styles from './Admission.module.scss';

const Admission = () => {
  const [isPrimary, setIsPrimary] = useState(true);


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
        <section id="notice">
          <AdmissionNotice flag={isPrimary} />
        </section>
        <section id="age">
          <AgeCriteria flag={isPrimary} />
        </section>
        <section id="procedure">
          <Procedure />
        </section>
        <section id="syllabus">
          <Syllabus flag={isPrimary} />
        </section>
      </div>
    </div>
  );
};

export default Admission;
