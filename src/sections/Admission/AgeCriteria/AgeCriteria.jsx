import React from 'react';
import styles from './AgeCriteria.module.scss'; 

const AgeCriteria = ({ flag }) => {
  return (
    <div className={styles.ageCriteriaContainer}>
      <h2>Age Criteria for Admission</h2>
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
                <td>Ankur</td>
                <td>3 - 4 years</td>
              </tr>
              <tr>
                <td>Kisholoy</td>
                <td>4 - 5 years</td>
              </tr>
              <tr>
                <td>Class 1</td>
                <td>6 - 7 years</td>
              </tr>
              <tr>
                <td>Class 2</td>
                <td>7 - 8 years</td>
              </tr>
              <tr>
                <td>Class 3</td>
                <td>8 - 9 years</td>
              </tr>
              <tr>
                <td>Class 4</td>
                <td>9 - 10 years</td>
              </tr>
            </>
          ) : (
            <>
              <tr>
                <td>Class 5</td>
                <td>10 - 11 years</td>
              </tr>
              <tr>
                <td>Class 6</td>
                <td>11 - 12 years</td>
              </tr>
              <tr>
                <td>Class 7</td>
                <td>12 - 13 years</td>
              </tr>
              <tr>
                <td>Class 8</td>
                <td>13 - 14 years</td>
              </tr>
              <tr>
                <td>Class 9</td>
                <td>14 - 15 years</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgeCriteria;
