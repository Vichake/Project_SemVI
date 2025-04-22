import React, { useState } from 'react';
import './css/login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const url = 'http://localhost:5000/api'; 

const translations = {
  en: {
    login: 'Login',
    enterEmail: 'Enter Email',
    enterPassword: 'Enter Password',
    noAccount: "Don't have an account?",
    signup: 'Signup',
    agrotech: 'TechKissan'
  },
  mr: {
    login: 'लॉगिन',
    enterEmail: 'ईमेल टाका',
    enterPassword: 'पासवर्ड टाका',
    noAccount: 'खाते नाहीये?',
    signup: 'नोंदणी करा',
    agrotech: 'टेककिसान'
  }
};

const Login = () => {
  const [lang, setLang] = useState('en');

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    // alert(`Logging in as ${formData.email}`);
  
    try {
      const response = await Axios.post(`${url}/login`, formData);
  
      if (response.status === 200) {
        toast.success('Login successful!', { position: 'bottom-center' });
  
        console.log('Login successful:', response.data);
        const { token, user } = response.data;
        localStorage.setItem('token', token); // Store token in local storage
        localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
        navigate('/home'); // Redirect to homepage or dashboard 
        
      } else {
        toast.error('Login failed. Please try again.', { position: 'bottom-center' });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      toast.error(`❌ Login failed: ${msg}`, { position: 'bottom-center' });
    }
  };
  
  const changeLanguage = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>{translations[lang].agrotech}</h1>
          <select id="language" onChange={changeLanguage} value={lang}>
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(e);}}>
          <h2>{translations[lang].login}</h2>
          <input
            type="email"
            name="email"
            placeholder={translations[lang].enterEmail}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={translations[lang].enterPassword}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {translations[lang].login}
          </button>

          <div className="login-footer">
            <p>
              {translations[lang].noAccount}{' '}
              <a href="/register">{translations[lang].signup}</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
