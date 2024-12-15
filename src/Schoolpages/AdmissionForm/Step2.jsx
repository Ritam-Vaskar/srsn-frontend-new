import React from 'react';
import './styles/AdmissionForm.css'


const PreviousSchoolDetails = ({ register, errors, onClassChange }) => {
  
  return (
    <div>
      <h2>Class Details</h2>
      
      <div>
        <label>Student Code(Required for Class 1 to 8 Admission)
        <span style={{ color: "red" }}>*</span>
        </label>

        <p style={{marginTop:'10px'}}>Student for admission in Class Beez , Ankur and Kisholoy write 'N/A'</p>
        <input 
          {...register("studentCode", { required: "Student Code is required" })} 
          placeholder="Enter Student Code"
        />
        {errors.studentCode && <p className="error">{errors.studentCode.message}</p>}
      </div>
      
      <div>
        <label>Class(Which Class do you want to Apply?)
        <span style={{ color: "red" }}>*</span>
        </label>
        <select 
          {...register("grade", { required: "grade is required" })}
          defaultValue="" // Set default value to an empty string for validation
          onChange={(e) => onClassChange(e.target.value)}
        >
          <option value="" disabled>Select grade</option>
          <option value="Beez">Beez</option>
          <option value="Ankur">Ankur</option>
          <option value="Kisholoy">Kisholoy</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        {errors.grade && <p className="error">{errors.grade.message}</p>}
      </div>
    </div>
  );
};

export default PreviousSchoolDetails;
