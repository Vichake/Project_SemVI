import React from 'react';

const categories = [
  { icon: '🥦', title: 'Vegetables' },
  { icon: '🍎', title: 'Fruits' },
  { icon: '🌾', title: 'Grains' },
  { icon: '🥜', title: 'Pulses' },
  { icon: '🥛', title: 'Dairy' }
];

function ProductCategories() {
  return (
    <section className="product-categories">
      <div className="categories-header">
        <h2 className="section-title">Product Categories</h2>
      </div>
      <div className="categories-grid">
        {categories.map(({ icon, title }) => (
          <div className="category-card" key={title}>
            <div className="category-content">
              <div className="category-icon">{icon}</div>
              <div className="category-title">{title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductCategories;
