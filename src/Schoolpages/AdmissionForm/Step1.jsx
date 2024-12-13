import React from 'react';
import './styles/AdmissionForm.css';
import uploadImg from '../../helper/uploadImg';
import { useState } from 'react';
import { toast } from 'react-toastify';

const BasicInfo = ({profilePic,setprofilePic, register, errors, setValue }) => {
  const handleChange = async (e) => {
    const fileList = e.target.files;
    console.log("File List: ", fileList);

    if (fileList.length > 0) {
      const file = fileList[0];
      console.log("Selected file: ", file); // Log the selected file
      try {
        const imageUrl = await uploadImg(file);
        console.log("Upload response: ", imageUrl);
        if (imageUrl.url) {
          setprofilePic(imageUrl.url);
          setValue("profilePic", imageUrl.url);
          console.log("Image uploaded successfully: ", imageUrl.url);
        } else {
          toast.error("Image upload was successful, but URL is missing.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    } else {
      console.warn("No file selected.");
      toast.error("No file selected. Please try again.");
      setValue("profilePic", "");
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>Read The manual <a href="https://drive.google.com/file/d/1NlHvcO9KFWF03XEDvThEB_YqpMKatlG5/view?usp=drive_link" target='_blank'>Click Here</a></h3>
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
        <input type="file" onChange={handleChange} className="fileInput" />
        {profilePic && <img src={profilePic} alt="Profile" width="100" />}
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
        <label style={{ marginTop: '10px' }}>Social Category Registration Number</label>
        <p style={{ marginTop: '10px' }}>Student Catagory from General Catagory write 'N/A'</p>
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

        <select
          {...register("nationality", { required: "Nationality is required" })}
        >
          <option value="">Select...</option>
          <option value="Indian">Indian</option>
          <option value="Other">Other</option>
        </select>
        {errors.nationality && <p>{errors.nationality.message}</p>}
      </div>
      <div>
        <label>Aadhar Number</label>
        <input
          {...register("aadharNo", {
            required: "Aadhar number is required",
            pattern: {
              value: /^[0-9]{12}$/,
              message: "Aadhar number must be 12 digits"
            }
          })}
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
