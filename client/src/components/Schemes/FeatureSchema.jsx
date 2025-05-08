import React, { useState, useEffect } from 'react';
import SchemeCard from './SchemeCard';
import {API_URL} from '../../context/config'

const FeaturedSchemesSection = () => {
  const [activeTab, setActiveTab] = useState('national');
  const [schemesData, setSchemesData] = useState({
    national: [],
    state: [],
    specialized: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch schemes data when component mounts
  useEffect(() => {
    const fetchSchemesData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${API_URL}/admin/schemes`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch schemes: ${response.status}`);
        }
        
        // Get the raw data from API
        const rawData = await response.json();
        
        // Organize the data by scheme type
        const organizedData = {
          national: [],
          state: [],
          specialized: []
        };
        
        // Process the raw data and organize by scheme type
        rawData.forEach((scheme, index) => {
          // Add the index to the scheme object
          const schemeWithIndex = {
            ...scheme,
            index: index + 1 // 1-based index for display
          };
          
          // Add to appropriate category
          if (scheme.schemeType === 'national') {
            organizedData.national.push(schemeWithIndex);
          } else if (scheme.schemeType === 'state') {
            organizedData.state.push(schemeWithIndex);
          } else if (scheme.schemeType === 'specialized') {
            organizedData.specialized.push(schemeWithIndex);
          }
        });
        
        setSchemesData(organizedData);
      } catch (err) {
        console.error('Error fetching schemes data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchemesData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render loading state
  if (isLoading) {
    return (
      <section className="as-featured-schemes">
        <div className="as-container">
          <div className="as-section-header">
            <div className="as-badge">Explore Available Schemes</div>
            <h2 className="as-section-title">Featured Government Initiatives</h2>
          </div>
          <div className="as-loading-container">
            <div className="as-loading-spinner"></div>
            <p>Loading schemes data...</p>
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="as-featured-schemes">
        <div className="as-container">
          <div className="as-section-header">
            <div className="as-badge">Explore Available Schemes</div>
            <h2 className="as-section-title">Featured Government Initiatives</h2>
          </div>
          <div className="as-error-container">
            <p className="as-error-message">Unable to load schemes: {error}</p>
            <button 
              className="as-btn as-btn-primary" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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
                {schemesData[schemeType] && schemesData[schemeType].length > 0 ? (
                  schemesData[schemeType].map((scheme, index) => (
                    <SchemeCard key={index} scheme={scheme} />
                  ))
                ) : (
                  <p className="as-no-schemes">No {schemeType} schemes available at the moment.</p>
                )}
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