// export default SchoolNavbar;
import React, { useState, useEffect } from 'react';
import styles from './styles/SchoolNavbar.module.scss'; // SCSS module import
import { Link } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

const SchoolNavbar = () => {
    const [isSchool, setIsSchool] = useState(false);
    const [isAdmission, setIsAdmission] = useState(false);
    const [isAcademics, setIsAcademics] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSideMenu = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    //size check from frontend
    const handleResize = () => {
        if (window.innerWidth > 768) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.snavbar}>
            <div className={styles.schooldetails}>
                <div className={styles.school_logo}>
                    <img src="./image/09584446-ca46-488d-9ded-7897fb19334c.jpeg" alt="school logo" className={styles.slogo} height={150} />
                </div>
                <div className={styles.sname}>
                    <h3>Sri Ramkrishna Siksha Niketan</h3>
                </div>
            </div>

            <div className={styles.snav}>
                <li
                    onMouseEnter={() => setIsSchool(true)}
                    onMouseLeave={() => setIsSchool(false)}
                >
                    <div>
                        <p>The School</p>
                        <ArrowDropDownIcon />
                    </div>
                    {isSchool && (
                        <ul className={styles.subOption}>
                            <li><Link to='/school/home'>Home</Link></li>
                            <li><Link to='/mission'>Mission and Vision</Link></li>
                            <li><Link to='/teachers'>Meet Our Teachers</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/media'>Media</Link></li>
                        </ul>
                    )}
                </li>
                <li
                    onMouseEnter={() => setIsAdmission(true)}
                    onMouseLeave={() => setIsAdmission(false)}
                >
                    <div>
                        <p>Admission</p>
                        <ArrowDropDownIcon />
                    </div>
                    {isAdmission && (
                        <ul className={styles.subOption}>
                            <li><Link to='/school/admission'>Admission</Link></li>
                            <li><Link to='/school/admission#notice'>Admission Notice 2025</Link></li>
                            <li><Link to='/school/admission#procedure'>Admission Procedure</Link></li>
                            <li><Link to='/school/admission#age'>Age Criteria</Link></li>
                            {/* <li><Link to='/school/admission#instruction'>Admission Instruction</Link></li> */}
                            <li><Link to='/school/admission#syllabus'>Syllabus for Assessment Test</Link></li>
                        </ul>

                    )}
                </li>
                <li
                    onMouseEnter={() => setIsAcademics(true)}
                    onMouseLeave={() => setIsAcademics(false)}
                >
                    <div>
                        <p>Academic</p>
                        <ArrowDropDownIcon />
                    </div>
                    {isAcademics && (
                        <ul className={styles.subOption}>
                            <li><Link to='/result'>Result Analysis</Link></li>
                            <li><a href="#">Syllabus</a></li>
                            <li><a href="#">Book List</a></li>
                            <li><Link to='/classroutine'>Class Routine</Link></li>
                            <li><Link to='/notice'>Notice Board</Link></li>
                            <li><a href="#">Holiday Notice</a></li>
                        </ul>
                    )}
                </li>
                <li><Link to='/alumni' className={styles.salumniLink}>Alumni</Link></li>
                <li><Link to='/ashram' style={{ color: 'orangered', fontWeight: 'bold', textDecoration: 'none' }}>Ashram Page</Link></li>
                <li><Link to='/login' className={styles.slogin}>Login</Link></li>
            </div>

            <button type='button' className={styles.stoggle} onClick={toggleSideMenu}>
                <MenuIcon className={styles.smenu} style={{ cursor: 'pointer' }} />
            </button>

            <div className={`${styles.sidemenu} ${isSidebarOpen ? styles.active : ''}`}>
                <ul>
                    <li><ClearIcon onClick={toggleSideMenu} style={{ cursor: 'pointer', color: 'red' }} /></li>
                    <li><p>The School</p></li>
                    <li><Link to='/' onClick={toggleSideMenu}>Home</Link></li>
                    <li><Link to='/mission' onClick={toggleSideMenu}>Mission and Vision</Link></li>
                    <li><Link to='/teachers' onClick={toggleSideMenu}>Meet Our Teachers</Link></li>
                    <li><Link to='/gallery' onClick={toggleSideMenu}>Gallery</Link></li>
                    <li><Link to='/contact' onClick={toggleSideMenu}>Contact</Link></li>
                    <li><Link to='/media' onClick={toggleSideMenu}>Media</Link></li>

                    <li><p>Admission</p></li>
                    <li><Link to='/school/admission' onClick={toggleSideMenu}>Admission Notice 2025</Link></li>
                    <li><Link to='/admissionprocedure' onClick={toggleSideMenu}>Admission Procedure</Link></li>
                    <li><Link to='/admissionage' onClick={toggleSideMenu}>Age criteria</Link></li>
                    <li><Link to='/admissioninstruction' onClick={toggleSideMenu}>Admission Instruction</Link></li>
                    <li><Link to='/admissionsyllabus' onClick={toggleSideMenu}>Syllabus for Assessment Test</Link></li>

                    <li><p>Academic</p></li>
                    <li><Link to='/result' onClick={toggleSideMenu}>Result Analysis</Link></li>
                    <li><a href="#" onClick={toggleSideMenu}>Syllabus</a></li>
                    <li><a href="#" onClick={toggleSideMenu}>Book List</a></li>
                    <li><Link to='/classroutine' onClick={toggleSideMenu}>Class Routine</Link></li>
                    <li><Link to='/notice' onClick={toggleSideMenu}>Notice Board</Link></li>
                    <li><a href="#" onClick={toggleSideMenu}>Holiday Notice</a></li>
                    <li><Link to='/RamkrishnaSevaSangha' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Ashram</Link></li>
                    <li><Link to='/alumni' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Alumni</Link></li>
                    <li><Link to='/login' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default SchoolNavbar;
