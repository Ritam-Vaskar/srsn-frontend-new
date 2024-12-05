import React, { useState } from 'react';
import styles from './../styles/AlumniProfile.module.scss';
import ProfileEdit from './ProfileEdit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AlumniControlPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Profile'); // Tracks active component
  const [isEditing, setIsEditing] = useState(false); // Tracks if the edit window is open
  const alumni = useSelector((state) => state?.alumni?.alumni);

  const handleLeftBarOptionClick = (option) => {
    setActiveComponent(option);
    if (option === 'Profile') {
      setIsEditing(false); // Close edit window if switching back to the profile
    }
  };

  const openEditWindow = () => {
    setIsEditing(true);
  };

  const closeEditWindow = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.leftBar}>
        <div className={styles.profileImage}>
          <img
            src={alumni?.profilePic || 'https://via.placeholder.com/150'}
            alt="Alumni Profile"
            className={styles.image}
          />
        </div>
        <div className={styles.name}>{alumni?.name || 'Alumni Name'}</div>
        <p>{alumni?.batch || 'Batch Year'}</p>
        <div
          className={styles.navOption}
          onClick={() => handleLeftBarOptionClick('Profile')}
        >
          Profile Edit
        </div>
        <div
          className={styles.navOption}
          onClick={() => handleLeftBarOptionClick('MessageCenter')}
        >
          Message Center
        </div>
      </div>

      {/* Right Content */}
      <div className={styles.rightBar}>
        {activeComponent === 'Profile' && (
          <div>
            <h2>Profile Details</h2>
            {!isEditing ? (
              <div className={styles.profileDetails}>
              <div className={styles.row}>
                <div className={styles.label}>Name:</div>
                <div className={styles.value}>{alumni?.name || 'Not Available'}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Batch:</div>
                <div className={styles.value}>{alumni?.batch || 'Not Available'}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Designation:</div>
                <div className={styles.value}>{alumni?.designation || 'Not Available'}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Email:</div>
                <div className={styles.value}>{alumni?.email || 'Not Available'}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Phone:</div>
                <div className={styles.value}>{alumni?.mobileNumber || 'Not Available'}</div>
              </div>
              <button className={styles.editButton} onClick={openEditWindow}>
                Edit Profile
              </button>
            </div>
            
            ) : (
              <ProfileEdit
                user={alumni}
                closeModal={closeEditWindow} // Close edit modal on save or cancel
              />
            )}
          </div>
        )}
        {activeComponent === 'MessageCenter' && (
          <div>
            <h2>Message Center</h2>
            <Link to="/school/alumni/chat" className={styles.chatLink}>
              Go to Chat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniControlPanel;
