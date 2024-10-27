import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import StudentDetailsPopup from '../StudentDetailsPopup/StudentDetailsPopup';
import styles from './styles/StudentDetails.module.scss';

const StudentFetch = ({ isAdmin }) => { // Add isAdmin prop
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('beez');
    const [selectedStudent, setSelectedStudent] = useState(null);

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

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(`${SummaryApi.StudentFetch.url}/${studentId}`, {
                method: 'DELETE',
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
            setStudents(students.filter(student => student._id !== studentId)); // Update state after deletion
            toast.success('Student deleted successfully.');
        } catch (error) {
            toast.error('Failed to delete student.');
        }
    };

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
                            {isAdmin && <th>Actions</th>} {/* Only show Actions column for admin */}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <button onClick={() => setSelectedStudent(student)} className={styles.link}>
                                        View Details
                                    </button>
                                </td>
                                {isAdmin && (
                                    <td>
                                        <button 
                                            onClick={() => handleDeleteStudent(student._id)} 
                                            className={styles.deleteButton}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students found for this class.</p>
            )}
            {selectedStudent && (
                <StudentDetailsPopup
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
};

export default StudentFetch;
