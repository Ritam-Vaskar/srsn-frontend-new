import React from 'react';
import styles from './styles/Contact.module.css';
import logo from '../../assets/images/Logo.png';
import { useForm } from "react-hook-form";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Loader2 from '../../layouts/Loader2/Loader2';
import { useState } from 'react';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async(data) => {
    setLoading(true);
    try{
      const response=await fetch(SummaryApi.Message.url, {
        method: SummaryApi.Message.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })
      const result=await response.json();
      if(result.success){
        toast.success('Message sent successfully!');
      }else{
        toast.error(result.message);
      }
    }catch(err){
      toast.error(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactLeft}>
        <img src={logo} alt="Organization Logo" className={styles.logo} />
        <h2>Contact Information</h2>
        <p>Address: Haridasnagar , Raghunathganj , Murshidabad , PIN-742225</p>
        <p>Phone: 9932842142 / 9434531454</p>
        <p>Email: sriramakrishnasikshaniketan@gmail.com</p>
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

          <textarea
            {...register("Message", { required: true })}
            placeholder='Message'
            rows="5"
          />
          {errors.Message && <span className={styles.error}>*This field is required</span>}

         { loading ? <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><Loader2 /></div> : <button type="submit" className={styles.submitButton}>Send Message</button>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
