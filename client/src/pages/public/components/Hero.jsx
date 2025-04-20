import React from 'react';
import FarmBanner from '../../../assets/images/farm-banner.jpg';

function HeroSection({ language }) {
  const heroContent = {
    en: {
      title: "Empowering Farmers Through Technology",
      description: "Access tools to connect with markets, learn techniques, sell produce, and stay updated with notifications."
    },
    mr: {
      title: "तंत्रज्ञानाद्वारे शेतकऱ्यांना सशक्त करणे",
      description: "बाजारांशी जोडण्यासाठी साधने, तंत्रे शिकण्यासाठी, उत्पादन विकण्यासाठी आणि सूचनांसह अद्ययावत राहण्यासाठी प्रवेश करा."
    }
  };

  return (
    <section className="hero" id="landing">
      <img src={FarmBanner} alt="Farm Banner" className="hero-image" />
      <div className="hero-text">
        <h2 id="hero-text">{heroContent[language].title}</h2>
        <p id="hero-desc">{heroContent[language].description}</p>
      </div>
    </section>
  );
}

export default HeroSection;
