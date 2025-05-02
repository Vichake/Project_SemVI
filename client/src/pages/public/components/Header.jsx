import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';

const navLinks = {
  en: {
    Home: "Home",
    Features: "Our Features",
    about: "About Us",
    Team: "Our Team",
    Join: "Join us"
  },
  mr: {
    Home: "मुखपृष्ठ",
    Features: "आमच्या वैशिष्ट्ये",
    about: "आमच्याबद्दल",
    Team: "आमचा संघ",
    Join: "आमच्यात सामील व्हा"
  }
};

function Navbar({ changeLanguage, language }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);

  // Adjust body padding based on header height
  useEffect(() => {
    const adjustBodyPadding = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
      }
    };

    adjustBodyPadding(); // run on mount
    window.addEventListener('resize', adjustBodyPadding); // update on resize

    return () => {
      window.removeEventListener('resize', adjustBodyPadding);
    };
  }, []);

  // Scroll detection for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <h1 id="main-title">TechKisan</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="landing" smooth={true} duration={500} className="navbar-link">{navLinks[language].Home}</Link></li>  
            <li><Link to="join" smooth={true} duration={500} className="navbar-link">{navLinks[language].Join}</Link></li>
            <li><Link to="features" smooth={true} duration={500} className="navbar-link">{navLinks[language].Features}</Link></li>
            <li><Link to="about" smooth={true} duration={500} className="navbar-link">{navLinks[language].about}</Link></li>
            <li><Link to="team" smooth={true} duration={500} className="navbar-link">{navLinks[language].Team}</Link></li>
            
            {/* <li><a href="Join.html">{navLinks[language].Join}</a></li>
            <Link to="landing" smooth={true} duration={500} className="navbar-link">{navLinks[language].Home}</Link>
            <Link to="features" smooth={true} duration={500} className="navbar-link">{navLinks[language].Features}</Link>
            <Link to="about" smooth={true} duration={500} className="navbar-link">{navLinks[language].about}</Link>
            <Link to="team" smooth={true} duration={500} className="navbar-link">{navLinks[language].Team}</Link> */}
          </ul>
        </nav>
        <div className="language-selector">
          <button onClick={() => changeLanguage('en')}>English</button>
          <button onClick={() => changeLanguage('mr')}>मराठी</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
  