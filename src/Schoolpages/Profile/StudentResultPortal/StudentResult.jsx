// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import subjectOptions from './../../../helper/classSubject';
// import styles from './StudentResult.module.scss';
// import Spinner from '../../../layouts/Loader/Spinner';

// const StudentResult = () => {
//     const user = useSelector(state => state?.user?.user);
//     const [selectedSemester, setSelectedSemester] = useState('firstSem');

//     if (!user) return <div><Spinner/></div>;

//     const subjects = subjectOptions[user.grade] || [];
//     const semesterMarks = user[selectedSemester] || {};

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.header}>Welcome to the Result Portal, {user.name}</h2>
//             <p>Your rank is {user.result}</p>
//             <label htmlFor="semester" className={styles.label}>Select Semester:</label>
//             <select
//                 id="semester"
//                 value={selectedSemester}
//                 onChange={(e) => setSelectedSemester(e.target.value)}
//                 className={styles.dropdown}
//             >
//                 <option value="firstSem">First Semester</option>
//                 <option value="secondSem">Second Semester</option>
//                 <option value="endSem">End Semester</option>
//             </select>

//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <th>Subject</th>
//                         <th>Marks</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {subjects.map((subject) => (
//                         <tr key={subject}>
//                             <td>{subject}</td>
//                             <td>{semesterMarks[subject] || 'N/A'}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

            
//         </div>
//     );
// };

// export default StudentResult;


import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import subjectOptions from './../../../helper/classSubject';
import styles from './StudentResult.module.scss';
import Spinner from '../../../layouts/Loader/Spinner';

const StudentResult = () => {
    const user = useSelector((state) => state?.user?.user);
    const [selectedSemester, setSelectedSemester] = useState('firstSem');

    if (!user) return <div><Spinner /></div>;

    const subjects = subjectOptions[user.grade] || [];
    const semesterMarks = user[selectedSemester] || {};

    // Calculate total marks
    const totalMarks = Object.values(semesterMarks)
        .filter((mark) => !isNaN(mark)) // Filter out non-numeric or 'N/A' values
        .reduce((sum, mark) => sum + Number(mark), 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Welcome to the Result Portal, {user.name}</h2>
            <p>Your rank is {user.result}</p>
            <label htmlFor="semester" className={styles.label}>Select Semester:</label>
            <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className={styles.dropdown}
            >
                <option value="firstSem">First Semester</option>
                <option value="secondSem">Second Semester</option>
                <option value="endSem">End Semester</option>
            </select>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject}>
                            <td>{subject}</td>
                            <td>{semesterMarks[subject] || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>{totalMarks}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default StudentResult;
