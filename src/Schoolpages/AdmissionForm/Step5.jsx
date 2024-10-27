import React from 'react';
import './styles/AdmissionForm.css';

const GuardianDetails = ({ register, errors }) => {
  return (
    <div>
      <h2>Guardian Details</h2>
      <div>
        <label>Father's Name</label>
        <input
          {...register("fatherName", { required: "Father's Name is required" })}
          placeholder="Enter father's name"
        />
        {errors.fatherName && <p className="error">{errors.fatherName.message}</p>}
      </div>
      <div>
        <label>Mother's Name</label>
        <input
          {...register("motherName", { required: "Mother's Name is required" })}
          placeholder="Enter mother's name"
        />
        {errors.motherName && <p className="error">{errors.motherName.message}</p>}
      </div>
      <div>
        <label>Guardian Name</label>
        <input
          {...register("guardianName", { required: "Guardian Name is required" })}
          placeholder="Enter guardian's name"
        />
        {errors.guardianName && <p className="error">{errors.guardianName.message}</p>}
      </div>
      <div>
        <label>Guardian Relation</label>
        <input
          {...register("guardianRelation", { required: "Guardian Relation is required" })}
          placeholder="Enter guardian's relation"
        />
        {errors.guardianRelation && <p className="error">{errors.guardianRelation.message}</p>}
      </div>
      <div>
        <label>Guardian Phone</label>
        <input
          {...register("guardianPhone", { required: "Guardian Phone is required" })}
          placeholder="Enter guardian's phone number"
        />
        {errors.guardianPhone && <p className="error">{errors.guardianPhone.message}</p>}
      </div>
      <div>
        <label>Guardian Email</label>
        <input
          {...register("guardianEmail", { required: "Guardian Email is required", pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })}
          placeholder="Enter guardian's email"
        />
        {errors.guardianEmail && <p className="error">{errors.guardianEmail.message}</p>}
      </div>
      <div>
        <label>Annual Income</label>
        <input
          {...register("annualIncome", { required: "Annual Income is required", valueAsNumber: true })}
          placeholder="Enter annual income"
          type="number"
        />
        {errors.annualIncome && <p className="error">{errors.annualIncome.message}</p>}
      </div>
      <div>
        <label>Guardian Qualification</label>
        <input
          {...register("guardianQualification", { required: "Guardian Qualification is required" })}
          placeholder="Enter guardian's qualification"
        />
        {errors.guardianQualification && <p className="error">{errors.guardianQualification.message}</p>}
      </div>
    </div>
  );
};

export default GuardianDetails;
