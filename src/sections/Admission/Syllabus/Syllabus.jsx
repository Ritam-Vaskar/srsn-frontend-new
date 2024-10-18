import React, { useState } from 'react';
import syllabusData from './../../../../public/Syllabus.json';
import styles from './Syllabus.module.scss';

const Syllabus = () => {
    const [selectedClass, setSelectedClass] = useState('ankur');

    const handleClassClick = (className) => {
        setSelectedClass(className);
    };

    return (
        <div className={styles.syllabusContainer}>
            <h2>Syllabus</h2>
            <div className={styles.classButtons}>
                {Object.keys(syllabusData).map((className) => (
                    <button
                        key={className}
                        className={`${styles.classButton} ${selectedClass === className ? styles.selected : ''}`}
                        onClick={() => handleClassClick(className)}
                    >
                        {className.charAt(0).toUpperCase() + className.slice(1)}
                    </button>
                ))}
            </div>
            {selectedClass && (
                <div className={styles.syllabusDetails}>
                    <h3>Syllabus for {selectedClass.charAt(0).toUpperCase() + selectedClass.slice(1)}</h3>
                    <ul>
                        {syllabusData[selectedClass].map((subject, index) => (
                            <li key={index}>{subject}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Syllabus;
