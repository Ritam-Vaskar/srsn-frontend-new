import React, { useState, useEffect } from 'react';
import SyllabusPrimary from './../../../../public/SyllabusPrimary.json';
import SyllabusSecondary from './../../../../public/SyllabusSecondary.json';
import styles from './Syllabus.module.scss';

const Syllabus = ({ flag }) => {
    const [syllabusData, setSyllabusData] = useState(flag ? SyllabusPrimary : SyllabusSecondary);
    const [selectedClass, setSelectedClass] = useState(flag ? 'ankur' : 'class5');

    useEffect(() => {
        setSyllabusData(flag ? SyllabusPrimary : SyllabusSecondary);
        setSelectedClass(flag ? 'ankur' : 'class5');
    }, [flag]);

    const handleClassClick = (className) => {
        setSelectedClass(className);
    };

    const formatClassName = (className) => {
        if (className.startsWith('class')) {
            return className.replace('class', 'Class ') + '';
        }
        return className.charAt(0).toUpperCase() + className.slice(1);
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
                        {formatClassName(className)}
                    </button>
                ))}
            </div>
            {selectedClass && syllabusData[selectedClass] && (
                <div className={styles.syllabusDetails}>
                    <h3>Syllabus for {formatClassName(selectedClass)}</h3>
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
