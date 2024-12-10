import React from 'react';
import styles from './styles/ProfileCardSkeleton.module.scss';

const AlumniSkeleton = () => {
  return (
    <div className={`${styles.alumniCard} ${styles.skeletonCard}`}>
      <div className={styles.skeletonProfilePic}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonSubText}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default AlumniSkeleton;
