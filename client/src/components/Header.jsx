import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import feather from "feather-icons";
import './css/Header.css';
import Profile from './Profile'; // Your existing Profile popup component

const Header = ({userData}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    feather.replace();
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };


  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="text-primary">Tech</span>Kissan
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-menu">
            <Link to="/home" className="navbar-link">Home</Link>
            <Link to="/nearby-markets" className="navbar-link">Nearby Markets</Link>
            <Link to="/sell-products" className="navbar-link">Sell Your Products</Link>
            <Link to="/rent-instruments" className="navbar-link">Rent Instruments</Link>
            <Link to="/learn-techniques" className="navbar-link">Learn New Techniques</Link>
            <Link to="/govt-schemes" className="navbar-link">Government Schemes</Link>
            {/* <button className="btn btn-outline btn-sm navbar-profile" onClick={() => setShowProfile(true)}>Profile</button> */}
            <button className="icon-btn navbar-profile" onClick={() => setShowProfile(true)}>
                <i data-feather="user"></i>
            </button>
          </nav>

          {/* Mobile Toggle Button */}
          <button className="navbar-toggle" onClick={toggleMobileMenu}>
            <i data-feather="menu"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`navbar-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="container">
          <Link to="/home" className="navbar-mobile-link" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/nearby-markets" className="navbar-mobile-link" onClick={toggleMobileMenu}>Nearby Markets</Link>
          <Link to="/sell-products" className="navbar-mobile-link" onClick={toggleMobileMenu}>Sell Your Products</Link>
          <Link to="/rent-instruments" className="navbar-mobile-link" onClick={toggleMobileMenu}>Rent Instruments</Link>
          <Link to="/learn-techniques" className="navbar-mobile-link" onClick={toggleMobileMenu}>Learn New Techniques</Link>
          <Link to="/govt-schemes" className="navbar-mobile-link" onClick={toggleMobileMenu}>Government Schemes</Link>
          <button className="icon-btn navbar-profile" onClick={() => setShowProfile(true)}>
            <i data-feather="user"></i>
        </button>
        </div>
      </div>

      {/* Show profile popup if true */}
      {showProfile && <Profile onClose={() => setShowProfile(false)} userData={userData} />}
    </header>
  );
};

export default Header;
