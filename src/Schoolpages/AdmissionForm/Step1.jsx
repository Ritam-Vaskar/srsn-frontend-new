import React from 'react';
import './styles/AdmissionForm.css';

const BasicInfo = ({ register, errors }) => {
  return (
    <div>
      <h2>Basic Information</h2>
      <div>
        <label>Name</label>
        <input
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Profile Picture</label>
        <input
          type="file"
          {...register("profilePic", { required: "Profile picture is required" })}
        />
        {errors.profilePic && <p>{errors.profilePic.message}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input
          type="number"
          {...register("phone", { required: "Phone is required" })}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Date of Birth</label>
        <input
          type="date"
          {...register("dob", { required: "DOB is required" })}
        />
        {errors.dob && <p>{errors.dob.message}</p>}
      </div>
      <div>
        <label>Date of Birth Registration Number</label>
        <input
          {...register("dobRegNo", { required: "DOB registration number is required" })}
        />
        {errors.dobRegNo && <p>{errors.dobRegNo.message}</p>}
      </div>
      <div>
        <label>Social Category</label>
        <select
          {...register("socialCatagory", { required: "Social category is required" })}
        >
          <option value="">Select...</option>
          <option value="General">General</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
          <option value="OBC-A">OBC-A</option>
          <option value="OBC-B">OBC-B</option>
        </select>
        {errors.socialCatagory && <p>{errors.socialCatagory.message}</p>}
      </div>
      <div>
        <label>Social Category Registration Number</label>
        <input
          {...register("socialCatagoryRegNo", { required: "Social category registration number is required" })}
        />
        {errors.socialCatagoryRegNo && <p>{errors.socialCatagoryRegNo.message}</p>}
      </div>
      <div>
        <label>Religion</label>
        <select
          {...register("religion", { required: "Religion is required" })}
        >
          <option value="">Select...</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Islam">Islam</option>
          <option value="Christianity">Christianity</option>
          <option value="Other">Other</option>
        </select>
        {errors.religion && <p>{errors.religion.message}</p>}
      </div>
      <div>
        <label>Mother Tongue</label>
        <input
          {...register("motherTongue", { required: "Mother tongue is required" })}
        />
        {errors.motherTongue && <p>{errors.motherTongue.message}</p>}
      </div>
      <div>
        <label>Nationality</label>
        <input
          {...register("nationality", { required: "Nationality is required" })}
        />
        {errors.nationality && <p>{errors.nationality.message}</p>}
      </div>
      <div>
        <label>Aadhar Number</label>
        <input
          {...register("aadharNo", { required: "Aadhar number is required" })}
        />
        {errors.aadharNo && <p>{errors.aadharNo.message}</p>}
      </div>
      <div>
        <label>Blood Group</label>
        <select
          {...register("bloodGroup", { required: "Blood group is required" })}
        >
          <option value="">Select...</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="O+">O+</option>
          <option value="AB+">AB+</option>
          <option value="A-">A-</option>
          <option value="B-">B-</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
        </select>
        {errors.bloodGroup && <p>{errors.bloodGroup.message}</p>}
      </div>
      <div>
        <label>Health ID</label>
        <input {...register("healthID")} />
      </div>
    </div>
  );
};

export default BasicInfo;
