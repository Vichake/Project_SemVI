import React from 'react';
import './css/welcome.css';

const WelcomeUser = ({ username }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h2 className="welcome-title">Welcome, {username}!</h2>
        <p className="welcome-message">
          We're glad to have you back. Explore your dashboard and enjoy your experience.
        </p>
      </div>
    </div>
  );
};

export default WelcomeUser;
