import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './Teacher.module.scss'; // Update the styles file name
import SummaryApi from '../../common';
import uploadImg from '../../helper/uploadImg';

const TeacherAddForm = ({ onClose, fetchTeachers }) => {
const TeacherAddForm = ({ onClose, fetchTeachers }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [profilePic, setprofilePic] = useState('');

  const onSubmit = async (data) => {
    // Add a fixed role to the form data
    const formData = { ...data, role: 'Teacher', profilePic };
    console.log(formData);
    try {
      const response = await fetch(SummaryApi.UserSignUp.url, {
        method: SummaryApi.UserSignUp.method,
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
      fetchTeachers();
      onClose();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
      toast.error("Please select a file.");
      setValue("profilePic", "");
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
            />
            {errors.Qualification && <p className={styles.error}>{errors.Qualification.message}</p>}

            <select {...register("grade", { required: "Grade is required" })}
              disabled={!profilePic}>
              <option value="">Select Grade</option>
              <option value="primary">Primary</option>
              <option value="high">High</option>

            </select>
            {errors.grade && <p className={styles.error}>{errors.grade.message}</p>}

            <button type="submit" disabled={!profilePic} className={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAddForm;



// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import styles from './Teacher.module.scss'; // Update the styles file name
// import SummaryApi from '../../common';
// import uploadImg from '../../helper/uploadImg';

// const TeacherAddForm = ({ onClose, fetchTeachers }) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [profilePic, setprofilePic] = useState('');

//   const onSubmit = async (data) => {
//     const formData = { ...data, role: 'Teacher' };
//     try {
//       const response = await fetch(SummaryApi.UserSignUp.url, {
//         method: SummaryApi.UserSignUp.method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//         credentials: 'include'
//       });
//       const result = await response.json();
//       if (!result.success) {
//         toast.error(result.message);
//         return;
//       }
//       toast.success('Application submitted successfully!');
//       fetchTeachers();
//       onClose();
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleChange = async (e) => {
//     const fileList = e.target.files;
//     if (fileList.length > 0) {
//       const file = fileList[0];
//       try {
//         const imageUrl = await uploadImg(file);
//         if (imageUrl.url) {
//           setprofilePic(imageUrl.url);
//           setValue("profilePic", imageUrl.url);
//         } else {
//           toast.error("Image upload was successful, but URL is missing.");
//         }
//       } catch (error) {
//         toast.error("Failed to upload image. Please try again.");
//       }
//     } else {
//       setValue("profilePic", "");
//       toast.error("Please select a file.");
//     }
//   };

//   return (
//     <div className={styles.popupOverlay}>
//       <div className={styles.popupContent}>
//         <button className={styles.closeButton} onClick={onClose}>X</button>
//         <h2>Teacher Application Form</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//           <div className={styles.row}>
//             <div>
//               <label>Profile Picture</label>
//               <input
//                 type="file"
//                 {...register("profilePic")}
//                 accept="image/*"
//                 onChange={handleChange}
//               />
//               {profilePic && (
//                 <div>
//                   <p>Uploaded Image:</p>
//                   <img src={profilePic} alt="Profile Pic" width="100" />
//                 </div>
//               )}
//             </div>

//             <input
//               type="text"
//               placeholder="Name"
//               {...register("name", { required: "Name is required" })}
//               disabled={!profilePic}
//             />
//             {errors.name && <p className={styles.error}>{errors.name.message}</p>}

//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", { required: "Email is required" })}
//               disabled={!profilePic}
//             />
//             {errors.email && <p className={styles.error}>{errors.email.message}</p>}

//             <input
//               type="text"
//               placeholder="Phone Number"
//               {...register("phone", { required: "Phone Number is required" })}
//               disabled={!profilePic}
//             />
//             {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

//             <input
//               type="text"
//               placeholder="Aadhar Number"
//               {...register("aadharNo", { required: "Aadhar Number is required" })}
//               disabled={!profilePic}
//             />
//             {errors.aadharNo && <p className={styles.error}>{errors.aadharNo.message}</p>}

//             <input
//               type="date"
//               placeholder="Date of Joining"
//               {...register("DateOfJoining", { required: "Date of Joining is required" })}
//               disabled={!profilePic}
//             />
//             {errors.DateOfJoining && <p className={styles.error}>{errors.DateOfJoining.message}</p>}

//             <input
//               type="text"
//               placeholder="Qualification"
//               {...register("Qualification", { required: "Qualification is required" })}
//               disabled={!profilePic}
//             />
//             {errors.Qualification && <p className={styles.error}>{errors.Qualification.message}</p>}

//             <select
//               {...register("grade", { required: "Grade is required" })}
//               disabled={!profilePic}
//             >
//               <option value="">Select Grade</option>
//               <option value="primary">Primary</option>
//               <option value="high">High</option>
//             </select>
//             {errors.grade && <p className={styles.error}>{errors.grade.message}</p>}

//             <button type="submit" disabled={!profilePic} className={styles.submitButton}>Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TeacherAddForm;
