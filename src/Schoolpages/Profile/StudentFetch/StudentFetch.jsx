import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import { Link } from 'react-router-dom';
import styles from './StudentFetch.module.scss';
import { toast } from 'react-toastify';

const StudentFetch = () => {
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('beez');
    const classOptions = [
        { value: 'beez', label: 'Beez' },
        { value: 'ankur', label: 'Ankur' },
        { value: 'kisholoy', label: 'Kisholoy' },
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
    ];

    const fetchStudents = async () => {
        const response = await fetch(SummaryApi.StudentFetch.url, {
            method: SummaryApi.StudentFetch.method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const result = await response.json();
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        const allStudents = [
            ...result.userBeez,
            ...result.userAnkur,
            ...result.userKisholoy,
            ...result.userC1,
            ...result.userC2,
            ...result.userC3,
            ...result.userC4,
        ];

        setStudents(allStudents.filter(student => student.grade === selectedClass));
    };

    useEffect(() => {
        fetchStudents();
    }, [selectedClass]);

    return (
        <div className={styles.container}>
            <h1>Student List</h1>
            <div>
                <label className={styles.label} htmlFor="class-select">Select Class:</label>
                <select
                    id="class-select"
                    className={styles.select}
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                >
                    {classOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {students.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <Link to={`/student-details/${student._id}`} className={styles.link}>View Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students found for this class.</p>
            )}
        </div>
    );
};

export default StudentFetch;
