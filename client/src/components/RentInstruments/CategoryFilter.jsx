import React from 'react';

const categories = ['all', 'tractor', 'harvester', 'plow', 'planter', 'irrigation', 'fertilizer'];

const CategoryFilter = ({ activeCategory, setActiveCategory }) => (
  <div className="farmgear-category-filter">
    {categories.map(cat => (
      <button
        key={cat}
        className={`farmgear-filter-button ${activeCategory === cat ? 'farmgear-active' : ''}`}
        onClick={() => setActiveCategory(cat)}
      >
        {cat.charAt(0).toUpperCase() + cat.slice(1)}{cat === 'all' ? ' Equipment' : 's'}
      </button>
    ))}
  </div>
);

export default CategoryFilter;