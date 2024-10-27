import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await fetch(SummaryApi.UserProfile.url, {
        method: SummaryApi.UserProfile.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const result = await response.json();
      if (!result.success) {
        // toast.error(result.message);
        dispatch(setUserDetails(null));
        return;
      }
      dispatch(setUserDetails(result.user));
    } catch (err) {
      toast.error(err.message);
    }
  }

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch(SummaryApi.UserSignIn.url, {
        method: SummaryApi.UserSignIn.method,
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
      fetchUser();
      Navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className={styles['form-group']}>
          <label>Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className={styles['form-group']}>
          <label>Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <div className={styles['form-group']}>
          <button type="submit" className={styles.button}>Login</button>
        </div>
      </form>
      <div className={styles['contact-admin']}>
        *If you face problems logging in, please contact the administrator.
      </div>

    </div>
  );
};

export default Login;
