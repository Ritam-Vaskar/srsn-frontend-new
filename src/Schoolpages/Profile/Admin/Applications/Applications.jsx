// // import React, { useState, useEffect } from 'react';
// // import styles from './Application.module.scss';
// // import SummaryApi from '../../../../common';
// // import { toast } from 'react-toastify'; 
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import CheckBoxIcon from '@mui/icons-material/CheckBox';

// // const Applications = () => {
// //     const [beez, setBeez] = useState([]);
// //     const [ankur, setAnkur] = useState([]);
// //     const [kisholoy, setKisholoy] = useState([]);
// //     const [c1, setC1] = useState([]);
// //     const [c2, setC2] = useState([]);
// //     const [c3, setC3] = useState([]);
// //     const [c4, setC4] = useState([]);

// //     const fetchUserAdmission = async () => {
// //         const response = await fetch(SummaryApi.UserAdmissionFetch.url, {
// //             method: SummaryApi.UserAdmissionFetch.method,
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             credentials: 'include'
// //         });
// //         const result = await response.json();
// //         console.log(result);
// //         if (!result.success) {
// //             toast.error(result.message);
// //             return;
// //         }
// //         setBeez(result.beezAdmission);
// //         setAnkur(result.ankurAdmission);
// //         setKisholoy(result.kisholoyAdmission);
// //         setC1(result.c1Admission);
// //         setC2(result.c2Admission);
// //         setC3(result.c3Admission);
// //         setC4(result.c4Admission);
// //     }

// //     useEffect(() => {
// //         fetchUserAdmission();
// //     }, []);

// //     const handleDelete = async (id) => {
// //         // Backend API call to delete student
// //         const response = await fetch(SummaryApi.UserAdmissionDelete.url, {
// //             method: SummaryApi.UserAdmissionDelete.method,
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify({ id }),
// //             credentials: 'include'
// //         });
// //         const result = await response.json();
// //         if (result.success) {
// //             toast.success('Student deleted successfully');
// //             fetchUserAdmission();
// //         } else {
// //             toast.error(result.message);
// //         }
// //     };

// //     const handleApp = async (id) => {
// //         const response = await fetch(SummaryApi.userAdmissionAdd.url, {
// //             method: SummaryApi.userAdmissionAdd.method, 
// //             headers: {
// //                 'Content-Type': 'application/json'
// //             },
// //             credentials: 'include',
// //             body: JSON.stringify({ id }) 
// //         });
// //         const result = await response.json();
// //         if (result.success) {
// //             toast.success('Application processed successfully');
// //             fetchUserAdmission();
// //         } else {
// //             toast.error(result.message);
// //         }
// //     };

// //     const renderTable = (className, students) => (
// //         <div className={styles.classTable}>
// //             <h2>{className}</h2>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>Name</th>
// //                         <th>Phone</th>
// //                         <th>Aadhar No</th>
// //                         <th>Payment ID</th>
// //                         <th>Details</th>
// //                         <th>Actions</th> {/* Added Actions column */}
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {students.map((student, index) => (
// //                         <tr key={index}>
// //                             <td>{student.name}</td>
// //                             <td>{student.phone}</td>
// //                             <td>{student.aadharNo}</td>
// //                             <td>{student.paymentId}</td>
// //                             <td>
// //                                 <a href={`/details/${student.id}`}>View Details</a>
// //                             </td>
// //                             <td>
// //                                 <button className={styles.toolbar}onClick={() => handleDelete(student._id)}><CheckBoxIcon/></button>
// //                                 <button className={styles.toolbar}onClick={() => handleApp(student._id)}><DeleteIcon/></button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );

// //     return (
// //         <div>
// //             {renderTable('Beez Class', beez)}
// //             {renderTable('Ankur Class', ankur)}
// //             {renderTable('Kisholoy Class', kisholoy)}
// //             {renderTable('Class 1', c1)}
// //             {renderTable('Class 2', c2)}
// //             {renderTable('Class 3', c3)}
// //             {renderTable('Class 4', c4)}
// //         </div>
// //     );
// // }

// // export default Applications;


// import React, { useState, useEffect } from 'react';
// import styles from './Application.module.scss';
// import SummaryApi from '../../../../common';
// import { toast } from 'react-toastify'; 
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const Applications = () => {
//     const [beez, setBeez] = useState([]);
//     const [ankur, setAnkur] = useState([]);
//     const [kisholoy, setKisholoy] = useState([]);
//     const [c1, setC1] = useState([]);
//     const [c2, setC2] = useState([]);
//     const [c3, setC3] = useState([]);
//     const [c4, setC4] = useState([]);

//     // Fetch user admission data
//     const fetchUserAdmission = async () => {
//         const response = await fetch(SummaryApi.UserAdmissionFetch.url, {
//             method: SummaryApi.UserAdmissionFetch.method,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include'
//         });
//         const result = await response.json();
//         console.log(result);
//         if (!result.success) {
//             toast.error(result.message);
//             return;
//         }
//         setBeez(result.beezAdmission);
//         setAnkur(result.ankurAdmission);
//         setKisholoy(result.kisholoyAdmission);
//         setC1(result.c1Admission);
//         setC2(result.c2Admission);
//         setC3(result.c3Admission);
//         setC4(result.c4Admission);
//     };

//     useEffect(() => {
//         fetchUserAdmission();
//     }, []);

//     // Handle student deletion
//     const handleDelete = async (id) => {
//         const response = await fetch(SummaryApi.UserAdmissionDelete.url, {
//             method: SummaryApi.UserAdmissionDelete.method,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id }),
//             credentials: 'include'
//         });
//         const result = await response.json();
//         if (result.success) {
//             toast.success('Student deleted successfully');
//             fetchUserAdmission();
//         } else {
//             toast.error(result.message);
//         }
//     };

//     // Handle student application processing
//     const handleApp = async (student) => {
//         const response = await fetch(SummaryApi.userAdmissionAdd.url, {
//             method: SummaryApi.userAdmissionAdd.method, 
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             credentials: 'include',
//             body: JSON.stringify({ student }) 
//         });
//         const result = await response.json();
//         if (result.success) {
//             toast.success('Application processed successfully');
//             fetchUserAdmission();
//         } else {
//             toast.error(result.message);
//         }
//     };

//     // Render student table
//     const renderTable = (className, students) => (
//         <div className={styles.classTable}>
//             <h2>{className}</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Phone</th>
//                         <th>Aadhar No</th>
//                         <th>Payment ID</th>
//                         <th>Details</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {students.map((student) => (
//                         <tr key={student._id}>
//                             <td>{student.name}</td>
//                             <td>{student.phone}</td>
//                             <td>{student.aadharNo}</td>
//                             <td>{student.paymentId}</td>
//                             <td>
//                                 <a href={`/details/${student._id}`}>View Details</a>
//                             </td>
//                             <td>
//                                 <button className={styles.actionButton} onClick={() => handleApp(student)}>
//                                     <CheckBoxIcon />
//                                 </button>
//                                 <button className={styles.actionButtonDelete} onClick={() => handleDelete(student._id)}>
//                                     <DeleteIcon />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );

//     return (
//         <div>
//             {renderTable('Beez Class', beez)}
//             {renderTable('Ankur Class', ankur)}
//             {renderTable('Kisholoy Class', kisholoy)}
//             {renderTable('Class 1', c1)}
//             {renderTable('Class 2', c2)}
//             {renderTable('Class 3', c3)}
//             {renderTable('Class 4', c4)}
//         </div>
//     );
// }

// export default Applications;


import React, { useState, useEffect } from 'react';
import styles from './Application.module.scss';
import SummaryApi from '../../../../common';
import { toast } from 'react-toastify'; 
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Applications = () => {
    const [beez, setBeez] = useState([]);
    const [ankur, setAnkur] = useState([]);
    const [kisholoy, setKisholoy] = useState([]);
    const [c1, setC1] = useState([]);
    const [c2, setC2] = useState([]);
    const [c3, setC3] = useState([]);
    const [c4, setC4] = useState([]);
    const [selectedClass, setSelectedClass] = useState('Beez Class');

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
        console.log(result);
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

    // Render student table
    const renderTable = (className, students) => (
        <div className={styles.classTable}>
            <h2>{className}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Aadhar No</th>
                        <th>Payment ID</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.phone}</td>
                            <td>{student.aadharNo}</td>
                            <td>{student.paymentId}</td>
                            <td>
                                <a href={`/details/${student._id}`}>View Details</a>
                            </td>
                            <td id='action'>
                                <button className={styles.actionButton} onClick={() => handleApp(student)}>
                                    <CheckBoxIcon />
                                </button>
                                <button className={styles.actionButtonDelete} onClick={() => handleDelete(student._id)}>
                                    <DeleteIcon />
                                </button>
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
            default: return null;
        }
    };

    return (
        <div>
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
                </select>
            </div>
            {getSelectedClassData()}
        </div>
    );
}

export default Applications;
