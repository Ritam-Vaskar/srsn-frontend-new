import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import styles from './styles/StudentDetailsPopup.module.scss';
import logo from '../../../assets/images/Logo.png';

const StudentDetailsPopup = ({ student, onClose }) => {
    const tableRef = useRef();


    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.html(tableRef.current, {
            callback: function (pdf) {
                pdf.save(`${student.name}_details.pdf`);
            },
            x: 10,
            y: 10,
            width: 180,
            windowWidth: tableRef.current.scrollWidth
        });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Student Details</h2>

                <center><div className={styles.actions}>
                    <button className={styles.downloadButton} onClick={handleDownloadPDF}>Download as PDF</button>
                </div></center>
                
                <table ref={tableRef} className={`${styles.detailsTable} ${styles.printContent}`}>
                <thead>
                    <tr>
                        <td colSpan="4">
                            <div className={styles.head}>
                                <img src={logo} alt="logo" height={80} />
                                <h3>Sri Rama Krishna Siksha Niketan <br /><p>HaridasNagar, Raghunathganj, Murshidabad</p></h3>
                                <img src={student.profilePic} alt="" height={80} />
                            </div>
                        </td>
                    </tr>
                </thead>

                    <tbody>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{student.name}</td>
                            <td><strong>Email:</strong></td>
                            <td>{student.email}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone:</strong></td>
                            <td>{student.phone}</td>
                            <td><strong>Date of Joining:</strong></td>
                            <td>{student.DateOfJoining}</td>
                        </tr>
                        <tr>
                            <td><strong>Qualification:</strong></td>
                            <td>{student.Qualification}</td>
                            <td><strong>Role:</strong></td>
                            <td>{student.role}</td>
                        </tr>
                        <tr>
                            <td><strong>DOB:</strong></td>
                            <td>{student.dob}</td>
                            <td><strong>Blood Group:</strong></td>
                            <td>{student.bloodGroup}</td>
                        </tr>
                        <tr>
                            <td><strong>Aadhar No:</strong></td>
                            <td>{student.aadharNo}</td>
                            <td><strong>Health ID:</strong></td>
                            <td>{student.healthID}</td>
                        </tr>
                        <tr>
                            <td><strong>Religion:</strong></td>
                            <td>{student.religion}</td>
                            <td><strong>Mother Tongue:</strong></td>
                            <td>{student.motherTongue}</td>
                        </tr>
                        <tr>
                            <td><strong>Nationality:</strong></td>
                            <td>{student.nationality}</td>
                            <td><strong>Student Code:</strong></td>
                            <td>{student.studentCode}</td>
                        </tr>
                        <tr>
                            <td><strong>Address:</strong></td>
                            <td>{student.address}</td>
                            <td><strong>City:</strong></td>
                            <td>{student.city}</td>
                        </tr>
                        <tr>
                            <td><strong>District:</strong></td>
                            <td>{student.district}</td>
                            <td><strong>State:</strong></td>
                            <td>{student.state}</td>
                        </tr>
                        <tr>
                            <td><strong>Pin Code:</strong></td>
                            <td>{student.pinCode}</td>
                            <td><strong>Country:</strong></td>
                            <td>{student.country}</td>
                        </tr>
                        <tr>
                            <td><strong>Father's Name:</strong></td>
                            <td>{student.fatherName}</td>
                            <td><strong>Mother's Name:</strong></td>
                            <td>{student.motherName}</td>
                        </tr>
                        <tr>
                            <td><strong>Guardian Name:</strong></td>
                            <td>{student.guardianName}</td>
                            <td><strong>Guardian Relation:</strong></td>
                            <td>{student.guardianRelation}</td>
                        </tr>
                        <tr>
                            <td><strong>Guardian Phone:</strong></td>
                            <td>{student.guardianPhone}</td>
                            <td><strong>Guardian Email:</strong></td>
                            <td>{student.guardianEmail}</td>
                        </tr>
                        <tr>
                            <td><strong>Annual Income:</strong></td>
                            <td>{student.annualIncome}</td>
                            <td><strong>Guardian Qualification:</strong></td>
                            <td>{student.guardianQualification}</td>
                        </tr>
                        <tr>
                            <td><strong>Residential Address:</strong></td>
                            <td>{student.rAddress}</td>
                            <td><strong>Residential City:</strong></td>
                            <td>{student.rCity}</td>
                        </tr>
                        <tr>
                            <td><strong>Residential District:</strong></td>
                            <td>{student.rDistrict}</td>
                            <td><strong>Residential State:</strong></td>
                            <td>{student.rState}</td>
                        </tr>
                        <tr>
                            <td><strong>Residential Country:</strong></td>
                            <td>{student.rCountry}</td>
                            <td><strong>Residential Pin Code:</strong></td>
                            <td>{student.rPinCode}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDetailsPopup;
