import React, { useState, useEffect } from 'react';
import styles from './styles/SchoolNavbar.module.scss'; // SCSS module import
import { HashLink } from 'react-router-hash-link'; // HashLink for smooth scrolling
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import logo from '../../assets/images/Logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TechnicalNav from '../TechnicalNav/TechnicalNav';

const SchoolNavbar = () => {
    const user = useSelector(state => state?.user?.user);
    const alumni = useSelector(state => state?.alumni?.alumni);

    // console.log('check user', user);
    const [isSchool, setIsSchool] = useState(false);
    const [isAdmission, setIsAdmission] = useState(false);
    const [isAcademics, setIsAcademics] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 950);

    const toggleSideMenu = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        if (window.innerWidth > 768) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen && isMobile) {
            console.log('Triggered')
            document.body.classList.add('lock-scroll');
        } else {
            document.body.classList.remove('lock-scroll');
        }
    }, [isSidebarOpen, isMobile]);


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
        < div className={styles.NavBar}>
            <TechnicalNav />

            <div className={styles.snavbar}>
                {/* Logo Section */}
                <Link to='/school' className={styles.schooldetails}>
                    <div className={styles.school_logo}>
                        <img src={logo} alt="school logo" className={styles.slogo} />
                    </div>
                    <div className={styles.sname}>
                        <h3>Sri Ramkrishna Siksha Niketan</h3>
                        <p>Established : 2001</p>
                    </div>
                </Link>

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
                                <li><HashLink smooth to='/school/home'>Home</HashLink></li>
                                <li><HashLink smooth to='/school/home#mission'>Mission and Vision</HashLink></li>
                                <li><HashLink smooth to='/school/teacher'>Meet Our Teachers</HashLink></li>
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
                                <li><Link to='/school/admission'>Admission</Link></li>
                                <li><HashLink smooth to='/school/admission#notice'>Admission Notice 2025</HashLink></li>
                                <li><HashLink smooth to='/school/admission#procedure'>Admission Procedure</HashLink></li>
                                <li><HashLink smooth to='/school/admission#age'>Age Criteria</HashLink></li>
                                {/* <li><HashLink smooth to='/school/admission#instruction'>Admission Instruction</HashLink></li> */}
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
                                <li><HashLink smooth to='/school/academic#result'>Result Analysis</HashLink></li>
                                <li><HashLink smooth to='/school/academic#syllabus'>Syllabus</HashLink></li>
                                <li><HashLink smooth to='/school/academic#booklist'>Book List</HashLink></li>

                                <li><HashLink smooth to='/school/academic#routine'>Class Routine</HashLink></li>
                                <li><HashLink smooth to='/school/academic#notice'>Notice Board</HashLink></li>
                                <li><HashLink smooth to='/school/academic#holiday'>Holiday</HashLink></li>
                            </ul>
                        )}
                    </li>
                    <li><HashLink smooth to='/school/alumni' className={styles.salumniLink}>Alumni</HashLink></li>
                    <li><HashLink smooth to='/ashram' className={styles.ashramPage}><span>Ashram Page</span></HashLink></li>
                    <li><HashLink smooth to='/school/admission_form' className={styles.slogin}>Apply</HashLink></li>
                    {/* <li><HashLink smooth to='/login' className={styles.slogin}>Login</HashLink></li> */}
                    <li>
                        {(user) &&
                            <HashLink smooth to='/school/profile' className={styles.sloginImg}>
                                <img src={user.profilePic} alt="user" />
                            </HashLink>
                        }
                        {
                            (!user && alumni) &&
                            <HashLink smooth to='/school/alumni/profile' className={styles.sloginImg}>
                                <img src={alumni.profilePic} alt="user" />
                            </HashLink>
                        }
                        {(!user && !alumni) &&
                            <HashLink smooth to='/school/login' className={styles.slogin}>
                                Login
                            </HashLink>}
                    </li>
                </div>

                {/* Sidebar Toggle for Mobile */}
                <button type='button' className={styles.stoggle} onClick={toggleSideMenu}>
                    <MenuIcon className={styles.smenu} />
                </button>



                {/* Sidebar Menu */}
                <div className={`${styles.sidemenu} ${isSidebarOpen ? styles.active : ''}`}>
                    <ul>
                        <div className={styles.sloginDiv}>
                            {
                                user &&
                                <HashLink smooth to='/school/profile' className={styles.sloginImg}>
                                    <img src={user.profilePic} alt="user" onClick={toggleSideMenu} />

                                </HashLink>
                            }
                            {
                                (!user && alumni) &&
                                <HashLink smooth to='/school/alumni/profile' className={styles.sloginImg}>
                                    <img src={alumni.profilePic} alt="user" onClick={toggleSideMenu} />
                                </HashLink>
                            }
                            <li onClick={toggleSideMenu}><ClearIcon style={{ cursor: 'pointer', color: 'red' }} /></li>
                        </div>

                        {/* <li>
                        {(user) ?
                            <HashLink smooth to='/school/profile' className={styles.sloginImg}>
                                <img src={user.profilePic} alt="user" />
                            </HashLink>
                            :
                            <HashLink smooth to='/school/login' className={styles.slogin}>
                                Login
                            </HashLink>}
                    </li> */}
                        <li>{(!user && !alumni) && <HashLink smooth to='/school/login' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Login</HashLink>}</li>
                        <li>{<HashLink smooth to='/school/admission_form' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Apply</HashLink>}</li>
                        <li><HashLink smooth to='/ashram' onClick={() => { document.body.classList.remove('lock-scroll') }} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Ashram</HashLink></li>
                        <li><HashLink smooth to='/school/alumni' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Alumni</HashLink></li>
                        <li><p>The School</p></li>
                        <li><HashLink smooth to='/school/home' onClick={toggleSideMenu}>Home</HashLink></li>
                        <li><HashLink smooth to='/school/home#mission' onClick={toggleSideMenu}>Mission and Vision</HashLink></li>
                        <li><HashLink smooth to='/school/teacher' onClick={toggleSideMenu}>Meet Our Teachers</HashLink></li>
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
                        <li><HashLink smooth to='/school/academic#result' onClick={toggleSideMenu}>Result Analysis</HashLink></li>
                        <li><HashLink smooth to='/school/academic#syllabus' onClick={toggleSideMenu}>Syllabus</HashLink></li>
                        <li><HashLink smooth to='/school/academic#booklist' onClick={toggleSideMenu}>Book List</HashLink></li>
                        <li><HashLink smooth to='/school/academic#routine' onClick={toggleSideMenu}>Class Routine</HashLink></li>
                        <li><HashLink smooth to='/school/academic#notice' onClick={toggleSideMenu}>Notice Board</HashLink></li>
                        <li><HashLink smooth to='/school/academic#holiday' onClick={toggleSideMenu}>Holiday Notice</HashLink></li>

                    </ul>
                </div>
            </div>
        </div>

    );
};

export default SchoolNavbar;
