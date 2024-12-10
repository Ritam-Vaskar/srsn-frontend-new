import React from 'react';
import styles from './styles/AboutCardSkeleton.module.scss';

const AboutCardSkeleton = ({ isEven }) => {
  return (
    <div
      className={`${styles.aboutCardSkeleton} ${
        isEven ? styles.even : styles.odd
      }`}
    >
      <div className={styles.skeletonImgDiv}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={`${styles.skeletonText} ${styles.short}`}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
};

export default AboutCardSkeleton;
