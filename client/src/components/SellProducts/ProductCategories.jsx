const ProductCategories = () => {
    return (
      <div className="product-categories">
        <div className="categories-header">
          <h2 className="section-title">Product Categories</h2>
          <button id="viewAllButton" className="view-all-button hide">View All</button>
        </div>
  
        <div className="categories-grid">
          {[
            { icon: "🥕", label: "Vegetables" },
            { icon: "🍎", label: "Fruits" },
            { icon: "🌾", label: "Grains" },
            { icon: "🌱", label: "Pulses" },
            { icon: "🥛", label: "Dairy" },
          ].map(({ icon, label }) => (
            <div key={label} className="category-card" data-category={label.toLowerCase()}>
              <div className="category-content">
                <div className="category-icon">{icon}</div>
                <h3 className="category-title">{label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductCategories;
  