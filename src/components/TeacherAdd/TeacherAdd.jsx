import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './Teacher.module.scss';
import SummaryApi from '../../common';
import uploadImg from '../../helper/uploadImg';

const TeacherAddForm = ({ onClose, fetchTeachers }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [profilePic, setProfilePic] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (data) => {
    const formData = { ...data, role: 'Teacher', profilePic };
    try {
      const response = await fetch(SummaryApi.UserSignUp.url, {
        method: SummaryApi.UserSignUp.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success('Application submitted successfully!');
      fetchTeachers();
      onClose();
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024) { // Allow only images up to 2MB
      setIsUploading(true);
      try {
        const imageUrl = await uploadImg(file);
        if (imageUrl.url) {
          setProfilePic(imageUrl.url);
          setValue("profilePic", imageUrl.url);
          toast.success("Image uploaded successfully!");
        } else {
          toast.error("Image upload was successful, but URL is missing.");
        }
      } catch (error) {
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("Please select a valid image file under 2MB.");
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Teacher Application Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.row}>
            <div className={styles['form-group']}>
              <label>Profile Picture</label>
              <input type="file" onChange={handleChange} className={styles.fileInput} />
              {isUploading ? <p>Uploading...</p> : profilePic && <img src={profilePic} alt="Profile" width="100" className={styles.img} />}
            </div>

            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              disabled={!profilePic}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              disabled={!profilePic}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}

            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone Number is required" })}
              disabled={!profilePic}
            />
            {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

            <input
              type="text"
              placeholder="Aadhar Number"
              {...register("aadharNo", { required: "Aadhar Number is required" })}
              disabled={!profilePic}
            />
            {errors.aadharNo && <p className={styles.error}>{errors.aadharNo.message}</p>}

            <input
              type="date"
              placeholder="Date of Joining"
              {...register("DateOfJoining", { required: "Date of Joining is required" })}
              disabled={!profilePic}
            />
            {errors.DateOfJoining && <p className={styles.error}>{errors.DateOfJoining.message}</p>}

            <input
              type="text"
              placeholder="Qualification"
              {...register("Qualification", { required: "Qualification is required" })}
              disabled={!profilePic}
            />
            {errors.Qualification && <p className={styles.error}>{errors.Qualification.message}</p>}

            <select {...register("grade", { required: "Grade is required" })}
              disabled={!profilePic}>
              <option value="">Select Grade</option>
              <option value="primary">Primary</option>
              <option value="high">High</option>
            </select>
            {errors.grade && <p className={styles.error}>{errors.grade.message}</p>}

            <button type="submit" disabled={!profilePic || isUploading} className={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAddForm;
