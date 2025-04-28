// src/pages/AgriSchemes/components/FeaturedSchemesSection.jsx
import React, { useState } from 'react';
import SchemeCard from './SchemeCard';
import { schemesData } from './data';

const FeaturedSchemesSection = () => {
  const [activeTab, setActiveTab] = useState('national');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="as-featured-schemes">
      <div className="as-container">
        <div className="as-section-header">
          <div className="as-badge">Explore Available Schemes</div>
          <h2 className="as-section-title">Featured Government Initiatives</h2>
          <p className="as-section-description">
            Discover key programs designed to support various aspects of farming and agriculture
          </p>
        </div>

        <div className="as-schemes-tabs">
          <div className="as-tabs-list">
            <button 
              className={`as-tab ${activeTab === 'national' ? 'as-active' : ''}`} 
              onClick={() => handleTabChange('national')}
            >
              National
            </button>
            <button 
              className={`as-tab ${activeTab === 'state' ? 'as-active' : ''}`} 
              onClick={() => handleTabChange('state')}
            >
              State-level
            </button>
            <button 
              className={`as-tab ${activeTab === 'specialized' ? 'as-active' : ''}`} 
              onClick={() => handleTabChange('specialized')}
            >
              Specialized
            </button>
          </div>

          <div className="as-schemes-content">
            {Object.keys(schemesData).map((schemeType) => (
              <div 
                key={schemeType}
                className={`as-schemes-grid ${activeTab === schemeType ? 'as-active' : ''}`} 
                id={`${schemeType}-schemes`}
              >
                {schemesData[schemeType].map((scheme, index) => (
                  <SchemeCard key={index} scheme={scheme} />
                ))}
              </div>
            ))}

            <div className="as-schemes-footer">
              <a href="/schemes" className="as-btn as-btn-outline as-btn-lg">
                View All <span className="as-current-scheme-type">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span> Schemes
                <i data-feather="arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSchemesSection;