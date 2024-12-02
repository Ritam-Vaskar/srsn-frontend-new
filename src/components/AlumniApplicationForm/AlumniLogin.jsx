import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './styles/AlumniLogin.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common';
import { useEffect,useContext } from 'react';
import Context from '../../Context';
 

const AlumniLogin = ({ showLogin, setShowLogin }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [emailSend, setEmailSend] = useState(false);
    const [email, setEmail] = useState('');
    const { fetchAlumni } = useContext(Context);

    const onSubmit = async (data) => {
        try {
            const response = await fetch(SummaryApi.AlumniOtpSend.url, {
                method: SummaryApi.AlumniOtpSend.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setEmailSend(true);
                setEmail(data.email); 
                toast.success('OTP sent to your email');
                reset();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Failed to send OTP: ' + err.message);
        }
    };

    const verifyOtp = async (data) => {
        try {
            const response = await fetch(SummaryApi.AlumniOtpVerify.url, {
                method: SummaryApi.AlumniOtpVerify.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: data.otp }), // Send email and OTP to verify
                credentials: 'include'
            });

            const result = await response.json();
            if (result.success) {
                fetchAlumni();
                toast.success('OTP verified successfully');
                reset();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Error verifying OTP: ' + err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Alumni Login</h1>

            {!emailSend ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>Email</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}

                    <input type="submit" value="Send OTP" className={styles.submitButton} />
                </form>
            ) : (
                <form onSubmit={handleSubmit(verifyOtp)} className={styles.form}>
                    <label className={styles.label}>OTP</label>
                    <input
                        {...register("otp", { required: "OTP is required" })}
                        className={`${styles.input} ${errors.otp ? styles.inputError : ''}`}
                        placeholder="Enter the OTP"
                    />
                    {errors.otp && <span className={styles.error}>{errors.otp.message}</span>}

                    <input type="submit" value="Verify OTP" className={styles.submitButton} />
                </form>
            )}

            <div className={styles.signup}>
                Don't have an account?{' '}
                <p className={styles.signupLink} onClick={() => setShowLogin(!showLogin)}>Sign up</p>
            </div>
        </div>
    );
};

export default AlumniLogin;
