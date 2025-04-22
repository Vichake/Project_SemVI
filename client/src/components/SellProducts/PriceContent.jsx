const PriceSection = () => {
    return (
      <div className="price-section">
        <h2 id="priceTitle" className="section-title">
          All Products Prices <span className="market-highlight">in Local Market</span>
        </h2>
  
        <div className="search-container">
          <input type="text" id="searchInput" placeholder="Search products..." className="search-input" />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" className="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
  
        <div id="productGrid" className="product-grid">
          {/* Product cards will be dynamically added here */}
        </div>
  
        <div id="noProductsMessage" className="no-products-message hide">
          <p>No products found. Try adjusting your search or category.</p>
        </div>
      </div>
    );
  };
  
  export default PriceSection;
  