import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase'; // Update with your firebase config
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './css/register.css';

const API_URL = 'http://localhost:5000/api';

const translations = {
  en: {
    signup: 'Sign Up',
    signingUp: 'Signing up...',
    enterName: 'Full Name',
    enterEmail: 'Email Address',
    enterPassword: 'Password',
    confirmPassword: 'Confirm Password',
    enterPhone: 'Phone Number',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Log In',
    farmersPortal: "TechKisan",
    passwordRequirements: "Password must be at least 6 characters",
    phoneRequirements: "Enter a valid 10-digit phone number",
    requiredField: "This field is required",
    validEmail: "Please enter a valid email address",
    passwordNotMatch: "Passwords do not match",
    emailAlreadyRegistered: "Email is already registered. Please login.",
    invalidEmailFormat: "Invalid email format",
    weakPassword: "Password should be at least 6 characters",
    googleSignup: "Sign up with Google",
    facebookSignup: "Sign up with Facebook",
    comingSoon: "Coming soon!"
  },
  mr: {
    signup: 'नोंदणी करा',
    signingUp: 'नोंदणी होत आहे...',
    enterName: 'पूर्ण नाव',
    enterEmail: 'ईमेल पत्ता',
    enterPassword: 'पासवर्ड',
    confirmPassword: 'पासवर्ड पुष्टी करा',
    enterPhone: 'फोन नंबर',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    login: 'लॉगिन करा',
    farmersPortal: 'टेककिसान',
    passwordRequirements: "पासवर्ड किमान 6 अक्षरे असावा",
    phoneRequirements: "कृपया वैध 10-अंकी फोन नंबर टाका",
    requiredField: "हे क्षेत्र आवश्यक आहे",
    validEmail: "कृपया वैध ईमेल पत्ता प्रविष्ट करा",
    passwordNotMatch: "पासवर्ड जुळत नाहीत",
    emailAlreadyRegistered: "ईमेल आधीच नोंदणीकृत आहे. कृपया लॉगिन करा.",
    invalidEmailFormat: "अवैध ईमेल स्वरूप",
    weakPassword: "पासवर्ड किमान 6 अक्षरे असावा",
    googleSignup: "गूगलने नोंदणी करा",
    facebookSignup: "फेसबुकने नोंदणी करा",
    comingSoon: "लवकरच येत आहे!"
  }
};

const Signup = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const t = translations[language];

    if (!formData.name.trim()) newErrors.name = t.requiredField;
    if (!formData.email.trim()) newErrors.email = t.requiredField;
    if (!formData.password) newErrors.password = t.requiredField;
    if (!formData.confirmPassword) newErrors.confirmPassword = t.requiredField;
    if (!formData.phone.trim()) newErrors.phone = t.requiredField;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = t.validEmail;
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = t.passwordRequirements;
    }

    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordNotMatch;
    }

    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t.phoneRequirements;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const t = translations[language];

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await sendEmailVerification(user);
      toast.info("Verification email sent. Please check your inbox.", { position: "top-center" });

      const userData = {
        firebaseUID: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        refreshToken: user.refreshToken
      };

      await axios.post(`${API_URL}/signup`, userData);

      toast.success('Registration successful! Please verify your email.', { position: "top-center" });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrors(prev => ({ ...prev, email: t.emailAlreadyRegistered }));
        toast.error(t.emailAlreadyRegistered, { position: "bottom-center" });
      } else if (error.code === 'auth/invalid-email') {
        setErrors(prev => ({ ...prev, email: t.invalidEmailFormat }));
        toast.error(t.invalidEmailFormat, { position: "bottom-center" });
      } else if (error.code === 'auth/weak-password') {
        setErrors(prev => ({ ...prev, password: t.weakPassword }));
        toast.error(t.weakPassword, { position: "bottom-center" });
      } else {
        toast.error(`Error: ${error.message}`, { position: "bottom-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    toast.info(translations[language].comingSoon, { position: "top-center" });
  };

  const t = translations[language];

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <header className="signup-header">
          <div className="tk-banner-content">
            <h1 className="tk-app-title">{translations[language].farmersPortal}</h1>
            <div className="tk-language-wrapper">
              <select 
                className="tk-language-selector" 
                onChange={handleLanguageChange} 
                value={language} 
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="mr">मराठी</option>
              </select>
              <span className="tk-language-icon">🌐</span>
            </div>
          </div>
        </header>

        <form className="signup-form" onSubmit={handleSignup} noValidate>
          <h2>{t.signup}</h2>

          <div className="form-grid">
            <div className="form-group">
              <input
                name="name"
                type="text"
                placeholder={t.enterName}
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''} 
                required
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </div>

            <div className="form-group">
              <input
                name="email"
                type="email"
                placeholder={t.enterEmail}
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>

            <div className="form-group">
              <input
                name="password"
                type="password"
                placeholder={t.enterPassword}
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''} 
                required
              />
              {errors.password && <small className="error-text">{errors.password}</small>}
            </div>

            <div className="form-group">
              <input
                name="confirmPassword"
                type="password"
                placeholder={t.confirmPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''} 
                required
              />
              {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
            </div>

            <div className="form-group">
              <input
                name="phone"
                type="text"
                placeholder={t.enterPhone}
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                required
              />
              {errors.phone && <small className="error-text">{errors.phone}</small>}
            </div>

            <div className="signup-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? t.signingUp : t.signup}
              </button>
            </div>

            <div className="signup-footer">
              <p>{t.alreadyHaveAccount} <a href="/login">{t.login}</a></p>
            </div>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Signup;
