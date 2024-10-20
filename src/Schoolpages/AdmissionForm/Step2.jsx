import React from 'react';
import './styles/AdmissionForm.css';

const PreviousSchoolDetails = ({ register, errors }) => {
  return (
    <div>
      <h2>Previous School Details</h2>
      
      <div>
        <label>Student Code</label>
        <input 
          {...register("StudentCode", { required: "Student Code is required" })} 
          placeholder="Enter Student Code"
        />
        {errors.StudentCode && <p className="error">{errors.StudentCode.message}</p>}
      </div>
      
      <div>
        <label>Grade</label>
        <select 
          {...register("Grade", { required: "Grade is required" })}
          defaultValue="" // Set default value to an empty string for validation
        >
          <option value="" disabled>Select Grade</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        {errors.Grade && <p className="error">{errors.Grade.message}</p>}
      </div>
    </div>
  );
};

export default PreviousSchoolDetails;
