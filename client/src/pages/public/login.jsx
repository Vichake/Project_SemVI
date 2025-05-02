// src/pages/Auth/Login.jsx
import React, { useState, useEffect } from 'react';
import './css/login.css';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const url = 'http://localhost:5000/api';

const translations = {
  en: {
    login: 'Login',
    enterEmail: 'Enter Email',
    enterPassword: 'Enter Password',
    noAccount: "Don't have an account?",
    signup: 'Signup',
    agrotech: 'TechKisan',
    forgotPassword: 'Forgot Password?',
    loggingIn: 'Logging in...',
    resetPassword: 'Reset Password',
    rememberMe: 'Remember me',
    loginWith: 'Or login with',
    invalidEmail: 'Please enter a valid email address',
    passwordRequired: 'Password is required'
  },
  mr: {
    login: 'लॉगिन',
    enterEmail: 'ईमेल टाका',
    enterPassword: 'पासवर्ड टाका',
    noAccount: 'खाते नाहीये?',
    signup: 'नोंदणी करा',
    agrotech: 'टेककिसान',
    forgotPassword: 'पासवर्ड विसरलात?',
    loggingIn: 'लॉगिन करत आहे...',
    resetPassword: 'पासवर्ड रीसेट करा',
    rememberMe: 'मला लक्षात ठेवा',
    loginWith: 'किंवा यासह लॉगिन करा',
    invalidEmail: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा',
    passwordRequired: 'पासवर्ड आवश्यक आहे'
  }
};

const Login = () => {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user was redirected with a message
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get('message');
    const type = params.get('type') || 'info';
    
    if (message) {
      toast[type](message, { position: 'bottom-center' });
    }
    
    // Check for stored email if remember me was selected
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setFormData(prev => ({ ...prev, email: storedEmail }));
      setRememberMe(true);
    }
  }, [location]);

  const validateForm = () => {
    const newErrors = {};
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = translations[lang].invalidEmail;
    }
    
    // Password validation (only if not in password reset mode)
    if (!resetMode && !formData.password) {
      newErrors.password = translations[lang].passwordRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.info("Please verify your email before logging in.", {
          position: 'bottom-center',
          autoClose: 5000
        });
        setLoading(false);
        return;
      }

      // Remember email if selected
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // MongoDB backend check
      const response = await Axios.post(`${url}/login`, formData);

      if (response.status === 200) {
        toast.success('Login successful! Redirecting...', {
          position: 'bottom-center',
          autoClose: 2000
        });
        
        const { idToken, user } = response.data;
        localStorage.setItem('token', idToken);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect after toast is shown
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error('Login failed. Please try again.', { position: 'bottom-center' });
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle specific Firebase auth errors
      const errorCode = error.code;
      let errorMessage = '';
      
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password for this account.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later.';
          break;
        default:
          errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      }
      
      toast.error(`❌ ${errorMessage}`, {
        position: 'bottom-center',
        autoClose: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      toast.warn("Please enter a valid email address.", { position: 'bottom-center' });
      return;
    }
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, formData.email);
      toast.success(`Password reset email sent to ${formData.email}. Please check your inbox.`, {
        position: 'bottom-center',
        autoClose: 6000
      });
      setResetMode(false);
    } catch (error) {
      console.error("Reset error:", error);
      const errorMessage = 
        error.code === 'auth/user-not-found' 
          ? 'No account found with this email address.' 
          : 'Failed to send reset email. Please try again.';
      
      toast.error(`❌ ${errorMessage}`, { position: 'bottom-center' });
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (e) => {
    setLang(e.target.value);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} login is coming soon!`, { position: 'bottom-center' });
  };

  return (
    <div className="tk-auth-background">
      <div className="tk-auth-card">
      <div className="tk-auth-banner">
        <div className="tk-banner-content">
          <h1 className="tk-app-title">{translations[lang].agrotech}</h1>
          <div className="tk-language-wrapper">
            <select 
              className="tk-language-selector" 
              onChange={changeLanguage} 
              value={lang}
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="mr">मराठी</option>
            </select>
            <span className="tk-language-icon">🌐</span>
          </div>
        </div>
      </div>

        <form 
          className="tk-auth-form-container" 
          onSubmit={resetMode ? handleResetPassword : handleLogin}
        >
          <h2 className="tk-auth-form-title">
            {resetMode ? translations[lang].resetPassword : translations[lang].login}
          </h2>

          <div className="tk-input-group">
            <input
              className={`tk-auth-input ${errors.email ? 'tk-input-error' : ''}`}
              type="email"
              name="email"
              placeholder={translations[lang].enterEmail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="tk-error-message">{errors.email}</span>}
          </div>

          {!resetMode && (
            <div className="tk-input-group">
              <input
                className={`tk-auth-input ${errors.password ? 'tk-input-error' : ''}`}
                type="password"
                name="password"
                placeholder={translations[lang].enterPassword}
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="tk-error-message">{errors.password}</span>}
            </div>
          )}

          {!resetMode && (
            <div className="tk-remember-forgot">
              <div className="tk-remember-me">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  checked={rememberMe}
                  onChange={toggleRememberMe}
                />
                <label htmlFor="rememberMe">{translations[lang].rememberMe}</label>
              </div>
              <button 
                type="button" 
                className="tk-forgot-password"
                onClick={() => setResetMode(true)}
              >
                {translations[lang].forgotPassword}
              </button>
            </div>
          )}

          <button 
            className="tk-auth-submit" 
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="tk-spinner"></span>
                {translations[lang].loggingIn}
              </>
            ) : resetMode ? translations[lang].resetPassword : translations[lang].login}
          </button>

          {resetMode && (
            <button 
              type="button" 
              className="tk-back-to-login"
              onClick={() => setResetMode(false)}
            >
              ← Back to Login
            </button>
          )}

          {!resetMode && (
            <>
              
              <div className="tk-auth-links">
                <span>{translations[lang].noAccount}</span>
                <a className="tk-auth-link" href="/register">
                  {translations[lang].signup}
                </a>
              </div>
            </>
          )}
        </form>
      </div>
      
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default Login;