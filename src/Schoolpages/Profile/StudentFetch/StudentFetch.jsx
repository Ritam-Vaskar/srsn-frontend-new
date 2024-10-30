// import React, { useState, useEffect } from 'react';
// import SummaryApi from '../../../common';
// import styles from './StudentFetch.module.scss';
// import { toast } from 'react-toastify';
// import SubjectOptions from '../../../helper/classSubject';

// const StudentFetch = () => {
//     const [students, setStudents] = useState([]);
//     const [selectedClass, setSelectedClass] = useState('beez');
//     const [selectedSubject, setSelectedSubject] = useState('');
//     const [marks, setMarks] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');


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
//         setLoading(true);
//         setError('');
//         try {
//             const response = await fetch(SummaryApi.StudentFetch.url, {
//                 method: SummaryApi.StudentFetch.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             const result = await response.json();
//             if (!result.success) {
//                 toast.error(result.message);
//                 setError(result.message);
//                 return;
//             }

//             const allStudents = [
//                 ...result.userBeez,
//                 ...result.userAnkur,
//                 ...result.userKisholoy,
//                 ...result.userC1,
//                 ...result.userC2,
//                 ...result.userC3,
//                 ...result.userC4,
//             ];
//             const filteredStudents = allStudents.filter(student => student.grade === selectedClass);
//             setStudents(filteredStudents);

//             // Initialize marks state with the current marks for the selected subject if available
//             const initialMarks = {};
//             filteredStudents.forEach(student => {
//                 initialMarks[student._id] = student.marks?.[selectedSubject] || '';
//             });
//             setMarks(initialMarks);
//         } catch (err) {
//             setError('Failed to fetch students. Please try again later.');
//             toast.error('Failed to fetch students');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, [selectedClass, selectedSubject]);

//     const handleMarksChange = (studentId, value) => {
//         if (value < 0 || value > 100) {
//             toast.warning('Please enter marks between 0 and 100');
//             return;
//         }
//         setMarks(prev => ({ ...prev, [studentId]: value }));
//     };

//     const handleSaveMarks = async () => {
//         if (!selectedSubject) {
//             toast.error('Please select a subject before saving marks.');
//             return;
//         }

//         // Only include students who have a mark entered or existing marks to avoid setting default 0s
//         const marksPayload = students
//             .filter((student) => marks[student._id] !== undefined) // only include students with marks
//             .map((student) => ({
//                 student_id: student._id,
//                 subjectName: selectedSubject,
//                 Marks: marks[student._id] || student.marks?.[selectedSubject], // use existing marks if already present
//             }));

//         console.log("Submitting marks payload:", marksPayload);

//         try {
//             const response = await fetch(SummaryApi.UserMarksSubmission.url, {
//                 method: SummaryApi.UserMarksSubmission.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(marksPayload),
//                 credentials: 'include',
//             });

//             const result = await response.json();

//             if (!result.success) {
//                 toast.error(result.message);
//                 return;
//             }

//             toast.success('Marks saved successfully!');
//         } catch (err) {
//             console.error("Error saving marks:", err);
//             toast.error('Failed to save marks. Please try again later.');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h1>Student List and Marks Entry</h1>
//             <label>Class:</label>
//             <select className={styles.select} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
//                 {classOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                 ))}
//             </select>

//             <label>Subject:</label>
//             <select className={styles.select} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
//                 <option value="" disabled>
//                     Select Subject
//                 </option>
//                 {SubjectOptions[selectedClass]?.map((sub) => (
//                     <option key={sub} value={sub}>
//                         {sub}
//                     </option>
//                 ))}
//             </select>

//             {loading ? (
//                 <p>Loading students...</p>
//             ) : error ? (
//                 <p className={styles.error}>{error}</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr><th>Name</th><th>Marks</th></tr>
//                     </thead>
//                     <tbody>
//                         {students.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         // value={student.subjects?.[selectedSubject] ?? ''}
//                                         onChange={e => handleMarksChange(student._id, e.target.value)}
//                                         min="0"
//                                         max="100"
//                                         placeholder={`${student.subjects?.[selectedSubject] || 0}`}
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             <button onClick={handleSaveMarks} className={styles.saveButton}>Save Marks</button>
//         </div>
//     );
// };

