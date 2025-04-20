import React, { useState } from 'react';
import Navbar from './components/Header';
import HeroSection from './components/Hero';
import FeatureCards from './components/featureCard';
import AboutUs from './components/about';
import Join from './components/join';
import TeamSection from './components/team';
// import FollowUs from './components/Follow';
import Footer from './components/Footer';

import './css/landing.css';

function App() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (language) => {
    setLanguage(language);
  };

  return (
    <div className="Home">
      <Navbar changeLanguage={changeLanguage} language={language}/>
      <HeroSection language={language} />
      <Join language={language} />
      <FeatureCards language={language} />
      <AboutUs language={language} />
      <TeamSection language={language} />
      <Footer />
    </div>
  );
}

export default App;
