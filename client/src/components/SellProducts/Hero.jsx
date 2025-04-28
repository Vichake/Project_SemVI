import React from 'react';
import { Link } from 'react-scroll';

function HeroSection({ toggleModal }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Welcome to Farm Market Hub</h1>
      <p className="hero-subtitle">Explore the freshest products directly from local farmers.</p>
      <div className="hero-buttons">
        <button className="button button-white"><Link to="AllProducts" smooth={true} duration={500}>Browse Market</Link></button>
        <button className="button button-yellow" onClick={toggleModal}>Sell Products</button>
      </div>
    </section>
  );
}

export default HeroSection;