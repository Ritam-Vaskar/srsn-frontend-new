import React, { useState, useEffect } from 'react';
import styles from './Application.module.scss';
import StudentDetailsPopup from '../../StudentDetailsPopup/StudentDetailsPopup';
import StudentEditPopup from '../StudentEditPopup/StudentEditPopup';
import SummaryApi from '../../../../common';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';

const Applications = () => {
    const [beez, setBeez] = useState([]);
    const [ankur, setAnkur] = useState([]);
    const [kisholoy, setKisholoy] = useState([]);
    const [c1, setC1] = useState([]);
    const [c2, setC2] = useState([]);
    const [c3, setC3] = useState([]);
    const [c4, setC4] = useState([]);
    const [c5, setC5] = useState([]);
    const [c6, setC6] = useState([]);
    const [c7, setC7] = useState([]);
    const [c8, setC8] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Beez Class');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [studentRanks, setStudentRanks] = useState([]);
    const [showActionButtons, setShowActionButtons] = useState(false); //for on off action button

    // Fetch user admission data
    const fetchUserAdmission = async () => {
        const response = await fetch(SummaryApi.UserAdmissionFetch.url, {
            method: SummaryApi.UserAdmissionFetch.method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const result = await response.json();
        if (!result.success) {
            toast.error(result.message);
            return;
        }
        setBeez(result.beezAdmission);
        setAnkur(result.ankurAdmission);
        setKisholoy(result.kisholoyAdmission);
        setC1(result.c1Admission);
        setC2(result.c2Admission);
        setC3(result.c3Admission);
        setC4(result.c4Admission);
        setC5(result.c5Admission);
        setC6(result.c6Admission);
        setC7(result.c7Admission);
        setC8(result.c8Admission);

        const allStudents = [
            ...result.beezAdmission,
            ...result.ankurAdmission,
            ...result.kisholoyAdmission,
            ...result.c1Admission,
            ...result.c2Admission,
            ...result.c3Admission,
            ...result.c4Admission,
            ...result.c5Admission,
            ...result.c6Admission,
            ...result.c7Admission,
            ...result.c8Admission,
        ];
        setStudentRanks(allStudents.map(student => ({ _id: student._id, rank: '' })));
    };

    useEffect(() => {
        fetchUserAdmission();
    }, []);

    // Handle student deletion
    const handleDelete = async (id) => {
        const response = await fetch(SummaryApi.UserAdmissionDelete.url, {
            method: SummaryApi.UserAdmissionDelete.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
            credentials: 'include'
        });
        const result = await response.json();
        if (result.success) {
            toast.success('Student deleted successfully');
            fetchUserAdmission();
        } else {
            toast.error(result.message);
        }
    };

    // Handle student application processing
    const handleApp = async (student) => {
        const response = await fetch(SummaryApi.userAdmissionAdd.url, {
            method: SummaryApi.userAdmissionAdd.method,
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ student })
        });
        const result = await response.json();
        if (result.success) {
            toast.success('Application processed successfully');
            fetchUserAdmission();
        } else {
            toast.error(result.message);
        }
    };

    // Handle opening the details popup
    const handlePopup = (student) => {
        setSelectedStudent(student);
        setIsPopupOpen(true);
    };

    // Handle opening the edit popup
    const handleEditStudentPopup = (student) => {
        setSelectedStudent(student);
        setIsEditPopupOpen(true);
    };

    // Handle rank change
    const handleRankChange = (studentId, rank) => {
        setStudentRanks(prevRanks =>
            prevRanks.map(s =>
                s._id === studentId ? { ...s, rank } : s
            )
        );
    };

    // Handle rank submission
    const handleSubmitRanks = async () => {
        const newStudentRanks = studentRanks.filter(s => s.rank !== '');
        try {
            const response = await fetch(SummaryApi.userAdmissionAddArray.url, {
                method: SummaryApi.userAdmissionAddArray.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ studentRanks: newStudentRanks })
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Ranks submitted successfully');
                fetchUserAdmission();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    // Render student table
    const renderTable = (className, students) => (
        <div className={styles.classTable}>
             <div className={styles.toggleContainer}>
                <label htmlFor="toggleButtons">Show Action Buttons:</label>
                <input
                    type="checkbox"
                    id="toggleButtons"
                    checked={showActionButtons}
                    onChange={(e) => setShowActionButtons(e.target.checked)}
                />
            </div>
            <h2>{className}</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Aadhar No</th>
                        <th>Payment ID</th>
                        <th>Details</th>
                        <th>Actions</th>
                        <th>Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{students.indexOf(student) + 1}</td>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.aadharNo}</td>
                            <td>{student.paymentId}</td>
                            <td>
                                <button className={styles.viewDetailsButton} onClick={() => handlePopup(student)}>
                                    View
                                </button>
                            </td>
                         
                            <td id="action" className={styles.action}>
                                {showActionButtons && (
                                    <>
                                        <button
                                            className={styles.actionButton}
                                            onClick={() => handleApp(student)}
                                        >
                                            <CheckBoxIcon />
                                        </button>
                                        <button
                                            className={styles.actionButtonDelete}
                                            onClick={() => handleDelete(student._id)}
                                        >
                                            <DeleteIcon />
                                        </button>
                                    </>
                                )}
                                <button
                                    className={styles.actionButtonEdit}
                                    onClick={() => handleEditStudentPopup(student)}
                                >
                                    <EditIcon />
                                </button>
                            </td>
                            <td>
                                <input className={styles.rankInput}
                                    type="number"
                                    placeholder="Rank"
                                    value={
                                        studentRanks.find(s => s._id === student._id)?.rank || ''
                                    }
                                    onChange={(e) => handleRankChange(student._id, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Get selected class data
    const getSelectedClassData = () => {
        switch (selectedClass) {
            case 'Beez Class': return renderTable('Beez Class', beez);
            case 'Ankur Class': return renderTable('Ankur Class', ankur);
            case 'Kisholoy Class': return renderTable('Kisholoy Class', kisholoy);
            case 'Class 1': return renderTable('Class 1', c1);
            case 'Class 2': return renderTable('Class 2', c2);
            case 'Class 3': return renderTable('Class 3', c3);
            case 'Class 4': return renderTable('Class 4', c4);
            case 'Class 5': return renderTable('Class 5', c5);
            case 'Class 6': return renderTable('Class 6', c6);
            case 'Class 7': return renderTable('Class 7', c7);
            case 'Class 8': return renderTable('Class 8', c8);
            default: return null;
        }
    };

    return (
        <div>
            <center><div className={styles.totalCount}>
                <p><strong>Total Students:</strong> {beez.length + ankur.length + kisholoy.length + c1.length + c2.length + c3.length + c4.length + c5.length + c6.length + c7.length + c8.length}</p>
            </div></center>
            <div className={styles.dropdownContainer}>
                <label htmlFor="classDropdown">Select Class:</label>
                <select
                    id="classDropdown"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className={styles.dropdown}
                >
                    <option value="Beez Class">Beez Class</option>
                    <option value="Ankur Class">Ankur Class</option>
                    <option value="Kisholoy Class">Kisholoy Class</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                </select>
            </div>

            {getSelectedClassData()}
            {isPopupOpen && (
                <StudentDetailsPopup
                    student={selectedStudent}
                    onClose={() => setIsPopupOpen(false)}
                />
            )}

            {isEditPopupOpen && (
                <StudentEditPopup
                    student={selectedStudent}
                    onClose={() => setIsEditPopupOpen(false)}
                    onUpdate={() => {
                        setIsEditPopupOpen(false);
                        fetchUserAdmission();
                    }}
                    model="UserAdmission"
                />
            )}

            <div className={styles.submitButtonContainer}>
                <button className={styles.submitButton} onClick={handleSubmitRanks}>
                    Submit All Ranks
                </button>
            </div>
        </div>
    );
};

export default Applications;
