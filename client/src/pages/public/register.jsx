import React, { useState } from 'react';
import './css/register.css';
import Axios from 'axios';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import { toast } from 'react-toastify';

const url = 'http://localhost:5000/api';

const translations = {
  en: {
    signup: 'Signup',
    enterName: 'Enter Name',
    enterEmail: 'Enter Email',
    enterPassword: 'Enter Password',
    confirmPassword: 'Confirm Password',
    enterPhone: 'Enter Phone Number',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Login',
    farmersPortal: "Farmer's Portal"
  },
  mr: {
    signup: 'नोंदणी करा',
    enterName: 'नाव टाका',
    enterEmail: 'ईमेल टाका',
    enterPassword: 'पासवर्ड टाका',
    confirmPassword: 'पासवर्ड पुन्हा टाका',
    enterPhone: 'फोन नंबर टाका',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    login: 'लॉगिन करा',
    farmersPortal: 'शेतकऱ्यांचे पोर्टल'
  }
};

const Signup = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


const handleSignup = async (e) => {
  e.preventDefault();

  // Password match check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", { position: "bottom-center" });
      return;
    }

    try {
      // Check for empty fields
      if (!formData.email || !formData.password || !formData.name || !formData.phone || !formData.confirmPassword) {
        toast.error("Please fill all fields", { position: "bottom-center" });
        return;
      }

      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      console.log('User created:', user);

      // 🔐 Send verification email
      await sendEmailVerification(user);
      toast.info("Verification email sent. Please check your inbox.", { position: "top-center" });

      // Prepare user data for backend
      const userData = {
        firebaseUID: user.uid,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        refreshToken: user.refreshToken
      };

      // Save to backend
      await Axios.post(`${url}/signup`, userData);

      toast.success('User registered successfully!', { position: "top-center" });

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      });

      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          toast.error('Email is already registered. Please login.', { position: "bottom-center" });
        } else if (error.code === 'auth/invalid-email') {
          toast.error('Invalid email format.', { position: "bottom-center" });
        } else if (error.code === 'auth/weak-password') {
          toast.error('Password should be at least 6 characters.', { position: "bottom-center" });
        } else {
          toast.error(`Error: ${error.message}`, { position: "bottom-center" });
        }
      }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <header className="signup-header">
          <h1>{translations[language].farmersPortal}</h1>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
        </header>

        <form className="signup-form" onSubmit={handleSignup} noValidate>
          <h2>{translations[language].signup}</h2>

          <div className="form-grid">
            <input
              name="name"
              type="text"
              placeholder={translations[language].enterName}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder={translations[language].enterEmail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder={translations[language].enterPassword}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder={translations[language].confirmPassword}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder={translations[language].enterPhone}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">{translations[language].signup}</button>
          <p className="footer-text">
            {translations[language].alreadyHaveAccount}{' '}
            <a href="/login">{translations[language].login}</a>
          </p>
        </form>
      </div>
    </div>
  );
}; 

export default Signup;
