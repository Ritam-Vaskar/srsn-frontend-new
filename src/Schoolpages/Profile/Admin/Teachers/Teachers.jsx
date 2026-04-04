
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TeacherCard from '../../../../components/TeacherCard/TeacherCard';
import SummaryApi from '../../../../common';
import TeacherAddForm from '../../../../components/TeacherAdd/TeacherAdd'; // Import the TeacherAddForm
import TeacherEditPopup from './TeacherEditPopup';
import styles from './styles/Teachers.module.scss';
import { makeAuthenticatedRequest } from '../../../../helper/tokenManager';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isAddTeacherFormOpen, setIsAddTeacherFormOpen] = useState(false); // State for form visibility
    const [isEditTeacherFormOpen, setIsEditTeacherFormOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    // Fetch teachers on component mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    // Fetch teachers from the backend
    const fetchTeachers = async () => {
        try {
            const response = await makeAuthenticatedRequest(SummaryApi.TeacherFetch.url, {
                method: SummaryApi.TeacherFetch.method
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
            const response = await makeAuthenticatedRequest(`${SummaryApi.UserDelete.url}/${teacherId}`, {
                method: SummaryApi.UserDelete.method // DELETE method
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

    const handleEditClick = (teacher) => {
        setSelectedTeacher(teacher);
        setIsEditTeacherFormOpen(true);
    };

    const handleCloseEditPopup = () => {
        setIsEditTeacherFormOpen(false);
        setSelectedTeacher(null);
    };

    return (
        <div className={styles.teachersPanel}>
            <h2>Teachers Management</h2>
            <center><button 
                onClick={() => setIsAddTeacherFormOpen(true)} 
                className={styles.addTeacherButton}>
                Add Teacher
            </button></center>

            {/* Conditionally render the TeacherAddForm */}
            {isAddTeacherFormOpen && (
                <TeacherAddForm fetchTeachers={fetchTeachers} onClose={() => setIsAddTeacherFormOpen(false)} />
            )}

            {isEditTeacherFormOpen && selectedTeacher && (
                <TeacherEditPopup
                    teacher={selectedTeacher}
                    onClose={handleCloseEditPopup}
                    onUpdate={fetchTeachers}
                />
            )}

            <div className={styles.teachersList}>
                {teachers.map(teacher => (
                    <div key={teacher._id} className={styles.teacherCardContainer}>
                        <TeacherCard teacher={teacher} />
                        <div className={styles.actionButtons}>
                            <button
                                onClick={() => handleEditClick(teacher)}
                                className={styles.editButton}>
                                Edit
                            </button>
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
