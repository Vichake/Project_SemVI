// src/pages/AgriSchemes/AgriSchemes.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext';
import Header from '../../components/Header';
import HeroSection from '../../components/Schemes/HeroSection';
import FeaturedSchemesSection from '../../components/Schemes/FeatureSchema';
import EligibilityCheckerSection from '../../components/Schemes/EligibilitySteps';
import './css/Schemes.css';

const AgriSchemes = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <div className="as-root">
      <Header userData={userData} />
      <main>
        <HeroSection />
        <FeaturedSchemesSection />
        <EligibilityCheckerSection />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AgriSchemes;