import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import SummaryApi from '../../../common';
import uploadImg from '../../../helper/uploadImg';
import { toast } from 'react-toastify';
import styles from './ProfileEdit.module.scss';
import Context from '../../../Context';

const ProfileEdit = ({ user, closeModal, fetchUser }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      profilePic: user.profilePic,
      DateOfJoining: user.DateOfJoining,
      Qualification: user.Qualification
    }
  });
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const response = await fetch(SummaryApi.UserEdit.url, {
        method: SummaryApi.UserEdit.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success('Profile updated successfully!');
      fetchUser();  // Fetch the updated user data
      closeModal(); // Automatically close the modal after successful update
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImg(file);
        setProfilePicUrl(imageUrl.url);
        setValue("profilePic", imageUrl.url);
        console.log("Image uploaded successfully: ", imageUrl.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalHeader}>
        <h2>Edit Profile</h2>
        <button className={styles.closeButton} onClick={closeModal}>X</button> {/* Close button */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['form-group']}>
          <label>Name</label>
          <input 
            {...register("name")} 
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name.message}</span>}
        </div>

        <div className={styles['form-group']}>
          <label>Phone</label>
          <input 
            type="tel" 
            {...register("phone")} 
            className={styles.input}
          />
          {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
        </div>

        <div className={styles['form-group']}>
          <label>Profile Picture</label>
          <input type="file" onChange={handleChange} className={styles.fileInput} />
          {profilePicUrl && <img src={profilePicUrl} alt="Profile" width="100" className={styles.img} />}
        </div>

        <div className={styles['form-group']}>
          <label>Date of Joining</label>
          <input 
            type="date" 
            {...register("DateOfJoining")} 
            className={styles.input}
          />
          {errors.DateOfJoining && <span className={styles.error}>{errors.DateOfJoining.message}</span>}
        </div>

        <div className={styles['form-group']}>
          <label>Qualification</label>
          <input 
            {...register("Qualification")} 
            className={styles.input}
          />
          {errors.Qualification && <span className={styles.error}>{errors.Qualification.message}</span>}
        </div>

        <button type="submit" className={styles.submitButton}>Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
