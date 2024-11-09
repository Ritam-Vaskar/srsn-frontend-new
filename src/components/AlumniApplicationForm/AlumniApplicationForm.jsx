import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './styles/AlumniApplicationForm.module.scss';
import SummaryApi from '../../common';
import uploadImg from '../../helper/uploadImg';

const AlumniApplicationForm = ({ onClose }) => {
  const [profilePic, setprofilePic] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState(['', '']); // Array to store two links

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Add socialMediaLinks to the form data
    const formData = { ...data, socialMediaLinks,profilePic};
    console.log(formData);
    try {
      const response = await fetch(SummaryApi.AlumniApplicationSave.url, {
        method: SummaryApi.AlumniApplicationSave.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success('Application submitted successfully!');
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSocialMediaChange = (index, value) => {
    const updatedLinks = [...socialMediaLinks];
    updatedLinks[index] = value;
    setSocialMediaLinks(updatedLinks);
  };

  // const handleChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     try {
  //       const imageUrl = await uploadImg(file);
  //       setprofilePic(imageUrl.url);
  //       setValue("profilePic", imageUrl.url); 
  //       console.log("Image uploaded successfully: ", imageUrl.url);
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //       toast.error("Failed to upload image. Please try again.");
  //     }
  //   }
  // };
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
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2>Apply for Alumni</h2>
        <p className={styles.instruction}>*Please wait after uploading the image</p>
        <p className={styles.instruction}>*Please wait after uploading the image</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.row}>
            <div>
              <label>Profile Picture</label>

              <input type="file" onChange={handleChange} className={styles.fileInput} />
              {profilePic && <img src={profilePic} alt="Profile" width="100" className={styles.img} />}

            </div>

            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              disabled={!profilePic}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}

            <input
              type="text"
              placeholder="Starting Year"
              {...register("startingYear", { required: "Starting Year is required" })}
              disabled={!profilePic}
            />
            {errors.startingYear && <p className={styles.error}>{errors.startingYear.message}</p>}

            <input
              type="text"
              placeholder="Ending Year"
              {...register("endingYear", { required: "Ending Year is required" })}
              disabled={!profilePic}
            />
            {errors.endingYear && <p className={styles.error}>{errors.endingYear.message}</p>}

            <input
              type="text"
              placeholder="Designation"
              {...register("designation", { required: "Designation is required" })}
              disabled={!profilePic}
            />
            {errors.designation && <p className={styles.error}>{errors.designation.message}</p>}

            <input
              type="text"
              placeholder="Current Place"
              {...register("currentState", { required: "Current State is required" })}
              disabled={!profilePic}
            />
            {errors.currentState && <p className={styles.error}>{errors.currentState.message}</p>}



            <input
              type="text"
              placeholder="Bio Data"
              {...register("bioData", { required: "Bio Data is required" })}
              disabled={!profilePic}
            />
            {errors.bioData && <p className={styles.error}>{errors.bioData.message}</p>}
          </div>

          <div className={styles.row}>
            <input
              type="text"
              placeholder="Social Media Link 1"
              value={socialMediaLinks[0]}
              onChange={(e) => handleSocialMediaChange(0, e.target.value)}
              disabled={!profilePic}
            />

            <input
              type="text"
              placeholder="Social Media Link 2"
              value={socialMediaLinks[1]}
              onChange={(e) => handleSocialMediaChange(1, e.target.value)}
              disabled={!profilePic}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              {...register("mobileNumber", { required: "Mobile Number is required" })}
              disabled={!profilePic}
            />
            {errors.mobileNumber && <p className={styles.error}>{errors.mobileNumber.message}</p>}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              disabled={!profilePic}
            />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={!profilePic}
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AlumniApplicationForm;
