import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './ForgotPassword.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from '../../common';

const ForgotPassword = ({ setIsForgotPassword }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [step, setStep] = useState(1); // Tracks the current step
    const [email, setEmail] = useState('');

    const handleSendOtp = async (data) => {
        try {
            const response = await fetch(SummaryApi.ForgotPasswordOtpSend.url, {
                method: SummaryApi.ForgotPasswordOtpSend.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setStep(2); 
                setEmail(data.email);
                toast.success('OTP sent to your email');
                reset();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(`Failed to send OTP: ${err.message}`);
        }
    };

    const handleVerifyOtp = async (data) => {
        try {
            const response = await fetch(SummaryApi.ForgotPasswordOtpVerify.url, {
                method: SummaryApi.ForgotPasswordOtpVerify.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: data.otp }),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                setStep(3); 
                toast.success('OTP verified successfully');
                reset();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(`Error verifying OTP: ${err.message}`);
        }
    };

    const handleResetPassword = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(SummaryApi.ResetPassword.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: data.newPassword }),
                credentials: 'include'
            });
            const result = await response.json();
            if (result.success) {
                toast.success('Password reset successful');
                setIsForgotPassword(false); 
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(`Error resetting password: ${err.message}`);
        }
    };

    return (
        <div className={styles.container}>
            {step === 1 && (
                <form onSubmit={handleSubmit(handleSendOtp)} className={styles.form}>
                    <h1 className={styles.title}>Forgot Password</h1>
                    <label className={styles.label}>Email</label>
                    <input
                        {...register("email", { required: "Email is required" })}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    <input type="submit" value="Send OTP" className={styles.submitButton} />
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleSubmit(handleVerifyOtp)} className={styles.form}>
                    <h1 className={styles.title}>Verify OTP</h1>
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

            {step === 3 && (
                <form onSubmit={handleSubmit(handleResetPassword)} className={styles.form}>
                    <h1 className={styles.title}>Reset Password</h1>
                    <label className={styles.label}>New Password</label>
                    <input
                        {...register("newPassword", { required: "New password is required" })}
                        className={`${styles.input} ${errors.newPassword ? styles.inputError : ''}`}
                        type="password"
                        placeholder="Enter new password"
                    />
                    {errors.newPassword && <span className={styles.error}>{errors.newPassword.message}</span>}

                    <label className={styles.label}>Confirm Password</label>
                    <input
                        {...register("confirmPassword", { required: "Confirm password is required" })}
                        className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                        type="password"
                        placeholder="Confirm new password"
                    />
                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword.message}</span>}
                    <input type="submit" value="Reset Password" className={styles.submitButton} />
                </form>
            )}

            <p className={styles.link} onClick={() => setIsForgotPassword(false)}>
                Back to Login
            </p>
        </div>
    );
};

export default ForgotPassword;
