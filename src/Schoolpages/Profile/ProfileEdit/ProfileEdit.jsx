import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import SummaryApi from '../../../common';
import uploadImg from '../../../helper/uploadImg';
import { toast } from 'react-toastify';
import styles from './ProfileEdit.module.scss';
import Context from '../../../Context';
import { makeAuthenticatedRequest } from '../../../helper/tokenManager';

const ProfileEdit = ({ user, closeModal, fetchUser }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      profilePic: user.profilePic,
      DateOfJoining: user.DateOfJoining,
      Qualification: user.Qualification,
      dob: user.dob,
      dobRegNo: user.dobRegNo,
      socialCatagory: user.socialCatagory,
      socialCatagoryRegNo: user.socialCatagoryRegNo,
      aadharNo: user.aadharNo,
      bloodGroup: user.bloodGroup,
      studentCode: user.studentCode,
      address: user.address,
      city: user.city,
      district: user.district,
      municipality: user.municipality,
      panchayt: user.panchayt,
      postOffice: user.postOffice,
      policeStation: user.policeStation,
      pinCode: user.pinCode,
      rAddress: user.rAddress,
      rCity: user.rCity,
      rDistrict: user.rDistrict,
      rMunicipality: user.rMunicipality,
      rPanchayt: user.rPanchayt,
      rPostOffice: user.rPostOffice,
      rPoliceStation: user.rPoliceStation,
      rPinCode: user.rPinCode,
      fatherName: user.fatherName,
      motherName: user.motherName,
      guardianName: user.guardianName,
      guardianRelation: user.guardianRelation,
      guardianPhone: user.guardianPhone,
      guardianEmail: user.guardianEmail,
      guardianQualification: user.guardianQualification,
    }
  });
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      const response = await makeAuthenticatedRequest(SummaryApi.UserEdit.url, {
        method: SummaryApi.UserEdit.method,
        body: JSON.stringify(data)
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
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Ensures exactly 10 numeric digits
                message: "Enter a valid 10-digit phone number",
              },
            })}
            className={styles.input}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span className={styles.error}>{errors.phone.message}</span>
          )}
        </div>


        <div className={styles['form-group']}>
          <label>Profile Picture</label>
          <input type="file" onChange={handleChange} className={styles.fileInput} />
          {profilePicUrl && <img src={profilePicUrl} alt="Profile" width="100" className={styles.img} />}
        </div>

        {user.DateOfJoining && <div className={styles['form-group']}>
          <label>Date of Joining</label>
          <input
            type="date"
            {...register("DateOfJoining")}
            className={styles.input}
          />
          {errors.DateOfJoining && <span className={styles.error}>{errors.DateOfJoining.message}</span>}
        </div>}

        {user.Qualification && <div className={styles['form-group']}>
          <label>Qualification</label>
          <input
            {...register("Qualification")}
            className={styles.input}
          />
          {errors.Qualification && <span className={styles.error}>{errors.Qualification.message}</span>}
        </div>}

        {/* date of Birth */}
        {user.dob && <div className={styles['form-group']}>
          <label>Date of Birth</label>
          <input
            type="date"
            {...register("dob")}
            className={styles.input}
          />
          {errors.dob && <span className={styles.error}>{errors.dob.message}</span>}
        </div>}
        {/* dobRegNo */}
        {user.dobRegNo && <div className={styles['form-group']}>
          <label>DOB Reg No</label>
          <input
            {...register("dobRegNo")}
            className={styles.input}
          />
          {errors.dobRegNo && <span className={styles.error}>{errors.dobRegNo.message}</span>}
        </div>}
        {/* socialCatagory */}
        {user.socialCatagory && (
          <div className={styles['form-group']}>
            <label>Social Category</label>
            <select
              {...register("socialCatagory")}
              className={styles.input}
            >
              <option value="">Select...</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC-A">OBC-A</option>
              <option value="OBC-B">OBC-B</option>
            </select>
            {errors.socialCatagory && (
              <span className={styles.error}>{errors.socialCatagory.message}</span>
            )}
          </div>
        )}

        {/* socialCatagoryRegNo */}
        {user.socialCatagoryRegNo && <div className={styles['form-group']}>
          <label>Social Catagory Reg No</label>
          <input
            {...register("socialCatagoryRegNo")}
            className={styles.input}
          />
          {errors.socialCatagoryRegNo && <span className={styles.error}>{errors.socialCatagoryRegNo.message}</span>}
        </div>}
        {/* aadharNo */}
        {user.aadharNo && (
          <div className={styles['form-group']}>
            <label>Aadhar No</label>
            <input
              type="text"
              {...register("aadharNo", {
                required: "Aadhar number is required",
                pattern: {
                  value: /^[0-9]{12}$/, // Ensures exactly 12 digits
                  message: "Enter a valid 12-digit Aadhar number",
                },
              })}
              className={styles.input}
              placeholder="Enter 12-digit Aadhar number"
            />
            {errors.aadharNo && (
              <span className={styles.error}>{errors.aadharNo.message}</span>
            )}
          </div>
        )}

        {/* bloodGroup */}
        {user.bloodGroup && (
          <div className={styles['form-group']}>
            <label>Blood Group</label>
            <select
              {...register("bloodGroup")}
              className={styles.input}
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
            {errors.bloodGroup && (
              <span className={styles.error}>{errors.bloodGroup.message}</span>
            )}
          </div>
        )}

        {/* studentCode */}
        {user.studentCode && <div className={styles['form-group']}>
          <label>Student Code</label>
          <input
            {...register("studentCode")}
            className={styles.input}
          />
          {errors.studentCode && <span className={styles.error}>{errors.studentCode.message}</span>}
        </div>}
        {/* address */}
        {user.address && <div className={styles['form-group']}>
          <label>Address</label>
          <input
            {...register("address")}
            className={styles.input}
          />
          {errors.address && <span className={styles.error}>{errors.address.message}</span>}
        </div>}
        {/* city */}
        {user.city && <div className={styles['form-group']}>
          <label>City</label>
          <input
            {...register("city")}
            className={styles.input}
          />
          {errors.city && <span className={styles.error}>{errors.city.message}</span>}
        </div>}
        {/* district */}
        {user.district && <div className={styles['form-group']}>
          <label>District</label>
          <input
            {...register("district")}
            className={styles.input}
          />
          {errors.district && <span className={styles.error}>{errors.district.message}</span>}
        </div>}
        {/* municipality */}
        {user.municipality && <div className={styles['form-group']}>
          <label>Municipality</label>
          <input
            {...register("municipality")}
            className={styles.input}
          />
          {errors.municipality && <span className={styles.error}>{errors.municipality.message}</span>}
        </div>}
        {/* panchayt */}
        {user.panchayt && <div className={styles['form-group']}>
          <label>Panchayt</label>
          <input
            {...register("panchayt")}
            className={styles.input}
          />
          {errors.panchayt && <span className={styles.error}>{errors.panchayt.message}</span>}
        </div>}
        {/* postOffice */}
        {user.postOffice && <div className={styles['form-group']}>
          <label>Post Office</label>
          <input
            {...register("postOffice")}
            className={styles.input}
          />
          {errors.postOffice && <span className={styles.error}>{errors.postOffice.message}</span>}
        </div>}
        {/* policeStation */}
        {user.policeStation && <div className={styles['form-group']}>
          <label>Police Station</label>
          <input
            {...register("policeStation")}
            className={styles.input}
          />
          {errors.policeStation && <span className={styles.error}>{errors.policeStation.message}</span>}
        </div>}
        {/* pincode */}
        {user.pincode && <div className={styles['form-group']}>
          <label>Pincode</label>
          <input
            {...register("pincode")}
            className={styles.input}
          />
          {errors.pincode && <span className={styles.error}>{errors.pincode.message}</span>}
        </div>}
        {/* rAddress */}
        {user.rAddress && <div className={styles['form-group']}>
          <label>Residential Address</label>
          <input
            {...register("rAddress")}
            className={styles.input}
          />
          {errors.rAddress && <span className={styles.error}>{errors.rAddress.message}</span>}
        </div>}
        {/* rCity */}
        {user.rCity && <div className={styles['form-group']}>
          <label>Residential City</label>
          <input
            {...register("rCity")}
            className={styles.input}
          />
          {errors.rCity && <span className={styles.error}>{errors.rCity.message}</span>}
        </div>}
        {/* rDistrict */}
        {user.rDistrict && <div className={styles['form-group']}>
          <label>Residential District</label>
          <input
            {...register("rDistrict")}
            className={styles.input}
          />
          {errors.rDistrict && <span className={styles.error}>{errors.rDistrict.message}</span>}
        </div>}
        {/* rMunicipality */}
        {user.rMunicipality && <div className={styles['form-group']}>
          <label>Residential Municipality</label>
          <input
            {...register("rMunicipality")}
            className={styles.input}
          />
          {errors.rMunicipality && <span className={styles.error}>{errors.rMunicipality.message}</span>}
        </div>}
        {/* rPanchayt */}
        {user.rPanchayt && <div className={styles['form-group']}>
          <label>Residential Panchayt</label>
          <input
            {...register("rPanchayt")}
            className={styles.input}
          />
          {errors.rPanchayt && <span className={styles.error}>{errors.rPanchayt.message}</span>}
        </div>}
        {/* rPostOffice */}
        {user.rPostOffice && <div className={styles['form-group']}>
          <label>Residential Post Office</label>
          <input
            {...register("rPostOffice")}
            className={styles.input}
          />
          {errors.rPostOffice && <span className={styles.error}>{errors.rPostOffice.message}</span>}
        </div>}
        {/* rPoliceStation */}
        {user.rPoliceStation && <div className={styles['form-group']}>
          <label>Residential Police Station</label>
          <input
            {...register("rPoliceStation")}
            className={styles.input}
          />
          {errors.rPoliceStation && <span className={styles.error}>{errors.rPoliceStation.message}</span>}
        </div>}
        {/* rPincode */}
        {user.rPincode && <div className={styles['form-group']}>
          <label>Residential Pincode</label>
          <input
            {...register("rPincode")}
            className={styles.input}
          />
          {errors.rPincode && <span className={styles.error}>{errors.rPincode.message}</span>}
        </div>}
        {/* fatherName */}
        {user.fatherName && <div className={styles['form-group']}>
          <label>Father Name</label>
          <input
            {...register("fatherName")}
            className={styles.input}
          />
          {errors.fatherName && <span className={styles.error}>{errors.fatherName.message}</span>}
        </div>}
        {/* motherName */}
        {user.motherName && <div className={styles['form-group']}>
          <label>Mother Name</label>
          <input
            {...register("motherName")}
            className={styles.input}
          />
          {errors.motherName && <span className={styles.error}>{errors.motherName.message}</span>}
        </div>}
        {/* guardianName */}
        {user.guardianName && <div className={styles['form-group']}>
          <label>Guardian Name</label>
          <input
            {...register("guardianName")}
            className={styles.input}
          />
          {errors.guardianName && <span className={styles.error}>{errors.guardianName.message}</span>}
        </div>}
        {/* guardianMobile */}
        {user.guardianPhone && (
          <div className={styles['form-group']}>
            <label>Guardian Mobile</label>
            <input
              type="tel"
              {...register("guardianPhone", {
                required: "Guardian mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Ensures exactly 10 digits
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              className={styles.input}
              placeholder="Enter guardian's mobile number"
            />
            {errors.guardianPhone && (
              <span className={styles.error}>{errors.guardianPhone.message}</span>
            )}
          </div>
        )}

        {/* guardianEmail */}
        {user.guardianEmail && (
          <div className={styles['form-group']}>
            <label>Guardian Email</label>
            <input
              type="email"
              {...register("guardianEmail", {
                required: "Guardian email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={styles.input}
              placeholder="Enter guardian's email"
            />
            {errors.guardianEmail && (
              <span className={styles.error}>{errors.guardianEmail.message}</span>
            )}
          </div>
        )}

        {/* guardianQualification */}
        {user.guardianQualification && <div className={styles['form-group']}>
          <label>Guardian Qualification</label>
          <input
            {...register("guardianQualification")}
            className={styles.input}
          />
          {errors.guardianQualification && <span className={styles.error}>{errors.guardianQualification.message}</span>}
        </div>}
        {/* guardianRelation */}
        {user.guardianRelation && <div className={styles['form-group']}>
          <label>Guardian Relation</label>
          <input
            {...register("guardianRelation")}
            className={styles.input}
          />
          {errors.guardianRelation && <span className={styles.error}>{errors.guardianRelation.message}</span>}
        </div>}
        <button type="submit" className={styles.submitButton}>Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
