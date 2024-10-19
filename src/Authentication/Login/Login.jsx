import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(data) => {
    console.log(data);
    try{
      const response=await fetch(SummaryApi.UserLogin.url,{
        method:SummaryApi.UserLogin.method,
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(data),
        credentials:'include'
      });
      const result=await response.json();
      if(!result.success){
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
    }catch(err){
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <div className={styles['form-group']}>
          <label>Username:</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            placeholder="Username"
          />
          {errors.username && <p className={styles.error}>{errors.username.message}</p>}
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
