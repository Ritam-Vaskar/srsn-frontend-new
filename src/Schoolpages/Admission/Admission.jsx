import React from 'react';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';
import styles from './Admission.module.scss';



const Admission = () => {
  return (
    <div>
      {/* Each section gets an id that matches the href in the HashLink */}
      <section id="notice">
        <AdmissionNotice />
      </section>
      <section id="age">
        <AgeCriteria />
      </section>
      <section id="procedure">
        <Procedure />
      </section>
      <section id="syllabus">
        <Syllabus />
      </section>
    </div>
  );
};

export default Admission;
