import React, { useState } from 'react';
import Teachers from './Teachers/Teachers';
import Students from './Students/Students';
import Applications from './Applications/Applications';
import Alumni from './Alumni/Alumni';
import Notice from './Notice/Notice';
import BlogUpload from './Blog/Blog';
// import Messages from './Messages/Messages';
import styles from './styles/AdminProfile.module.scss';

const AdminPortal = () => {
    const [activeSection, setActiveSection] = useState('Teachers');

    const renderSection = () => {
        switch (activeSection) {
            // case 'Messages':
            //     return <Messages />;
            case 'Teachers':
                return <Teachers />;
            case 'Students':
                return <Students />;
            case 'Applications':
                return <Applications />;
            case 'Alumni':
                return <Alumni />;
            case 'Notice':
                return <Notice />;
            case 'Blog':
                return <BlogUpload />;
            default:
                return <Messages />;
        }
    };

    return (
        <div className={styles.container}>
            
            <div className={styles.topBar}>
                {/* <button onClick={() => setActiveSection('Messages')} className={activeSection === 'Messages' ? styles.active : ''}>Messages</button> */}
                <button onClick={() => setActiveSection('Teachers')} className={activeSection === 'Teachers' ? styles.active : ''}>Teachers</button>
                <button onClick={() => setActiveSection('Students')} className={activeSection === 'Students' ? styles.active : ''}>Students</button>
                <button onClick={() => setActiveSection('Applications')} className={activeSection === 'Applications' ? styles.active : ''}>Applications</button>
                <button onClick={() => setActiveSection('Alumni')} className={activeSection === 'Alumni' ? styles.active : ''}>Alumni</button>
                <button onClick={() => setActiveSection('Notice')} className={activeSection === 'Notice' ? styles.active : ''}>Notice</button>
                <button onClick={() => setActiveSection('Blog')} className={activeSection === 'Blog' ? styles.active : ''}>Blog</button>
            </div>
            <div className={styles.content}>
                {renderSection()}
            </div>
        </div>
    );
};

export default AdminPortal;
