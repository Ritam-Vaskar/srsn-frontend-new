import React, { useEffect } from 'react';
import AdmissionNotice from '../../sections/Admission/AdmissionNotice/AdmissionNotice';
import AgeCriteria from '../../sections/Admission/AgeCriteria/AgeCriteria';
import Procedure from '../../sections/Admission/Procedure/Procedure';
import Syllabus from '../../sections/Admission/Syllabus/Syllabus';

const Admission = () => {
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

  return (
    <div>
      <AdmissionNotice id="notice" />
      <AgeCriteria id="age" />
      <Procedure id="procedure" />
      <Syllabus id="syllabus" />
    </div>
  );
};

export default Admission;
