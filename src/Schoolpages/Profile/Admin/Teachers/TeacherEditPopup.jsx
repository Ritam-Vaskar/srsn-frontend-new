import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../../../common';
import { makeAuthenticatedRequest } from '../../../../helper/tokenManager';
import styles from './styles/TeacherEditPopup.module.scss';

const TeacherEditPopup = ({ teacher, onClose, onUpdate }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (teacher?.email) {
      setEmail(teacher.email);
    }
  }, [teacher]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter an email address.');
      return;
    }

    try {
      const response = await makeAuthenticatedRequest(SummaryApi.UserEditById.url, {
        method: SummaryApi.UserEditById.method,
        body: JSON.stringify({
          editedStudent: {
            _id: teacher._id,
            email: email
          },
          model: 'User'
        })
      });

      const result = await response.json();
      if (!result.success) {
        toast.error(result.message || 'Failed to update teacher email.');
        return;
      }

      toast.success('Teacher email updated successfully.');
      onUpdate();
      onClose();
    } catch (error) {
      toast.error('An error occurred while updating teacher email.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Update Teacher Email</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className={styles.submitButton}>
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherEditPopup;
