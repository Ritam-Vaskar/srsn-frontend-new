// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import TeacherCard from '../../../../components/TeacherCard/TeacherCard';
// import SummaryApi from '../../../../common';
// import styles from './styles/Teachers.module.scss';

// const Teachers = () => {
//     const [teachers, setTeachers] = useState([]);

//     // Fetch teachers on component mount
//     useEffect(() => {
//         fetchTeachers();
//     }, []);

//     // Fetch teachers from the backend
//     const fetchTeachers = async () => {
//         try {
//             const response = await fetch(SummaryApi.TeacherFetch.url, {
//                 method: SummaryApi.TeacherFetch.method,
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const result = await response.json();
//             if (!result.success) {
//                 toast.error(result.message);
//                 return;
//             }
//             setTeachers(result.teacher);
//         } catch (err) {
//             toast.error(err.message);
//         }
//     };

//     // Handle deleting a teacher
//     const handleDelete = async (teacherId) => {
//         try {
//             const response = await fetch(`${SummaryApi.UserDelete.url}/${teacherId}`, {
//                 method: SummaryApi.UserDelete.method, // DELETE method
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
//             const result = await response.json();
//             if (result.success) {
//                 toast.success("Teacher deleted successfully!");
//                 setTeachers(prev => prev.filter(teacher => teacher._id !== teacherId));
//             } else {
//                 toast.error(result.message || "Failed to delete teacher.");
//             }
//         } catch (error) {
//             console.error("Error deleting teacher:", error);
//             toast.error("Error deleting teacher.");
//         }
//     };

//     return (
//         <div className={styles.teachersPanel}>
//             <h2>Teachers Management</h2>
//             <div className={styles.teachersList}>
//                 {teachers.map(teacher => (
//                     <div key={teacher._id} className={styles.teacherCardContainer}>
//                         <TeacherCard teacher={teacher} />
//                         <div className={styles.actionButtons}>
//                             <button 
//                                 onClick={() => handleDelete(teacher._id)} 
//                                 className={styles.deleteButton}>
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Teachers;


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TeacherCard from '../../../../components/TeacherCard/TeacherCard';
import SummaryApi from '../../../../common';
import TeacherAddForm from '../../../../components/TeacherAdd/TeacherAdd'; // Import the TeacherAddForm
import styles from './styles/Teachers.module.scss';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isAddTeacherFormOpen, setIsAddTeacherFormOpen] = useState(false); // State for form visibility

    // Fetch teachers on component mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    // Fetch teachers from the backend
    const fetchTeachers = async () => {
        try {
            const response = await fetch(SummaryApi.TeacherFetch.url, {
                method: SummaryApi.TeacherFetch.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            setTeachers(result.teacher);
        } catch (err) {
            toast.error(err.message);
        }
    };

    // Handle deleting a teacher
    const handleDelete = async (teacherId) => {
        try {
            const response = await fetch(`${SummaryApi.UserDelete.url}/${teacherId}`, {
                method: SummaryApi.UserDelete.method, // DELETE method
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const result = await response.json();
            if (result.success) {
                toast.success("Teacher deleted successfully!");
                setTeachers(prev => prev.filter(teacher => teacher._id !== teacherId));
            } else {
                toast.error(result.message || "Failed to delete teacher.");
            }
        } catch (error) {
            console.error("Error deleting teacher:", error);
            toast.error("Error deleting teacher.");
        }
    };

    return (
        <div className={styles.teachersPanel}>
            <h2>Teachers Management</h2>
            <button 
                onClick={() => setIsAddTeacherFormOpen(true)} 
                className={styles.addTeacherButton}>
                Add Teacher
            </button>

            {/* Conditionally render the TeacherAddForm */}
            {isAddTeacherFormOpen && (
                <TeacherAddForm onClose={() => setIsAddTeacherFormOpen(false)} />
            )}

            <div className={styles.teachersList}>
                {teachers.map(teacher => (
                    <div key={teacher._id} className={styles.teacherCardContainer}>
                        <TeacherCard teacher={teacher} />
                        <div className={styles.actionButtons}>
                            <button 
                                onClick={() => handleDelete(teacher._id)} 
                                className={styles.deleteButton}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teachers;
