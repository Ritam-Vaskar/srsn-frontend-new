import React, { useState, useEffect } from 'react';
import styles from './styles/SchoolNavbar.module.scss'; // SCSS module import
import { HashLink } from 'react-router-hash-link'; // HashLink for smooth scrolling
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../assets/images/Logo.png';

const SchoolNavbar = () => {
    const [isSchool, setIsSchool] = useState(false);
    const [isAdmission, setIsAdmission] = useState(false);
    const [isAcademics, setIsAcademics] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    // Toggle sidebar visibility
    const toggleSideMenu = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    // Handle resize to enable/disable hover effects on mobile
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setSidebarOpen(false); // Close sidebar when resizing to desktop
        }
    };

    // Listen for window resizing
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Dropdown toggle for mobile
    const handleDropdownClick = (dropdownSetter, isDropdownOpen) => {
        if (isMobile) {
            dropdownSetter(!isDropdownOpen);
        }
    };

    return (
        <div className={styles.snavbar}>
            {/* Logo Section */}
            <div className={styles.schooldetails}>
                <div className={styles.school_logo}>
                    <img src={logo} alt="school logo" className={styles.slogo} />
                </div>
                <div className={styles.sname}>
                    <h3>Sri Ramkrishna Siksha Niketan</h3>
                </div>
            </div>

            {/* Main Navigation */}
            <div className={styles.snav}>
                <li
                    onMouseEnter={() => !isMobile && setIsSchool(true)}
                    onMouseLeave={() => !isMobile && setIsSchool(false)}
                    onClick={() => handleDropdownClick(setIsSchool, isSchool)}
                >
                    <div>
                        <p>The School</p>
                        <ArrowDropDownIcon />
                    </div>
                    {(isSchool || !isMobile) && (
                        <ul className={styles.subOption}>
                            <li><HashLink smooth to='/school/home#holytrio'>Home</HashLink></li>
                            <li><HashLink smooth to='/school/home#mission'>Mission and Vision</HashLink></li>
                            <li><HashLink smooth to='/school/home#teachers-carousel'>Meet Our Teachers</HashLink></li>
                            <li><HashLink smooth to='/school/home#gallery'>Gallery</HashLink></li>
                            <li><HashLink smooth to='/school/home#contact'>Contact</HashLink></li>
                            <li><HashLink smooth to='/school/home#school-media'>Media</HashLink></li>
                        </ul>
                    )}
                </li>
                <li
                    onMouseEnter={() => !isMobile && setIsAdmission(true)}
                    onMouseLeave={() => !isMobile && setIsAdmission(false)}
                    onClick={() => handleDropdownClick(setIsAdmission, isAdmission)}
                >
                    <div>
                        <p>Admission</p>
                        <ArrowDropDownIcon />
                    </div>
                    {(isAdmission || !isMobile) && (
                        <ul className={styles.subOption}>
                            <li><HashLink smooth to='/school/admission#notice'>Admission Notice 2025</HashLink></li>
                            <li><HashLink smooth to='/school/admission#procedure'>Admission Procedure</HashLink></li>
                            <li><HashLink smooth to='/school/admission#age'>Age Criteria</HashLink></li>
                            <li><HashLink smooth to='/school/admission#instruction'>Admission Instruction</HashLink></li>
                            <li><HashLink smooth to='/school/admission#syllabus'>Syllabus for Assessment Test</HashLink></li>
                        </ul>
                    )}
                </li>
                <li
                    onMouseEnter={() => !isMobile && setIsAcademics(true)}
                    onMouseLeave={() => !isMobile && setIsAcademics(false)}
                    onClick={() => handleDropdownClick(setIsAcademics, isAcademics)}
                >
                    <div>
                        <p>Academic</p>
                        <ArrowDropDownIcon />
                    </div>
                    {(isAcademics || !isMobile) && (
                        <ul className={styles.subOption}>
                            <li><HashLink smooth to='/result'>Result Analysis</HashLink></li>
                            <li><a href="#">Syllabus</a></li>
                            <li><a href="#">Book List</a></li>
                            <li><HashLink smooth to='/classroutine'>Class Routine</HashLink></li>
                            <li><HashLink smooth to='/notice'>Notice Board</HashLink></li>
                            <li><a href="#">Holiday Notice</a></li>
                        </ul>
                    )}
                </li>
                <li><HashLink smooth to='/school/alumni' className={styles.salumniLink}>Alumni</HashLink></li>
                <li><HashLink smooth to='/ashram' style={{ color: 'orangered', fontWeight: 'bold', textDecoration: 'none' }}>Ashram Page</HashLink></li>
                <li><HashLink smooth to='/login' className={styles.slogin}>Login</HashLink></li>
            </div>

            {/* Sidebar Toggle for Mobile */}
            <button type='button' className={styles.stoggle} onClick={toggleSideMenu}>
                {isSidebarOpen ? <ClearIcon className={styles.smenu} /> : <MenuIcon className={styles.smenu} />}
            </button>

            {/* Sidebar Menu */}
            <div className={`${styles.sidemenu} ${isSidebarOpen ? styles.active : ''}`}>
                <ul>
                    <li onClick={toggleSideMenu}><ClearIcon style={{ cursor: 'pointer', color: 'red' }} /></li>
                    <li><p>The School</p></li>
                    <li><HashLink smooth to='/school/home#holytrio' onClick={toggleSideMenu}>Home</HashLink></li>
                    <li><HashLink smooth to='/school/home#mission' onClick={toggleSideMenu}>Mission and Vision</HashLink></li>
                    <li><HashLink smooth to='/school/home#teachers-carousel' onClick={toggleSideMenu}>Meet Our Teachers</HashLink></li>
                    <li><HashLink smooth to='/school/home#gallery' onClick={toggleSideMenu}>Gallery</HashLink></li>
                    <li><HashLink smooth to='/school/home#contact' onClick={toggleSideMenu}>Contact</HashLink></li>
                    <li><HashLink smooth to='/school/home#school-media' onClick={toggleSideMenu}>Media</HashLink></li>
                    <li><p>Admission</p></li>
                    <li><HashLink smooth to='/school/admission#notice' onClick={toggleSideMenu}>Admission Notice 2025</HashLink></li>
                    <li><HashLink smooth to='/school/admission#procedure' onClick={toggleSideMenu}>Admission Procedure</HashLink></li>
                    <li><HashLink smooth to='/school/admission#age' onClick={toggleSideMenu}>Age Criteria</HashLink></li>
                    <li><HashLink smooth to='/school/admission#instruction' onClick={toggleSideMenu}>Admission Instruction</HashLink></li>
                    <li><HashLink smooth to='/school/admission#syllabus' onClick={toggleSideMenu}>Syllabus for Assessment Test</HashLink></li>
                    <li><p>Academic</p></li>
                    <li><HashLink smooth to='/result' onClick={toggleSideMenu}>Result Analysis</HashLink></li>
                    <li><a href="#" onClick={toggleSideMenu}>Syllabus</a></li>
                    <li><a href="#" onClick={toggleSideMenu}>Book List</a></li>
                    <li><HashLink smooth to='/classroutine' onClick={toggleSideMenu}>Class Routine</HashLink></li>
                    <li><HashLink smooth to='/notice' onClick={toggleSideMenu}>Notice Board</HashLink></li>
                    <li><a href="#" onClick={toggleSideMenu}>Holiday Notice</a></li>
                    <li><HashLink smooth to='/RamkrishnaSevaSangha' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Ashram</HashLink></li>
                    <li><HashLink smooth to='/alumni' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Alumni</HashLink></li>
                    <li><HashLink smooth to='/login' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Login</HashLink></li>
                </ul>
            </div>
        </div>
    );
};

export default SchoolNavbar;
