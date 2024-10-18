import React, { useState } from 'react';
import "./styles/SchoolNavbar.css";
import { Link } from 'react-router-dom';

const SchoolNavbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSideMenu = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='snavbar'>
            <div className="schooldetails">
                <div className="school_logo">
                    <img src="./image/09584446-ca46-488d-9ded-7897fb19334c.jpeg" alt="school logo" className='slogo' height={150} />
                </div>
                <div className="sname">
                    <h3>Sri Ramkrishna Siksha Niketan</h3>
                </div>
            </div>
            <div className="snav">
                <ul>
                    {/* Navigation items */}
                    <li>
                        <div>The School</div>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/mission'>Mission and Vision</Link></li>
                            <li><Link to='/teachers'>Meet Our Teachers</Link></li>
                            <li><Link to='/gallery'>Gallery</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>
                            <li><Link to='/media'>Media</Link></li>
                        </ul>
                    </li>
                    {/* Additional navigation items */}
                    <li>
                        <div>Admission</div>
                        <ul>
                            <li><Link to='/admissionnotice'>Admission Notice 2025</Link></li>
                            <li><Link to='/admissionprocedure'>Admission Procedure</Link></li>
                            <li><Link to='/admissionage'>Age criteria</Link></li>
                            <li><Link to='/admissioninstruction'>Admission Instruction</Link></li>
                            <li><Link to='/admissionsyllabus'>Syllabus for Assessment Test</Link></li>
                        </ul>
                    </li>
                    {/* More navigation items */}
                    <li>
                        <div>Academics</div>
                        <ul>
                            <li><Link to='/result'>Result Analysis</Link></li>
                            <li><a href="#">Syllabus</a></li>
                            <li><a href="#">Book List</a></li>
                            <li><Link to='/classroutine'>Class Routine</Link></li>
                            <li><Link to='/notice'>Notice Board</Link></li>
                            <li><a href="#">Holiday Notice</a></li>
                        </ul>
                    </li>
                    <li>
                        <div>
                            <Link to='/RamkrishnaSevaSangha' className='sashramLink'>Ashram</Link>
                        </div>
                    </li>
                    <li>
                        <div>
                            <Link to='/alumni' className='salumniLink'>Alumni</Link>
                        </div>
                    </li>
                    <li>
                        <Link to='/ashram' style={{color: "orangered" , fontWeight: "bold" , textDecoration: "none"}}>Ashram Page</Link>
                    </li>
                    <li>
                        <Link to='/login' className='slogin'>Login</Link>
                    </li>
                    
                </ul>
            </div>
            <button type='button' className='stoggle' onClick={toggleSideMenu}>
                <img src="./image/Hamburger.svg" alt="menu" className='smenu' height={20} style={{cursor: 'pointer'}}/>
            </button>
            <div className={`sidemenu ${isSidebarOpen ? 'active' : ''}`}>
                <ul>
                    <li><img src="./image/x-button.png" alt="cross" onClick={toggleSideMenu} style={{cursor: 'pointer',color: 'white'}}/></li>
                    <li><div>The School</div></li>
                    <li><Link to='/' onClick={toggleSideMenu}>Home</Link></li>
                    <li><Link to='/mission' onClick={toggleSideMenu}>Mission and Vision</Link></li>
                    <li><Link to='/teachers' onClick={toggleSideMenu}>Meet Our Teachers</Link></li>
                    <li><Link to='/gallery' onClick={toggleSideMenu}>Gallery</Link></li>
                    <li><Link to='/contact' onClick={toggleSideMenu}>Contact</Link></li>
                    <li><Link to='/media' onClick={toggleSideMenu}>Media</Link></li>
                    <li><div>Admission</div></li>
                    <li><Link to='/admissionnotice' onClick={toggleSideMenu}>Admission Notice 2025</Link></li>
                    <li><Link to='/admissionprocedure' onClick={toggleSideMenu}>Admission Procedure</Link></li>
                    <li><Link to='/admissionage' onClick={toggleSideMenu}>Age criteria</Link></li>
                    <li><Link to='/admissioninstruction' onClick={toggleSideMenu}>Admission Instruction</Link></li>
                    <li><Link to='/admissionsyllabus' onClick={toggleSideMenu}>Syllabus for Assessment Test</Link></li>
                    <li><div>Academic</div></li>
                    <li><Link to='/result' onClick={toggleSideMenu}>Result Analysis</Link></li>
                    <li><a href="#" onClick={toggleSideMenu}>Syllabus</a></li>
                    <li><a href="#" onClick={toggleSideMenu}>Book List</a></li>
                    <li><Link to='/classroutine' onClick={toggleSideMenu}>Class Routine</Link></li>
                    <li><Link to='/notice' onClick={toggleSideMenu}>Notice Board</Link></li>
                    <li><a href="#" onClick={toggleSideMenu}>Holiday Notice</a></li>
                    <li><Link to='/RamkrishnaSevaSangha' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Ashram</Link></li>
                    <li><Link to='/alumni' onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Alumni</Link></li>
                    <li><Link to='/login'  onClick={toggleSideMenu} style={{ color: 'rgb(255, 153, 0)', fontSize: 'large', fontWeight: 'bolder' }}>Login</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default SchoolNavbar;
