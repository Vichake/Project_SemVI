import React, { useState, useEffect } from 'react';

const Categories = ({ onCategorySelect, selectedCategory, searchTerm = '' }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('api/categories');
        // const data = await response.json();
        
        // Simulating API response for demo
        const data = [
          {
            id: 'crop',
            title: 'Crop Production',
            description: 'Learn techniques to improve crop yield and quality.'
          },
          {
            id: 'soil',
            title: 'Soil & Water Conservation',
            description: 'Discover methods to conserve soil and water resources.'
          },
          {
            id: 'pest',
            title: 'Pest Management',
            description: 'Explore techniques to manage pests and diseases effectively.'
          },
          {
            id: 'livestock',
            title: 'Livestock Management',
            description: 'Learn how to manage livestock for better productivity.'
          },
          {
            id: 'agroforestry',
            title: 'Agroforestry',
            description: 'Integrate trees and crops for sustainable farming.'
          },
          {
            id: 'smart',
            title: 'Smart Farming',
            description: 'Leverage technology for efficient farming practices.'
          }
        ];
        
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Filter categories based on search term
  const filteredCategories = categories.filter(category => {
    return (
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  if (loading) return <div className="categories-loading">Loading categories...</div>;
  if (error) return <div className="categories-error">{error}</div>;
  
  return (
    <section className="categories-section">
      <h2>Explore Categories</h2>
      <div className="category-grid">
        {filteredCategories.map(category => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
            data-category={category.id}
            onClick={() => onCategorySelect(category.id)}
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
  );
};

export default Categories;