import React from 'react';
import { useRef } from 'react';
import './styles/AdmissionForm.css';
import './styles/Preview.css';
import logo from '../../assets/images/Logo.png';
const Preview = ({ profilePic, data, tableRef }) => {


  return (
    <div className="preview-container" ref={tableRef}>
      <header className="school-header">
        <img src={logo} alt="School Logo" className="school-logo" />
        <div className="school-info">
          <h1>Sri Rama Krishna Siksha Niketan</h1>
          <p>HaridasNagar , Raghunathganj , Murshidabad</p>
        </div>
      </header>

      <h2 className="preview-title">Admission Application</h2>

      <table className="preview-table">
        <tbody>
          {/* Personal Information */}
          <tr>
            <td><strong>Profile Picture:</strong></td>
            <td colSpan="3">
              {profilePic ? <img src={profilePic} alt="Profile" className="profile-pic" crossOrigin="anonymous" />
                : 'No image uploaded'}
            </td>
          </tr>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{data.name || 'N/A'}</td>
            <td><strong>Email:</strong></td>
            <td>{data.email || 'N/A'}</td>
          </tr>

          <tr>
            <td><strong>Phone:</strong></td>
            <td>{data.phone || 'N/A'}</td>
            <td><strong>Date of Birth:</strong></td>
            <td>{data.dob || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Date of Birth Registration No:</strong></td>
            <td>{data.dobRegNo || 'N/A'}</td>
            <td><strong>Social Category:</strong></td>
            <td>{data.socialCatagory || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Social Category Registration No:</strong></td>
            <td>{data.socialCatagoryRegNo || 'N/A'}</td>
            <td><strong>Religion:</strong></td>
            <td>{data.religion || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Mother Tongue:</strong></td>
            <td>{data.motherTongue || 'N/A'}</td>
            <td><strong>Nationality:</strong></td>
            <td>{data.nationality || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Aadhar Number:</strong></td>
            <td>{data.aadharNo || 'N/A'}</td>
            <td><strong>Blood Group:</strong></td>
            <td>{data.bloodGroup || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Health ID:</strong></td>
            <td>{data.healthID || 'N/A'}</td>
            <td><strong>Class:</strong></td>
            <td>{data.grade || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Student Code:</strong></td>
            <td>{data.studentCode || 'N/A'}</td>
          </tr>

          {/* Permanent Contact Details */}
          <tr>
            <td><strong>Permanent Address:</strong></td>
            <td>{data.address || 'N/A'}</td>
            <td><strong>City:</strong></td>
            <td>{data.city || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>District:</strong></td>
            <td>{data.district || 'N/A'}</td>
            <td><strong>Municipality:</strong></td>
            <td>{data.municipality || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Panchayat:</strong></td>
            <td>{data.panchayt || 'N/A'}</td>
            <td><strong>Post Office:</strong></td>
            <td>{data.postOffice || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Police Station:</strong></td>
            <td>{data.policeStation || 'N/A'}</td>
            <td><strong>PIN Code:</strong></td>
            <td>{data.pinCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{data.state || 'N/A'}</td>
            <td><strong>Country:</strong></td>
            <td>{data.country || 'N/A'}</td>
          </tr>

          {/* Residential Contact Details */}
          {data.rAddressSameAsPermanent === 'No' ? (
            <>
              <tr>
                <td><strong>Residential Address:</strong></td>
                <td>{data.rAddress || 'N/A'}</td>
                <td><strong>Residential City:</strong></td>
                <td>{data.rCity || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Residential District:</strong></td>
                <td>{data.rDistrict || 'N/A'}</td>
                <td><strong>Residential Municipality:</strong></td>
                <td>{data.rMunicipality || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Residential Panchayat:</strong></td>
                <td>{data.rPanchayt || 'N/A'}</td>
                <td><strong>Residential Post Office:</strong></td>
                <td>{data.rPostOffice || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Residential Police Station:</strong></td>
                <td>{data.rPoliceStation || 'N/A'}</td>
                <td><strong>Residential PIN Code:</strong></td>
                <td>{data.rPinCode || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Residential State:</strong></td>
                <td>{data.rState || 'N/A'}</td>
                <td><strong>Residential Country:</strong></td>
                <td>{data.rCountry || 'N/A'}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="4">Residential Address is the same as Permanent Address</td>
            </tr>
          )}

          {/* Guardian Details */}
          <tr>
            <td><strong>Father's Name:</strong></td>
            <td>{data.fatherName || 'N/A'}</td>
            <td><strong>Mother's Name:</strong></td>
            <td>{data.motherName || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Guardian's Name:</strong></td>
            <td>{data.guardianName || 'N/A'}</td>
            <td><strong>Relation with Guardian:</strong></td>
            <td>{data.guardianRelation || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Guardian's Phone:</strong></td>
            <td>{data.guardianPhone || 'N/A'}</td>
            <td><strong>Guardian's Email:</strong></td>
            <td>{data.guardianEmail || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Annual Income:</strong></td>
            <td>{data.annualIncome || 'N/A'}</td>
            <td><strong>Guardian's Qualification:</strong></td>
            <td>{data.guardianQualification || 'N/A'}</td>
          </tr>

          {/* Payment Details */}
          <tr>
            <td><strong>Payment ID:</strong></td>
            <td>{data.paymentId || 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      <div className="footer">
        <p>* If you face problems logging in, please contact the administrator.</p>
      </div>
    </div>
  );
};

export default Preview;
