import React from 'react'
import styles from './styles/AlumniManage.module.scss';
import AlumniApplicationForm from './AlumniApplicationForm';
import { useState } from 'react';
import AlumniLogin from './AlumniLogin';
const AlumniManage= ({onClose}) => {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div className={styles.popupOverlay}>   
          <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onClose}>X</button>
            {showLogin ? (
              <AlumniLogin showLogin={showLogin} setShowLogin={setShowLogin}/>
            ) : (
              <AlumniApplicationForm showLogin={showLogin} setShowLogin={setShowLogin}/>
            )}
          </div>
        </div>
      );
}

export default AlumniManage
