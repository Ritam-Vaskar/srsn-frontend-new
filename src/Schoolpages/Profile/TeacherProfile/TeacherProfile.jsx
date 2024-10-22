import React, { useState } from 'react';
import styles from './TeacherProfile.module.scss';
import TeacherEdit from '../TeacherProfileEdit/ProfileEdit';
import StudentDetails from './../StudentFetch/StudentFetch';

const TeacherProfile = ({ user }) => {
    const [flag, setFlag] = useState(true);
    
    return (
        <div className={styles.container}>
            <div className={styles.leftBar}>
                <div className={styles.profileImage}>
                    <img src={user.profilePic} alt="profile" className={styles.image}/>
                </div>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.editProfile} onClick={() => setFlag(true)}>Your Profile</div>
                <div className={styles.studentDetails} onClick={() => setFlag(false)}>Student Details</div>
            </div>

            <div className={styles.rightBar}>
                {flag && <TeacherEdit user={user} />}
                {!flag && <StudentDetails />}
            </div>
        </div>
    );
}

export default TeacherProfile;
