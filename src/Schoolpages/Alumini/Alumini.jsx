import React, { useEffect, useState } from 'react';
import AlumniCard from '../../components/AlumniProfileCard/ProfileCard';
import alumniData from '../../data/Alumni.json'; // Import the alumni data
import styles from './styles/Alumni.module.scss';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);

  useEffect(() => {
    // Fetch alumni data from JSON (for now)
    setAlumniList(alumniData);
  }, []);

  return (
    <div className={styles.alumniPage}>
      <h2>Our Alumni</h2>
      <div className={styles.alumniGrid}>
        {alumniList.map((alumni, index) => (
          <AlumniCard key={index} alumni={alumni} />
        ))}
      </div>
    </div>
  );
};

export default Alumni;
