import React, { useState, useEffect } from 'react';
import { API_URL } from '../../context/config';

const AgricultureHub = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allTechniques, setAllTechniques] = useState([]);

  // Static categories data with normalized values for matching
  const categories = [
    {
      id: 'crop',
      title: 'Crop Production',
      description: 'Learn techniques to improve crop yield and quality.',
      matchValues: ['crop production', 'crop']
    },
    {
      id: 'soil',
      title: 'Soil & Water Conservation',
      description: 'Discover methods to conserve soil and water resources.',
      matchValues: ['soil & water conservation', 'soil and water conservation', 'soil']
    },
    {
      id: 'pest',
      title: 'Pest Management',
      description: 'Explore techniques to manage pests and diseases effectively.',
      matchValues: ['pest management', 'pest']
    },
    {
      id: 'livestock',
      title: 'Livestock Management',
      description: 'Learn how to manage livestock for better productivity.',
      matchValues: ['livestock management', 'livestock']
    },
    {
      id: 'agroforestry',
      title: 'Agroforestry',
      description: 'Integrate trees and crops for sustainable farming.',
      matchValues: ['agroforestry']
    },
    {
      id: 'smart',
      title: 'Smart Farming',
      description: 'Leverage technology for efficient farming practices.',
      matchValues: ['smart farming', 'smart']
    }
  ];

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    if (!searchTerm) return true;
    
    return (
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Fetch all techniques on component mount
  useEffect(() => {
    const fetchAllTechniques = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`${API_URL}/admin/content`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle different response formats
        const dataArray = Array.isArray(data) ? data : data.content || data.data || [];
        console.log('Data structure received:', data);
        
        setAllTechniques(dataArray);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch techniques');
        setLoading(false);
        console.error('Error fetching techniques:', err);
      }
    };
    
    fetchAllTechniques();
  }, []);

  // Filter techniques when category changes or all techniques update
  useEffect(() => {
    if (!selectedCategory || !allTechniques.length) return;
    
    const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
    if (!selectedCategoryObj) return;
    
    // Filter techniques based on matching values
    const filteredTechniques = allTechniques.filter(technique => {
      if (!technique || !technique.category) return false;
      
      const techniqueCategory = technique.category.toLowerCase().trim();
      return selectedCategoryObj.matchValues.some(matchValue => 
        techniqueCategory === matchValue || techniqueCategory.includes(matchValue)
      );
    });
    
    setTechniques(filteredTechniques);
  }, [selectedCategory, allTechniques]);

  // Further filter techniques based on search term
  const filteredTechniques = techniques.filter(technique => {
    if (!searchTerm) return true;
    
    return (
      technique.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (technique.description && technique.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleTechniqueClick = (technique) => {
    // In a real app, you might use React Router to navigate
    window.location.href = `/technique/${technique._id}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="agriculture-hub">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search categories and techniques..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          {filteredCategories.map(category => (
            <div
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              data-category={category.id}
              onClick={() => handleCategorySelect(category.id)}
            >
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
        {filteredCategories.length === 0 && (
          <div className="no-results">No categories match your search</div>
        )}
      </section>

      {/* Techniques Section */}
      {selectedCategory && (
        <section id="techniques" className="techniques-section">
          <h2>Techniques for {categories.find(cat => cat.id === selectedCategory)?.title || selectedCategory}</h2>
          
          {loading ? (
            <div className="techniques-loading">Loading techniques...</div>
          ) : error ? (
            <div className="techniques-error">{error}</div>
          ) : (
            <div className="techniques-grid">
              {filteredTechniques.length > 0 ? (
                filteredTechniques.map((technique) => (
                  <div
                    key={technique._id}
                    className="technique-card"
                    onClick={() => handleTechniqueClick(technique)}
                  >
                    {technique.thumbnail && (
                      <img
                        src={technique.thumbnail}
                        alt={technique.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder-image.jpg';
                        }}
                      />
                    )}
                    <h3>{technique.title}</h3>
                    <p>{technique.description}</p>
                    {technique.url && (
                      <a
                        href={technique.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {technique.type === 'video' ? 'Watch Video' : 'Read Article'}
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="no-techniques">
                  No techniques found for this category{searchTerm ? ' and search term' : ''}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Debug Section - Remove in production */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div style={{ marginTop: '30px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>Debug Info</h3>
          <p>Selected Category: {selectedCategory}</p>
          <p>All Techniques: {allTechniques.length}</p>
          <p>Filtered Techniques: {techniques.length}</p>
          <p>Categories: {categories.map(c => c.id).join(', ')}</p>
          <h4>API Response Data:</h4>
          <pre>{JSON.stringify(allTechniques, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default AgricultureHub;