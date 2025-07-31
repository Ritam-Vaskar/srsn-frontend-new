import React, { useState ,useContext} from 'react';
import styles from '../styles/ProfileEdit.module.scss';
import { toast } from 'react-toastify';
import SummaryApi from '../../../common';
import Context from '../../../Context';
import { makeAlumniAuthenticatedRequest } from '../../../helper/tokenManager';



const ProfileEdit = ({ user, closeModal, fetchUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    startingYear: user.startingYear || '',
    endingYear: user.endingYear || '',
    designation: user.designation || '',
    currentState: user.currentState || '',
    profilePic: user.profilePic || '',
    bioData: user.bioData || '',
    socialMediaLinks: user.socialMediaLinks || [],
    mobileNumber: user.mobileNumber || '',
    email: user.email || '',
  });

  const {fetchAlumni}=useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await makeAlumniAuthenticatedRequest(SummaryApi.AlumniEdit.url, {
        method: SummaryApi.AlumniEdit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Profile updated successfully!');
        // fetchUser(); 
        fetchAlumni();
        closeModal(); // Close modal
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Starting Year:</label>
          <input
            type="text"
            name="startingYear"
            value={formData.startingYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ending Year:</label>
          <input
            type="text"
            name="endingYear"
            value={formData.endingYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Current Location:</label>
          <input
            type="text"
            name="currentState"
            value={formData.currentState}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Profile Picture URL:</label>
          <input
            type="text"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Bio:</label>
          <textarea
            name="bioData"
            value={formData.bioData}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Social Media Links (comma-separated):</label>
          <input
            type="text"
            name="socialMediaLinks"
            value={formData.socialMediaLinks.join(', ')}
            onChange={(e) =>
              setFormData({
                ...formData,
                socialMediaLinks: e.target.value.split(',').map((link) => link.trim()),
              })
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
          <button type="button" onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;

