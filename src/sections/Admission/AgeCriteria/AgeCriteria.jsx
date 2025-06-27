import React from 'react';
import styles from './AgeCriteria.module.scss';

const AgeCriteria = ({ flag }) => {
  const CurrentYear = new Date().getFullYear();
  return (
    <div className={styles.ageCriteriaContainer}>
      <div className={styles.decorativeElement}></div>
      <div className={styles.floatingShape}></div>
      <div className={styles.floatingShape2}></div>
      
      <div className={styles.headerContainer}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>Age Requirements</span>
        </div>
        <h2>
          Age Criteria for <span className={styles.highlight}>Admission</span>
          <br />
          (According to 01/01/{CurrentYear + 1})
        </h2>
      </div>
      
      <table className={styles.ageCriteriaTable}>
        <thead>
          <tr>
            <th>Class</th>
            <th>Age Range</th>
          </tr>
        </thead>
        <tbody>
          {flag ? (
            <>
              <tr>
                <td>Beej</td>
                <td>3+ years</td>
              </tr>
              <tr>
                <td>Ankur</td>
                <td>4+ years</td>
              </tr>
              <tr>
                <td>Kisholoy</td>
                <td>5+ years</td>
              </tr>
              <tr>
                <td>Class 1</td>
                <td>6+ years</td>
              </tr>
              <tr>
                <td>Class 2</td>
                <td>7+ years</td>
              </tr>
              <tr>
                <td>Class 3</td>
                <td>8+ years</td>
              </tr>
              <tr>
                <td>Class 4</td>
                <td>9+ years</td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td>Class 5</td>
                <td>10+ years</td>
              </tr>
              <tr>
                <td>Class 6</td>
                <td>11+ years</td>
              </tr>
              <tr>
                <td>Class 7</td>
                <td>12+ years</td>
              </tr>
              <tr>
                <td>Class 8</td>
                <td>13+ years</td>
              </tr>
              <tr>
                <td>Class 9</td>
                <td>14+ years</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      
      <div className={styles.bottomDecoration}>
        <div className={styles.decorativeLine}></div>
        <div className={styles.decorativeCircle}></div>
        <div className={styles.decorativeLine}></div>
      </div>
    </div>
  );
};

export default AgeCriteria;