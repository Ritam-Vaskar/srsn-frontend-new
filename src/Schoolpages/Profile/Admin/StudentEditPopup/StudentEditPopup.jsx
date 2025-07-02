import React, { useState, useEffect } from "react";
import styles from "./styles/StudentEditPopup.module.scss";
import SummaryApi from "../../../../common";
import { toast } from "react-toastify";

const StudentAppEdit = ({ student, onClose, onUpdate, model }) => {
  const [editedStudent, setEditedStudent] = useState({});

  useEffect(() => {
    // Initialize the state with the current student data
    setEditedStudent({ ...student });
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.UserEditById.url, {
        method: SummaryApi.UserEditById.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ editedStudent, model })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Student information updated successfully');
        onUpdate(); // Trigger a refresh of the parent component
        onClose(); // Close the popup
      } else {
        toast.error(result.message || 'Failed to update student information');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('An error occurred while updating student information');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Edit Student Information
        </h2>

        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGrid}>
            {/* Personal Information */}
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editedStudent.name || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editedStudent.email || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={editedStudent.phone || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={editedStudent.dob || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Aadhar Number</label>
              <input
                type="text"
                name="aadharNo"
                value={editedStudent.aadharNo || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Roll No</label>
              <input
                type="text"
                name="result"
                value={editedStudent.result || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Blood Group</label>
              <select
                name="bloodGroup"
                value={editedStudent.bloodGroup || ''}
                onChange={handleInputChange}
                className={styles.input}
              >
                <option value="">Select...</option>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Student Code : </label>
              <input
                type="text"
                name="studentCode"
                value={editedStudent.studentCode || ''}
                onChange={handleInputChange}
              />
            </div>


            {/* Address Information */}
            <div className={styles.formGroup}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={editedStudent.address || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={editedStudent.city || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>District</label>
              <input
                type="text"
                name="district"
                value={editedStudent.district || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={editedStudent.state || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Parent/Guardian Information */}
            <div className={styles.formGroup}>
              <label>Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={editedStudent.fatherName || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Mother's Name</label>
              <input
                type="text"
                name="motherName"
                value={editedStudent.motherName || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Guardian Name</label>
              <input
                type="text"
                name="guardianName"
                value={editedStudent.guardianName || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Guardian Phone</label>
              <input
                type="tel"
                name="guardianPhone"
                value={editedStudent.guardianPhone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Guardian Email</label>
              <input
                type="email"
                name="guardianEmail"
                value={editedStudent.guardianEmail || ''}
                onChange={handleInputChange}
              />
            </div>

          </div>

          <div className={styles.submitContainer}>
            <button type="submit" className={styles.submitButton}>
              Update Student Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAppEdit;