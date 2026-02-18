import React from 'react';
import { useEffect, useContext, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSelector } from 'react-redux';
import Loader2 from '../../layouts/Loader2/Loader2';
import { tr } from 'framer-motion/client';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setUserTokens, clearUserTokens, hasUserAccessToken, startUserTokenRefreshService } from '../../helper/tokenManager';
import Context from '../../Context';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACfBpOVcWnbN0dSR';


const Login = () => {
  const user = useSelector(state => state?.user?.user);
  const { fetchUser } = useContext(Context);
  
  const checkUser = () => {
    console.log(user);
    if (user) {
      Navigate('/school/profile');
    }
  }
  useEffect(() => {
    checkUser();
  }, [user]);

  const [isForgotPassword, setIsForgotPassword] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const Navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = React.useState(null);
  const turnstileRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const resetTurnstile = useCallback(() => {
    if (turnstileWidgetId.current !== null && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
      setTurnstileToken(null);
    }
  }, []);

  useEffect(() => {
    // Render Turnstile widget once the script is loaded
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
      // Wait for the script to load
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
  }, [isForgotPassword]);

  const handleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    try {
      const res = await axios.post(SummaryApi.UserGoogleLogin.url, {
        token: credentialResponse.credential,
      });

      const result = res.data;

      if (result.success) {
        // Store tokens for user authentication
        setUserTokens(result.accessToken, result.refreshToken);
        await fetchUser(); // Wait for user data to be fetched
        Navigate('/school/profile');
        toast.success('Login successful');
      } else {
        toast.error(result.message || 'Login failed');
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong during login');
      }
    }
  };


  const onSubmit = async (data) => {
    if (!turnstileToken) {
      toast.error('Please complete the CAPTCHA verification');
      return;
    }
    setLoading(true);
    console.log(data);
    try {
      const response = await fetch(SummaryApi.UserSignIn.url, {
        method: SummaryApi.UserSignIn.method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...data, turnstileToken })
      });
      const result = await response.json();
      if (!result.success) {
        toast.error(result.message);
        resetTurnstile();
        return;
      }
      
      // Store tokens for user authentication
      setUserTokens(result.accessToken, result.refreshToken);
      toast.success(result.message);
      await fetchUser(); // Wait for user data to be fetched
      Navigate('/school/profile');
    } catch (err) {
      toast.error(err.message);
      resetTurnstile();
    }
    finally {
      setLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isForgotPassword) {
    return <ForgotPassword setIsForgotPassword={setIsForgotPassword} isForgotPassword={isForgotPassword} />
  }

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
          <div className={styles['password-container']}>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
            />
            <span
              className={styles['eye-icon']}
              onClick={handlePasswordVisibility}
              role="button"
              tabIndex="0"
            >
              {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>


        {/* Cloudflare Turnstile CAPTCHA */}
        <div ref={turnstileRef} style={{ marginBottom: '10px' }}></div>

        {/* Submit Button */}
        <div className={styles['form-group']}>
          {loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-30px', marginBottom: '-30px' }}><Loader2 /></div> : <button type="submit" className={styles.button} disabled={!turnstileToken}>Login</button>}
        </div>

        <div
          className={styles['forgot-password']}
          onClick={() => setIsForgotPassword(true)}
        >
          Forgot Password ?
        </div>

        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log('Login Failed')}
        />
      </form>
      <div className={styles['contact-admin']}>
        *If you face problems logging in, please contact the administrator.
      </div>



    </div>
  );
};

export default Login;
