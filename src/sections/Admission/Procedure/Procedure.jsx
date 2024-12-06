import React from 'react';
import styles from './Procedure.module.scss'; // Assuming you have a separate CSS/SCSS file for styling

const Procedure = () => {
  return (
    <div className={styles.procedureContainer}>
      <h2>Admission Procedure</h2>
      <ol className={styles.procedureList}>
        <li>
          <h3>Step 1: Application Form</h3>
          <p>Fill out the online application form with the required details.</p>
        </li>
        <li>
          <h3>Step 2: Document Submission</h3>
          <p>Submit necessary documents, including birth certificate, report card, and address proof.</p>
        </li>
        <li>
          <h3>Step 3: Entrance Exam</h3>
          <p>Schedule and take the entrance exam as per the announced dates.</p>
        </li>
        {/* <li>
          <h3>Step 4: Interview</h3>
          <p>Attend the personal interview with the admission committee.</p>
        </li> */}
        {/* <li>
          <h3>Step 5: Admission Offer</h3>
          <p>If selected, you will receive an admission offer letter via email.</p>
        </li> */}
        <li>
          <h3>Step 4: Fee Payment</h3>
          <p>Complete the fee payment within the stipulated time to secure your admission.</p>
        </li>
        <li>
          <h3>Step 5: Orientation</h3>
          <p>Participate in the orientation session to familiarize yourself with the school.</p>
        </li>
      </ol>
    </div>
  );
};

export default Procedure;
