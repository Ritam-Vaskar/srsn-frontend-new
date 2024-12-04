import React, { useState } from 'react';
import styles from './../styles/AlumniProfile.module.scss';
import ProfileEdit from './ProfileEdit';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AlumniControlPanel = () => {
  const [activeComponent, setActiveComponent] = useState('Profile');
  const alumni = useSelector((state) => state?.alumni?.alumni);

  const handleLeftBarOptionClick = (option) => {
    setActiveComponent(option);
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
            <h2>Profile Edit</h2>
            <ProfileEdit alumni={alumni} />
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