// export default StudentFetch;




// import React, { useState, useEffect } from 'react';
// import SummaryApi from '../../../common';
// import styles from './StudentFetch.module.scss';
// import { toast } from 'react-toastify';
// import SubjectOptions from '../../../helper/classSubject';

// const StudentFetch = () => {
//     const [students, setStudents] = useState([]);
//     const [selectedClass, setSelectedClass] = useState('beez');
//     const [selectedSemester, setSelectedSemester] = useState('firstSem');
//     const [selectedSubject, setSelectedSubject] = useState('');
//     const [marks, setMarks] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const classOptions = [
//         { value: 'beez', label: 'Beez' },
//         { value: 'ankur', label: 'Ankur' },
//         { value: 'kisholoy', label: 'Kisholoy' },
//         { value: '1', label: 'Class 1' },
//         { value: '2', label: 'Class 2' },
//         { value: '3', label: 'Class 3' },
//         { value: '4', label: 'Class 4' },
//     ];

//     const semesterOptions = [
//         { value: 'firstSem', label: 'First Semester' },
//         { value: 'secondSem', label: 'Second Semester' },
//         { value: 'endSem', label: 'End Semester' },
//     ];

//     const fetchStudents = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await fetch(SummaryApi.StudentFetch.url, {
//                 method: SummaryApi.StudentFetch.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//             });
//             const result = await response.json();
//             if (!result.success) {
//                 toast.error(result.message);
//                 setError(result.message);
//                 return;
//             }

//             const allStudents = [
//                 ...result.userBeez,
//                 ...result.userAnkur,
//                 ...result.userKisholoy,
//                 ...result.userC1,
//                 ...result.userC2,
//                 ...result.userC3,
//                 ...result.userC4,
//             ];
//             const filteredStudents = allStudents.filter(student => student.grade === selectedClass);
//             setStudents(filteredStudents);

//             const initialMarks = {};
//             filteredStudents.forEach(student => {
//                 initialMarks[student._id] = student[selectedSemester]?.[selectedSubject] || '';
//             });
//             setMarks(initialMarks);
//         } catch (err) {
//             setError('Failed to fetch students. Please try again later.');
//             toast.error('Failed to fetch students');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchStudents();
//     }, [selectedClass, selectedSemester, selectedSubject]);

//     const handleMarksChange = (studentId, value) => {
//         if (value < 0 || value > 100) {
//             toast.warning('Please enter marks between 0 and 100');
//             return;
//         }
//         setMarks(prev => ({ ...prev, [studentId]: value }));
//     };

//     const handleSaveMarks = async () => {
//         if (!selectedSubject) {
//             toast.error('Please select a subject before saving marks.');
//             return;
//         }

//         const marksPayload = students
//             .filter(student => marks[student._id] !== undefined)
//             .map(student => ({
//                 student_id: student._id,
//                 semester: selectedSemester,
//                 subject: selectedSubject,
//                 marks: marks[student._id] || student[selectedSemester]?.[selectedSubject],
//             }));

//         try {
//             const response = await fetch(SummaryApi.UserMarksSubmission.url, {
//                 method: SummaryApi.UserMarksSubmission.method,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(marksPayload),
//                 credentials: 'include',
//             });

//             const result = await response.json();

//             if (!result.success) {
//                 toast.error(result.message);
//                 return;
//             }

//             toast.success('Marks saved successfully!');
//         } catch (err) {
//             console.error("Error saving marks:", err);
//             toast.error('Failed to save marks. Please try again later.');
//         }
//     };

//     return (
//         <div className={styles.container}>
//             <h1>Student List and Marks Entry</h1>
//             <label>Class:</label>
//             <select className={styles.select} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
//                 {classOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                 ))}
//             </select>

//             <label>Semester:</label>
//             <select className={styles.select} value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
//                 {semesterOptions.map(option => (
//                     <option key={option.value} value={option.value}>{option.label}</option>
//                 ))}
//             </select>

//             <label>Subject:</label>
//             <select className={styles.select} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
//                 <option value="" disabled>
//                     Select Subject
//                 </option>
//                 {SubjectOptions[selectedClass]?.[selectedSemester]?.map((sub) => (
//                     <option key={sub} value={sub}>
//                         {sub}
//                     </option>
//                 ))}
//             </select>

