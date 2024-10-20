import React from 'react';
import './styles/AdmissionForm.css'; // Import CSS for table styling

const Preview = ({ data }) => {
  return (
    <div>
      <h2>Preview of Submitted Data</h2>
      <table className="preview-table">
        <tbody>
          {/* Personal Information */}
          <tr>
            <td><strong>Name:</strong></td>
            <td>{data.name || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{data.email || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Profile Picture:</strong></td>
            <td>{data.profilePic ? <img src={data.profilePic} alt="Profile" className="profile-pic" /> : 'No image uploaded'}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{data.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Date of Birth:</strong></td>
            <td>{data.dob || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Date of Birth Registration Number:</strong></td>
            <td>{data.dobRegNo || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Social Category:</strong></td>
            <td>{data.socialCategory || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Social Category Registration Number:</strong></td>
            <td>{data.socialCategoryRegNo || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Religion:</strong></td>
            <td>{data.religion || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Mother Tongue:</strong></td>
            <td>{data.motherTongue || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Nationality:</strong></td>
            <td>{data.nationality || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Aadhar Number:</strong></td>
            <td>{data.aadharNo || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Blood Group:</strong></td>
            <td>{data.bloodGroup || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Health ID:</strong></td>
            <td>{data.healthID || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Grade:</strong></td>
            <td>{data.Grade || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Student Code:</strong></td>
            <td>{data.StudentCode || 'N/A'}</td>
          </tr>

          {/* Permanent Contact Details */}
          <tr>
            <td><strong>Permanent Address:</strong></td>
            <td>{data.address || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>{data.city || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>District:</strong></td>
            <td>{data.district || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Municipality:</strong></td>
            <td>{data.municipality || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Panchayat:</strong></td>
            <td>{data.panchayat || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Post Office:</strong></td>
            <td>{data.postOffice || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Police Station:</strong></td>
            <td>{data.policeStation || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>PIN Code:</strong></td>
            <td>{data.pinCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{data.state || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Country:</strong></td>
            <td>{data.country || 'N/A'}</td>
          </tr>

          {/* Residential Contact Details */}
          <tr>
            <td><strong>Residential Address:</strong></td>
            <td>{data.rAddress || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential City:</strong></td>
            <td>{data.rCity || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential District:</strong></td>
            <td>{data.rDistrict || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential Municipality:</strong></td>
            <td>{data.rMunicipality || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential Panchayat:</strong></td>
            <td>{data.rPanchayat || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential Post Office:</strong></td>
            <td>{data.rPostOffice || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential Police Station:</strong></td>
            <td>{data.rPoliceStation || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential PIN Code:</strong></td>
            <td>{data.rPinCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential State:</strong></td>
            <td>{data.rState || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Residential Country:</strong></td>
            <td>{data.rCountry || 'N/A'}</td>
          </tr>

          {/* Guardian Details */}
          <tr>
            <td><strong>Father's Name:</strong></td>
            <td>{data.fatherName || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Mother's Name:</strong></td>
            <td>{data.motherName || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Guardian's Name:</strong></td>
            <td>{data.guardianName || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Relation with Guardian:</strong></td>
            <td>{data.guardianRelation || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Guardian's Phone:</strong></td>
            <td>{data.guardianPhone || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Guardian's Email:</strong></td>
            <td>{data.guardianEmail || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Annual Income:</strong></td>
            <td>{data.annualIncome || 'N/A'}</td>
          </tr>
          <tr>
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
    </div>
  );
};

export default Preview;
