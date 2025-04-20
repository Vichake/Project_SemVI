import React from 'react';

function AboutUs({ language }) {
  const aboutUsContent = {
    en: "We are dedicated to supporting farmers with quality tools, organic seeds, and modern agricultural solutions. Our mission is to empower farmers with technology and sustainable practices.",
    mr: "आम्ही शेतकऱ्यांना दर्जेदार साधने, जैविक बिया आणि आधुनिक शेती उपायांसह मदत करण्यासाठी समर्पित आहोत. आमचे ध्येय शेतकऱ्यांना तंत्रज्ञान आणि शाश्वत पद्धतीसह सशक्त करणे आहे."
  };

  return (
    <section className="about-section" id="about">
      <div className="about-content">
        <h2>About Us</h2>
        <p>{aboutUsContent[language]}</p>
      </div>
      
      
    </section>
  );
}

export default AboutUs;