//             {loading ? (
//                 <p>Loading students...</p>
//             ) : error ? (
//                 <p className={styles.error}>{error}</p>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr><th>Name</th><th>Marks</th></tr>
//                     </thead>
//                     <tbody>
//                         {students.map(student => (
//                             <tr key={student._id}>
//                                 <td>{student.name}</td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         onChange={e => handleMarksChange(student._id, e.target.value)}
//                                         min="0"
//                                         max="100"
//                                         placeholder={`${student[selectedSemester]?.[selectedSubject] || 0}`}
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             <button onClick={handleSaveMarks} className={styles.saveButton}>Save Marks</button>
//         </div>
//     );
// };

// export default StudentFetch;



import React, { useState, useEffect } from 'react';
import SummaryApi from '../../../common';
import styles from './StudentFetch.module.scss';
import { toast } from 'react-toastify';
import subjectOptions from '../../../helper/classSubject';

const StudentFetch = () => {
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('beez');
    const [selectedSemester, setSelectedSemester] = useState('firstSem');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [marks, setMarks] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const classOptions = [
        { value: 'beez', label: 'Beez' },
        { value: 'ankur', label: 'Ankur' },
        { value: 'kisholoy', label: 'Kisholoy' },
        { value: '1', label: 'Class 1' },
        { value: '2', label: 'Class 2' },
        { value: '3', label: 'Class 3' },
        { value: '4', label: 'Class 4' },
    ];

    const semesterOptions = [
        { value: 'firstSem', label: 'First Semester' },
        { value: 'secondSem', label: 'Second Semester' },
        { value: 'endSem', label: 'End Semester' },
    ];

    const fetchStudents = async () => {
        setLoading(true);
        setError('');
        try {
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
                setError(result.message);
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
            const filteredStudents = allStudents.filter(student => student.grade === selectedClass);
            setStudents(filteredStudents);

            const initialMarks = {};
            filteredStudents.forEach(student => {
                initialMarks[student._id] = student.marks?.[selectedSubject] || '';
            });
            setMarks(initialMarks);
        } catch (err) {
            setError('Failed to fetch students. Please try again later.');
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [selectedClass, selectedSemester, selectedSubject]);

    const handleMarksChange = (studentId, value) => {
        if (value < 0 || value > 100) {
            toast.warning('Please enter marks between 0 and 100');
            return;
        }
        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    const handleSaveMarks = async () => {
        if (!selectedSubject) {
            toast.error('Please select a subject before saving marks.');
            return;
        }

        const marksPayload = students
            .filter((student) => marks[student._id] !== undefined)
            .map((student) => ({
                student_id: student._id,
                semester: selectedSemester,
                subject: selectedSubject,
                marks: marks[student._id] || student.marks?.[selectedSubject],
            }));

        console.log("Submitting marks payload:", marksPayload);

        try {
            const response = await fetch(SummaryApi.UserMarksSubmission.url, {
                method: SummaryApi.UserMarksSubmission.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(marksPayload),
                credentials: 'include',
            });

            const result = await response.json();

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success('Marks saved successfully!');
        } catch (err) {
            console.error("Error saving marks:", err);
            toast.error('Failed to save marks. Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Student List and Marks Entry</h1>
            <label>Class:</label>
            <select className={styles.select} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                {classOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            <label>Semester:</label>
            <select className={styles.select} value={selectedSemester} onChange={e => setSelectedSemester(e.target.value)}>
                {semesterOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>

            <label>Subject:</label>
            <select className={styles.select} value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <option value="" disabled>Select Subject</option>
                {subjectOptions[selectedClass]?.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>

            {loading ? (
                <p>Loading students...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr><th>Name</th><th>Marks</th></tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={marks[student._id] || ''}
                                        onChange={e => handleMarksChange(student._id, e.target.value)}
                                        min="0"
                                        max="100"
                                        placeholder={`${student[selectedSemester]?.[selectedSubject] || 0}`}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}

            <button onClick={handleSaveMarks} className={styles.saveButton}>Save Marks</button>
        </div>
    );
};

export default StudentFetch;
