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
    agrotech: 'TechKisan'
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
  const [loading, setLoading] = useState(false);
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
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.warn("Please enter both email and password.", { position: 'bottom-center' });
      return;
    }

    setLoading(true);
    try {
      // Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        toast.info("Please verify your email before logging in.", { position: 'bottom-center' });
        setLoading(false);
        return;
      }

      // MongoDB backend check
      const response = await Axios.post(`${url}/login`, formData);

      if (response.status === 200) {
        toast.success('Login successful!', { position: 'bottom-center' });
        const { idToken, user } = response.data;
        localStorage.setItem('token', idToken);
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/home');
      } else {
        toast.error('Login failed. Please try again.', { position: 'bottom-center' });
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Something went wrong';
      toast.error(`❌ Login failed: ${msg}`, { position: 'bottom-center' });
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="tk-auth-background">
      <div className="tk-auth-card">
        <div className="tk-auth-banner">
          <h1 className="tk-app-title">{translations[lang].agrotech}</h1>
          <select 
            className="" 
            onChange={changeLanguage} 
            value={lang}
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <form className="tk-auth-form-container" onSubmit={handleLogin}>
          <h2 className="tk-auth-form-title">{translations[lang].login}</h2>

          <input
            className="tk-auth-input"
            type="email"
            name="email"
            placeholder={translations[lang].enterEmail}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="tk-auth-input"
            type="password"
            name="password"
            placeholder={translations[lang].enterPassword}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button 
            className="tk-auth-submit" 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Logging in..." : translations[lang].login}
          </button>

          <div className="tk-auth-links">
            <span>{translations[lang].noAccount}</span>
            <a className="tk-auth-link" href="/register">
              {translations[lang].signup}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;