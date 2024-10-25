// components/AlumniApplicationForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './styles/AlumniApplicationForm.module.scss';

const AlumniApplicationForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/alumni/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Application submitted successfully!");
        onClose();
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Apply for Alumni</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}

            <input
              type="text"
              placeholder="Starting Year"
              {...register("startingYear", { required: "Starting Year is required" })}
            />
            {errors.startingYear && <p className={styles.error}>{errors.startingYear.message}</p>}

            <input
              type="text"
              placeholder="Ending Year"
              {...register("endingYear", { required: "Ending Year is required" })}
            />
            {errors.endingYear && <p className={styles.error}>{errors.endingYear.message}</p>}

            <input
              type="text"
              placeholder="Designation"
              {...register("designation", { required: "Designation is required" })}
            />
            {errors.designation && <p className={styles.error}>{errors.designation.message}</p>}

            <input
              type="text"
              placeholder="Current State"
              {...register("currentState", { required: "Current State is required" })}
            />
            {errors.currentState && <p className={styles.error}>{errors.currentState.message}</p>}

            <input
              type="text"
              placeholder="Profile Pic URL"
              {...register("profilePic", { required: "Profile Pic URL is required" })}
            />
            {errors.profilePic && <p className={styles.error}>{errors.profilePic.message}</p>}

            <input
              type="text"
              placeholder="Bio Data"
              {...register("bioData", { required: "Bio Data is required" })}
            />
            {errors.bioData && <p className={styles.error}>{errors.bioData.message}</p>}
          </div>

          <div className={styles.row}>
            <input
              type="text"
              placeholder="Social Media Links (comma-separated)"
              {...register("socialMediaLinks")}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              {...register("mobileNumber", { required: "Mobile Number is required" })}
            />
            {errors.mobileNumber && <p className={styles.error}>{errors.mobileNumber.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}

            <button type="submit" className={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumniApplicationForm;
