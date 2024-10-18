import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './StudentEntry.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const StudentEntry = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(SummaryApi.UserSignUp.url, {
        method: SummaryApi.UserSignUp.method,
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
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>User Entry Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className={styles['form-group']}>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Name Field */}
        <div className={styles['form-group']}>
          <label>Name:</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        {/* Date of Birth Field */}
        <div className={styles['form-group']}>
          <label>Date of Birth:</label>
          <input
            type="date"
            {...register('dob')}
          />
          {errors.dob && <p className={styles.error}>{errors.dob.message}</p>}
        </div>

        {/* Phone Field */}
        <div className={styles['form-group']}>
          <label>Phone:</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: { value: /^[0-9]{10}$/, message: 'Phone number must be 10 digits' }
            })}
          />
          {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
        </div>

        {/* Role Field */}
        <div className={styles['form-group']}>
          <label>Role:</label>
          <select {...register('role', { required: 'Role is required' })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className={styles.error}>{errors.role.message}</p>}
        </div>

        {/* Grade fiels */}
        <div className={styles['form-group']}>
          <label>Grade:</label>
          <select {...register('grade')}>
            <option value="">Select Grade</option>
            <option value="ankur">Ankur</option>
            <option value="kisholoy">Kisholoy</option>
            <option value="grade1">Grade 1</option>
            <option value="grade2">Grade 2</option>
            <option value="grade3">Grade 3</option>
            <option value="grade4">Grade 4</option>
          </select>
          {errors.grade && <p className={styles.error}>{errors.grade.message}</p>}
        </div>

        {/* Submit Button */}
        <div className={styles['form-group']}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StudentEntry;
