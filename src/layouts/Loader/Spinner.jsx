import React from 'react';
import styles from './styles/Spinner.module.scss'; 

const Spinner = () => {
  return (
    <center>
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1}></div>
      <div className={styles.doubleBounce2}></div>
    </div>
    </center>
  );
};

export default Spinner;
