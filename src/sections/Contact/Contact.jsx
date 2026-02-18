import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles/Contact.module.css';
import logo from '../../assets/images/Logo.png';
import { useForm } from "react-hook-form";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import Loader2 from '../../layouts/Loader2/Loader2';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACfBpOVcWnbN0dSR';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId.current !== null && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
    }
  }, []);

  useEffect(() => {
    const renderWidget = () => {
      if (turnstileRef.current && window.turnstile && turnstileWidgetId.current === null) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(null),
          'error-callback': () => setTurnstileToken(null),
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          renderWidget();
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }

    return () => {
      if (turnstileWidgetId.current !== null && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, []);

  const onSubmit = async(data) => {
    if (!turnstileToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }
    setLoading(true);
    try{
      const response=await fetch(SummaryApi.Message.url, {
        method: SummaryApi.Message.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, turnstileToken }),
        credentials: 'include'
      })
      const result=await response.json();
      if(result.success){
        toast.success('Message sent successfully!');
        resetTurnstile();
      }else{
        toast.error(result.message);
        resetTurnstile();
      }
    }catch(err){
      toast.error(err.message);
      resetTurnstile();
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

          {/* Cloudflare Turnstile CAPTCHA */}
          <div ref={turnstileRef} style={{ marginBottom: '10px' }}></div>

         { loading ? <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><Loader2 /></div> : <button type="submit" className={styles.submitButton} disabled={!turnstileToken}>Send Message</button>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
