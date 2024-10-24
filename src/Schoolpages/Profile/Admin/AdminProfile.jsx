import React, { useState } from 'react';
import styles from './styles/AdminProfile.module.scss';
const AdminProfile = ({ user }) => {
    // const [flag, setFlag] = useState(true);
    
    return (
        <div className={styles.container}>
           <h1>{user.name}</h1>
        </div>
    );
}

export default AdminProfile;
