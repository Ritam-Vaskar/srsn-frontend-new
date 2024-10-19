import React, { useEffect, useState } from 'react';
import styles from './Result.module.scss';
import resultData from './../../../../public/SchoolResult.json';

const Result = () => {
  const [results, setResults] = useState({});
  const [selectedYearBritti, setSelectedYearBritti] = useState('2024'); 
  const [selectedYearMadhamik, setSelectedYearMadhamik] = useState('2024'); 

  // get data
  useEffect(() => {
    setResults(resultData);
  }, []);

  
  const brittiResults = results.BrittiClass4Exam || {};
  const madhamikResults = results.MadhyamikClass10Exam || {};

  const handleYearClickBritti = (year) => {
    setSelectedYearBritti(year === selectedYearBritti ? null : year);
  };

  const handleYearClickMadhamik = (year) => {
    setSelectedYearMadhamik(year === selectedYearMadhamik ? null : year);
  };

  return (
    <div className={styles.resultContainer}>
      <h2>Result Analysis</h2>

      {/* Britti Exam Section */}
      <h3>Britti Exam Class 4 Result</h3>
      <div className={styles.yearContainer}>
        {Object.keys(brittiResults).map((year) => (
          <div 
            key={year} 
            className={`${styles.yearDiv} ${selectedYearBritti === year ? styles.selectedYear : ''}`} 
            onClick={() => handleYearClickBritti(year)}
          >
            {year}
          </div>
        ))}
      </div>
      {selectedYearBritti && brittiResults[selectedYearBritti] && ( 
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade Division</th>
            </tr>
          </thead>
          <tbody>
            {brittiResults[selectedYearBritti].map((result, index) => (
              <tr key={index}>
                <td>{result.name}</td>
                <td>{result.marks}</td>
                <td>{result.gradeDivision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Madhyamik Exam Section */}
      <h3>Madhyamik Class 10 Result</h3>
      <div className={styles.yearContainer}>
        {Object.keys(madhamikResults).map((year) => (
          <div 
            key={year} 
            className={`${styles.yearDiv} ${selectedYearMadhamik === year ? styles.selectedYear : ''}`} 
            onClick={() => handleYearClickMadhamik(year)}
          >
            {year}
          </div>
        ))}
      </div>
      {selectedYearMadhamik && madhamikResults[selectedYearMadhamik] && ( 
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Marks</th>
              <th>Grade Division</th>
            </tr>
          </thead>
          <tbody>
            {madhamikResults[selectedYearMadhamik].map((result, index) => (
              <tr key={index}>
                <td>{result.name}</td>
                <td>{result.marks}</td>
                <td>{result.gradeDivision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Result;
