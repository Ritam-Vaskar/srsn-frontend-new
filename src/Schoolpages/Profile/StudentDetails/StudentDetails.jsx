
// import React, { useState, useEffect } from 'react';
// import SummaryApi from '../../../common';
// import { toast } from 'react-toastify';
// import StudentDetailsPopup from '../StudentDetailsPopup/StudentDetailsPopup';
// import styles from './styles/StudentDetails.module.scss';
// import { useSelector } from 'react-redux';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// const StudentFetch = () => { 
//     const user = useSelector(state => state?.user?.user);
//     const [students, setStudents] = useState([]);
//     const [selectedClass, setSelectedClass] = useState('beez');
//     const [selectedStudent, setSelectedStudent] = useState(null);

//     // Determine if user is admin using regex
//     const isAdmin = user.role && /admin/i.test(user.role);

//     const classOptions = [
//         { value: 'beez', label: 'Beez' },
//         { value: 'ankur', label: 'Ankur' },
//         { value: 'kisholoy', label: 'Kisholoy' },
//         { value: '1', label: 'Class 1' },
//         { value: '2', label: 'Class 2' },
//         { value: '3', label: 'Class 3' },
//         { value: '4', label: 'Class 4' },
//     ];

//     const fetchStudents = async () => {
//         const response = await fetch(SummaryApi.StudentFetch.url, {
//             method: SummaryApi.StudentFetch.method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//         });
//         const result = await response.json();
//         if (!result.success) {
//             toast.error(result.message);
//             return;
//         }
//         const allStudents = [
//             ...result.userBeez,
//             ...result.userAnkur,
//             ...result.userKisholoy,
//             ...result.userC1,
//             ...result.userC2,
//             ...result.userC3,
//             ...result.userC4,
//         ];

//         setStudents(allStudents.filter(student => student.grade === selectedClass));
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, [selectedClass]);

//     const handleDeleteStudent = async (studentId) => {
//         try {
//             const response = await fetch(`${SummaryApi.UserDelete.url}/${studentId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             const result = await response.json();
//             if (!result.success) {
//                 toast.error(result.message);
//                 return;
//             }
//             setStudents(students.filter(student => student._id !== studentId)); // Update state after deletion
//             toast.success('Student deleted successfully.');
//         } catch (error) {
//             toast.error('Failed to delete student.');
//         }
//     };

//     const handleUpdateStudent = (student) => {
//         // Implement update functionality here
//         console.log('Update student:', student);
//     };

//     return (
//         <div className={styles.container}>
//             <h1>Student List</h1>
//             <div style={{ overflow: 'auto' }}>
//                 <label className={styles.label} htmlFor="class-select">Select Class:</label>
//                 <select
//                     id="class-select"
//                     className={styles.select}
//                     value={selectedClass}
//                     onChange={e => setSelectedClass(e.target.value)}
//                 >
//                     {classOptions.map(option => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             {students.length > 0 ? (
//                 <table className={styles.table}>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone Number</th>
//                             <th>Details</th>
//                             {isAdmin && <th>Actions</th>} {/* Only show Actions column for admin */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {students.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>{student.email}</td>
//                                 <td>{student.phone}</td>
//                                 <td>
//                                     <button onClick={() => setSelectedStudent(student)} className={styles.link}>
//                                         View Details
//                                     </button>
//                                 </td>
//                                 {isAdmin && (
//                                     <td>
//                                         <button 
//                                             onClick={() => handleUpdateStudent(student)} 
//                                             className={styles.updateButton} // Add CSS for update button
//                                         >
//                                             <EditIcon/>
//                                         </button>
//                                         <button 
//                                             onClick={() => handleDeleteStudent(student._id)} 
//                                             className={styles.deleteButton}
//                                         >
//                                             <DeleteForeverIcon/>
//                                         </button>
//                                     </td>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : (
//                 <p>No students found for this class.</p>
//             )}
//             {selectedStudent && (
//                 <StudentDetailsPopup
//                     student={selectedStudent}
//                     onClose={() => setSelectedStudent(null)}
//                 />
//             )}
//         </div>
//     );
// };

// export default StudentFetch;



import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';
import StudentDetailsPopup from '../StudentDetailsPopup/StudentDetailsPopup';
import StudentEditPopup from '../Admin/StudentEditPopup/StudentEditPopup';
import styles from './styles/StudentDetails.module.scss';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StudentFetch = () => {
    const user = useSelector(state => state?.user?.user);
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('beez');
    const [selectedStudent, setSelectedStudent] = useState(null);

    // Determine if user is admin using regex
    const isAdmin = user.role && /admin/i.test(user.role);

    // Updated class options to include grades 5 to 8
    const classOptions = [
        { value: 'beez', label: 'Beez' },
        { value: 'ankur', label: 'Ankur' },
        { value: 'kisholoy', label: 'Kisholoy' },
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
        { value: '5', label: 'Class 5' },  // Added grade 5
        { value: '6', label: 'Class 6' },  // Added grade 6
        { value: '7', label: 'Class 7' },  // Added grade 7
        { value: '8', label: 'Class 8' },  // Added grade 8
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

        // Log the response to ensure the data is as expected
        console.log("Backend Response:", result);

        const allStudents = [
            ...result.userBeez,
            ...result.userAnkur,
            ...result.userKisholoy,
            ...result.userC1,
            ...result.userC2,
            ...result.userC3,
            ...result.userC4,
            ...result.userC5,
            ...result.userC6,
            ...result.userC7,
            ...result.userC8,
        ];

        // Filter students based on the selected class, normalizing values to avoid case/space issues
        setStudents(allStudents.filter(student =>
            student.grade.trim().toLowerCase() === selectedClass.trim().toLowerCase()
        ));
    };

    useEffect(() => {
        fetchStudents();  // Fetch students whenever selectedClass changes
    }, [selectedClass]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [stuudentView, setStudentView] = useState(false);

    const handleDeleteStudent = async (studentId) => {
        try {
            const response = await fetch(`${SummaryApi.UserDelete.url}/${studentId}`, {
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

    const handleUpdateStudent = (student) => {
        // Implement update functionality here
        console.log('Update student:', student);
        setSelectedStudent(student);
        setEditModalOpen(true);
    };

    const handleViewStudent = (student) => {
        // Implement update functionality here
        console.log('View student:', student);
        setSelectedStudent(student);
        setStudentView(true);
    };

    return (
        <div className={styles.container}>
            <h1>Student List</h1>
            <div style={{ overflow: 'auto' }}>
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
                            <th>Serial Number</th>
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
                                <td>{students.indexOf(student) + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <button onClick={() => handleViewStudent(student)} className={styles.link}>
                                        View Details
                                    </button>
                                </td>
                                {isAdmin && (
                                    <td>
                                        <button
                                            onClick={() => handleUpdateStudent(student)}
                                            className={styles.updateButton} // Add CSS for update button
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteStudent(student._id)}
                                            className={styles.deleteButton}
                                        >
                                            <DeleteForeverIcon />
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
            {stuudentView && (
                <StudentDetailsPopup
                    student={selectedStudent}
                    onClose={() => setStudentView(false)}
                />
            )}
            {editModalOpen && (
                <StudentEditPopup
                    student={selectedStudent}
                    onClose={() => setEditModalOpen(false)}
                    onUpdate={() => {
                        setEditModalOpen(false);
                        fetchStudents();
                    }}
                    model="User"
                />
            )}
        </div>
    );
};

export default StudentFetch;
