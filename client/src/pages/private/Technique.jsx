import React, { useState } from 'react';
import './css/Technique.css';

const LearnFarmingTechniques = () => {
  const [techniques, setTechniques] = useState([]);
  const [showTechniques, setShowTechniques] = useState(false);

  const handleCategoryClick = (category) => {
    // Logic to handle category click - would be implemented with actual data
    setShowTechniques(true);
    // Here you would fetch or filter techniques based on the selected category
    setTechniques([
      { title: 'Sample Technique 1', description: 'Description of technique 1' },
      { title: 'Sample Technique 2', description: 'Description of technique 2' },
      { title: 'Sample Technique 3', description: 'Description of technique 3' },
    ]);
  };

  return (
    <div className="farm-app">
      {/* Header Section */}
      <header className="farm-header">
        <h1 className="farm-title">Learn Farming Techniques</h1>
        <p className="farm-tagline">Discover modern farming methods to boost productivity and sustainability.</p>
        <input 
          type="text" 
          id="searchBox" 
          placeholder="Search techniques..." 
          className="farm-search"
        />
      </header>

      {/* Trending Technologies Slider */}
      <section className="farm-trending">
        <h2 className="farm-section-title">Trending Technologies</h2>
        <div className="farm-slider">
          <div className="farm-slides">
            <div className="farm-slide">
              <img 
                src="/api/placeholder/1600/400" 
                alt="Precision Agriculture" 
                className="farm-slide-img"
              />
              <p className="farm-slide-text">Precision Agriculture</p>
            </div>
            <div className="farm-slide">
              <img 
                src="/api/placeholder/1600/400" 
                alt="Vertical Farming" 
                className="farm-slide-img"
              />
              <p className="farm-slide-text">Vertical Farming</p>
            </div>
            <div className="farm-slide">
              <img 
                src="/api/placeholder/1600/400" 
                alt="Hydroponics" 
                className="farm-slide-img"
              />
              <p className="farm-slide-text">Hydroponics</p>
            </div>
            <div className="farm-slide">
              <img 
                src="/api/placeholder/1600/400" 
                alt="Drone Technology" 
                className="farm-slide-img"
              />
              <p className="farm-slide-text">Drone Technology</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="farm-categories">
        <h2 className="farm-blue-title">Explore Categories</h2>
        <div className="farm-category-grid">
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('crop')}
          >
            <h3>Crop Production</h3>
            <p>Learn techniques to improve crop yield and quality.</p>
          </div>
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('soil')}
          >
            <h3>Soil & Water Conservation</h3>
            <p>Discover methods to conserve soil and water resources.</p>
          </div>
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('pest')}
          >
            <h3>Pest Management</h3>
            <p>Explore techniques to manage pests and diseases effectively.</p>
          </div>
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('livestock')}
          >
            <h3>Livestock Management</h3>
            <p>Learn how to manage livestock for better productivity.</p>
          </div>
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('agroforestry')}
          >
            <h3>Agroforestry</h3>
            <p>Integrate trees and crops for sustainable farming.</p>
          </div>
          <div 
            className="farm-category-card" 
            onClick={() => handleCategoryClick('smart')}
          >
            <h3>Smart Farming</h3>
            <p>Leverage technology for efficient farming practices.</p>
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section 
        id="techniques" 
        className={`farm-techniques ${!showTechniques ? 'farm-hidden' : ''}`}
      >
        <h2 className="farm-section-title">Techniques</h2>
        <div className="farm-techniques-grid">
          {techniques.map((technique, index) => (
            <div key={index} className="farm-technique-card">
              <h3>{technique.title}</h3>
              <p>{technique.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className="farm-quote">
        <img 
          src="/api/placeholder/100/100" 
          alt="Farming Quote" 
          className="farm-quote-img"
        />
        <blockquote className="farm-blockquote">
          "The discovery of agriculture was the first big step toward a civilized life."
        </blockquote>
        <p className="farm-quote-author">- Arthur Keith</p>
      </section>

      {/* Reviews Section */}
      <section className="farm-reviews">
        <h2 className="farm-blue-title">What Experts Say</h2>
        <div className="farm-review-grid">
          <div className="farm-review-card">
            <img 
              src="/api/placeholder/100/100" 
              alt="Dr. John Smith" 
              className="farm-review-img"
            />
            <p className="farm-review-text">
              "Precision agriculture is revolutionizing farming by leveraging data and technology."
            </p>
            <p className="farm-review-author">- Dr. John Smith, Agricultural Scientist</p>
          </div>
          <div className="farm-review-card">
            <img 
              src="/api/placeholder/100/100" 
              alt="Jane Doe" 
              className="farm-review-img"
            />
            <p className="farm-review-text">
              "Vertical farming is the future of sustainable food production."
            </p>
            <p className="farm-review-author">- Jane Doe, Tech Innovator</p>
          </div>
          <div className="farm-review-card">
            <img 
              src="/api/placeholder/100/100" 
              alt="Expert 3" 
              className="farm-review-img"
            />
            <p className="farm-review-text">
              "Hydroponics is a game-changer for urban farming."
            </p>
            <p className="farm-review-author">- Prof. Emily White, Environmentalist</p>
          </div>
          <div className="farm-review-card">
            <img 
              src="/api/placeholder/100/100" 
              alt="Expert 4" 
              className="farm-review-img"
            />
            <p className="farm-review-text">
              "Drone technology has made monitoring crops and livestock more efficient than ever."
            </p>
            <p className="farm-review-author">- Rahul Verma, Farmer</p>
          </div>
          <div className="farm-review-card">
            <img 
              src="/api/placeholder/100/100" 
              alt="Expert 5" 
              className="farm-review-img"
            />
            <p className="farm-review-text">
              "Agroforestry is a sustainable way to integrate trees and crops for long-term benefits."
            </p>
            <p className="farm-review-author">- Dr. Priya Sharma, Agroforestry Expert</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearnFarmingTechniques;