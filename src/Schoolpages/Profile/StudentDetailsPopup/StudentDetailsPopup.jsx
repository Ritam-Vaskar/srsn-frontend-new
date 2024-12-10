import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import styles from "./styles/StudentDetailsPopup.module.scss";
import logo from "../../../assets/images/Logo.png";

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
      windowWidth: tableRef.current.scrollWidth,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Student Details
        </h2>

        <center>
          <div className={styles.actions}>
            <button
              className={styles.downloadButton}
              onClick={handleDownloadPDF}
            >
              Download as PDF
            </button>
          </div>
        </center>

        <table
          ref={tableRef}
          className={`${styles.detailsTable} ${styles.printContent}`}
        >
          <thead>
            <tr>
              <td colSpan="4">
                <div className={styles.head}>
                  <img src={logo} alt="logo" height={80} />
                  <h3>
                    Sri Rama Krishna Siksha Niketan <br />
                    <p>HaridasNagar, Raghunathganj, Murshidabad</p>
                  </h3>
                  <img src={student.profilePic} alt="" height={80} />
                </div>
              </td>
            </tr>
          </thead>

          <tbody>
            <tr>
              {student.name && (
                <td>
                  <strong>Name:</strong>
                </td>
              )}
              {student.name && <td>{student.name}</td>}
              {student.email && (
                <td>
                  <strong>Email:</strong>
                </td>
              )}
              {student.email && <td>{student.email}</td>}
            </tr>
            <tr>
              {student.phone && (
                <td>
                  <strong>Phone:</strong>
                </td>
              )}
              {student.phone && <td>{student.phone}</td>}
              {student.dob && (
                <td>
                  <strong>DOB:</strong>
                </td>
              )}
              {student.dob && <td>{student.dob}</td>}
            </tr>
            <tr>
              {student.dobRegNo && (
                <td>
                  <strong>DOB Reg No:</strong>
                </td>
              )}
              {student.dobRegNo && <td>{student.dobRegNo}</td>}
              {student.socialCatagory && (
                <td>
                  <strong>Social Category:</strong>
                </td>
              )}
              {student.socialCatagory && <td>{student.socialCatagory}</td>}
            </tr>
            <tr>
              {student.socialCatagoryRegNo && (
                <td>
                  <strong>Social Category Reg No:</strong>
                </td>
              )}
              {student.socialCatagoryRegNo && (
                <td>{student.socialCatagoryRegNo}</td>
              )}
              {student.religion && (
                <td>
                  <strong>Religion:</strong>
                </td>
              )}
              {student.religion && <td>{student.religion}</td>}
            </tr>
            <tr>
              {student.motherTongue && (
                <td>
                  <strong>Mother Tongue:</strong>
                </td>
              )}
              {student.motherTongue && <td>{student.motherTongue}</td>}
              {student.nationality && (
                <td>
                  <strong>Nationality:</strong>
                </td>
              )}
              {student.nationality && <td>{student.nationality}</td>}
            </tr>
            <tr>
              {student.aadharNo && (
                <td>
                  <strong>Aadhar No:</strong>
                </td>
              )}
              {student.aadharNo && <td>{student.aadharNo}</td>}
              {student.bloodGroup && (
                <td>
                  <strong>Blood Group:</strong>
                </td>
              )}
              {student.bloodGroup && <td>{student.bloodGroup}</td>}
            </tr>
            <tr>
              {student.healthID && (
                <td>
                  <strong>Health ID:</strong>
                </td>
              )}
              {student.healthID && <td>{student.healthID}</td>}
              {student.grade && (
                <td>
                  <strong>Grade:</strong>
                </td>
              )}
              {student.grade && <td>{student.grade}</td>}
            </tr>
            <tr>
              {student.studentCode && (
                <td>
                  <strong>Student Code:</strong>
                </td>
              )}
              {student.studentCode && <td>{student.studentCode}</td>}
            </tr>
            <tr>
              {student.address && (
                <td>
                  <strong>Address:</strong>
                </td>
              )}
              {student.address && <td>{student.address}</td>}
              {student.city && (
                <td>
                  <strong>City:</strong>
                </td>
              )}
              {student.city && <td>{student.city}</td>}
            </tr>
            <tr>
              {student.district && (
                <td>
                  <strong>District:</strong>
                </td>
              )}
              {student.district && <td>{student.district}</td>}
              {student.state && (
                <td>
                  <strong>State:</strong>
                </td>
              )}
              {student.state && <td>{student.state}</td>}
            </tr>
            <tr>
              {student.country && (
                <td>
                  <strong>Country:</strong>
                </td>
              )}
              {student.country && <td>{student.country}</td>}
              {student.pinCode && (
                <td>
                  <strong>Pin Code:</strong>
                </td>
              )}
              {student.pinCode && <td>{student.pinCode}</td>}
            </tr>
            <tr>
              {student.fatherName && (
                <td>
                  <strong>Father's Name:</strong>
                </td>
              )}
              {student.fatherName && <td>{student.fatherName}</td>}
              {student.motherName && (
                <td>
                  <strong>Mother's Name:</strong>
                </td>
              )}
              {student.motherName && <td>{student.motherName}</td>}
            </tr>
            <tr>
              {student.guardianName && (
                <td>
                  <strong>Guardian Name:</strong>
                </td>
              )}
              {student.guardianName && <td>{student.guardianName}</td>}
              {student.guardianRelation && (
                <td>
                  <strong>Guardian Relation:</strong>
                </td>
              )}
              {student.guardianRelation && <td>{student.guardianRelation}</td>}
            </tr>
            <tr>
              {student.guardianPhone && (
                <td>
                  <strong>Guardian Phone:</strong>
                </td>
              )}
              {student.guardianPhone && <td>{student.guardianPhone}</td>}
              {student.guardianEmail && (
                <td>
                  <strong>Guardian Email:</strong>
                </td>
              )}
              {student.guardianEmail && <td>{student.guardianEmail}</td>}
            </tr>
            <tr>
              {student.annualIncome && (
                <td>
                  <strong>Annual Income:</strong>
                </td>
              )}
              {student.annualIncome && <td>{student.annualIncome}</td>}
              {student.guardianQualification && (
                <td>
                  <strong>Guardian Qualification:</strong>
                </td>
              )}
              {student.guardianQualification && (
                <td>{student.guardianQualification}</td>
              )}
            </tr>
            <tr>
              {student.rAddress && (
                <td>
                  <strong>Residential Address:</strong>
                </td>
              )}
              {student.rAddress && <td>{student.rAddress}</td>}
              {student.rCity && (
                <td>
                  <strong>Residential City:</strong>
                </td>
              )}
              {student.rCity && <td>{student.rCity}</td>}
            </tr>
            <tr>
              {student.rDistrict && (
                <td>
                  <strong>Residential District:</strong>
                </td>
              )}
              {student.rDistrict && <td>{student.rDistrict}</td>}
              {student.rState && (
                <td>
                  <strong>Residential State:</strong>
                </td>
              )}
              {student.rState && <td>{student.rState}</td>}
            </tr>
            <tr>
              {student.rCountry && (
                <td>
                  <strong>Residential Country:</strong>
                </td>
              )}
              {student.rCountry && <td>{student.rCountry}</td>}
              {student.rPinCode && (
                <td>
                  <strong>Residential Pin Code:</strong>
                </td>
              )}
              {student.rPinCode && <td>{student.rPinCode}</td>}
            </tr>
            <tr>
                {student.paymentId && (
                  <td>
                    <strong>Payment ID:</strong>
                  </td>
                )}
                {student.paymentId && <td>{student.paymentId}</td>}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetailsPopup;
