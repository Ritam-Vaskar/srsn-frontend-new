import React from 'react';
import styles from './styles/Contact.module.css';
import logo from '../../assets/images/Logo.png';
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);  

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactLeft}>
        <img src={logo} alt="Organization Logo" className={styles.logo} />
        <h2>Contact Information</h2>
        <p>Address: 123 Main Street, City, Country</p>
        <p>Phone: +123 456 7890</p>
        <p>Email: info@organization.com</p>
      </div>

      <div className={styles.contactRight}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
          <input
            type='text'
            {...register("Name", { required: true })}
            placeholder='Name'
          />
          {errors.Name && <span className={styles.error}>*This field is required</span>}

          <input
            type='tel'
            {...register("Phone", {
              required: true,
              pattern: {
                value: /^[0-9]{10}$/, 
                message: "Phone number must be 10 digits"
              }
            })}
            placeholder='Phone'
          />
          {errors.Phone && <span className={styles.error}>*{errors.Phone.message || "This field is required"}</span>}

          <input
            type='email'
            {...register("Email", { required: true })}
            placeholder='Email'
          />
          {errors.Email && <span className={styles.error}>*This field is required</span>}

          <input
            type='text'
            {...register("Identity", { required: true })}
            placeholder='Identity'
          />
          {errors.Identity && <span className={styles.error}>*This field is required</span>}

          <textarea
            {...register("Message", { required: true })}
            placeholder='Message'
            rows="5"
          />
          {errors.Message && <span className={styles.error}>*This field is required</span>}

          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
