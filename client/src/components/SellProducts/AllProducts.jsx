import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../context/config';
import { loadStripe } from '@stripe/stripe-js';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(8); // Number of items to display per "page"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastProductElementRef = useRef();
  const productBuffer = useRef([]);
  const displayedIds = useRef(new Set());

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [filteredBuffer, setFilteredBuffer] = useState([]);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);

  // Farm product image mapping - Extended with 30+ images
  const productImages = {
    // Vegetables
    'onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'tomato': 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'cucumber': 'https://images.unsplash.com/photo-1566486189376-d5f21e25aae4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'cabbage': 'https://images.unsplash.com/photo-1594282486552-05a3b6fbdd57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'cauliflower': 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'eggplant': 'https://images.unsplash.com/photo-1634462860453-2f29d63114c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'bell pepper': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    
    // Fruits
    'apple': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'orange': 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'mango': 'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'grape': 'https://images.unsplash.com/photo-1596363505729-4190a9506133?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'watermelon': 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'pineapple': 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'strawberry': 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'blueberry': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'kiwi': 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    
    // Dairy
    'milk': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'cheese': 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'butter': 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'yogurt': 'https://images.unsplash.com/photo-1584278773681-23e5efa7641d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    
    // Grains
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'wheat': 'https://images.unsplash.com/photo-1530176511084-23e5126217e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'oats': 'https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'barley': 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'quinoa': 'https://images.unsplash.com/photo-1612258686510-83b8f2f5b19f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    
    // Pulses
    'lentil': 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'chickpea': 'https://images.unsplash.com/photo-1593059529297-37571799fa29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'kidney bean': 'https://images.unsplash.com/photo-1599744019261-1b586a9c6b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'black bean': 'https://images.unsplash.com/photo-1551887334-04f3a77bf7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'mung bean': 'https://images.unsplash.com/photo-1610725663727-1e7aa4fb87bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'peas': 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'dal': 'https://images.unsplash.com/photo-1617622141573-2f00be0050a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  };

  // Default category images
  const categoryImages = {
    'vegetables': 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'meat': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'grains': 'https://images.unsplash.com/photo-1530138452425-891b068de425?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'pulses': 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  };

  // Helper function to get appropriate image URL based on product name
  const getProductImage = (product) => {
    if (product.productImage) {
      return product.productImage;
    }
    const productName = product.productName.toLowerCase();
    // Check if the product name exactly matches a key in our mapping
    if (productImages[productName]) {
      return productImages[productName];
    }
    // Check if the product name contains any of our keywords
    for (const [keyword, imageUrl] of Object.entries(productImages)) {
      if (productName.includes(keyword)) {
        return imageUrl;
      }
    }
    // Default fallback image based on category
    if (product.productCategory) {
      const category = product.productCategory.toLowerCase();
      for (const [categoryKeyword, imageUrl] of Object.entries(categoryImages)) {
        if (category.includes(categoryKeyword)) {
          return imageUrl;
        }
      }
    }
    // Final fallback
    return `https://source.unsplash.com/featured/?farm,${encodeURIComponent(product.productName)}`;
  };

  // Fetch all products from API once
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/getProducts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const resData = await response.json();
      if (resData?.data?.length > 0) {
        // Store all products in buffer, ensuring each has a unique ID
        productBuffer.current = resData.data.map((product, index) => ({
          ...product,
          // Add a fallback unique ID if _id is missing or duplicate
          uniqueId: product._id || `fallback-id-${index}`
        }));
        
        // Debug: Log product categories to see what's available
        const categories = new Set();
        productBuffer.current.forEach(product => {
          if (product.productCategory) {
            categories.add(product.productCategory.toLowerCase());
          }
        });
        console.log("Available categories:", [...categories]);
        
        setFilteredBuffer(productBuffer.current);
        loadMoreProducts();
      } else {
        setHasMore(false);
      }
      setAllProductsLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    setDisplayedProducts([]);
    displayedIds.current.clear();
    setCurrentIndex(0);
    console.log("Filtering with search term:", searchTerm, "and category:", searchCategory);
    
    // FIXED CATEGORY FILTER - This is the main change
    const filtered = productBuffer.current.filter(product => {
      // Search term matching
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.productDescription &&
          product.productDescription.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Category matching - FIXED LOGIC HERE
      let matchesCategory = false;
      
      if (searchCategory === 'all') {
        matchesCategory = true;
      } else if (product.productCategory) {
        // Get the product category and convert to lowercase for comparison
        const productCategoryLower = product.productCategory.toLowerCase().trim();
        const searchCategoryLower = searchCategory.toLowerCase().trim();
        
        // Direct comparison first
        if (productCategoryLower === searchCategoryLower) {
          matchesCategory = true;
        } 
        // Check for singular/plural variations
        else if (productCategoryLower === searchCategoryLower + 's') {
          matchesCategory = true;
        }
        else if (searchCategoryLower === productCategoryLower + 's') {
          matchesCategory = true;
        }
        // Check if category contains the search term as a word
        else if (productCategoryLower.includes(searchCategoryLower)) {
          // Make sure it's a whole word match or part of a compound word
          const words = productCategoryLower.split(/\s+|,|\/|-/);
          if (words.some(word => 
              word === searchCategoryLower || 
              word.startsWith(searchCategoryLower) || 
              searchCategoryLower.startsWith(word))) {
            matchesCategory = true;
          }
        }
        
        // Additional check for category mapping - handle edge cases
        const categoryMappings = {
          'vegetable': 'vegetables',
          'fruit': 'fruits',
          'grain': 'grains',
          'pulse': 'pulses'
        };
        
        // Check if we have a mapping for this search category
        if (!matchesCategory && categoryMappings[searchCategoryLower]) {
          if (productCategoryLower === categoryMappings[searchCategoryLower] ||
              productCategoryLower.includes(categoryMappings[searchCategoryLower])) {
            matchesCategory = true;
          }
        }
        
        // Check reverse mapping (singular from plural)
        if (!matchesCategory) {
          for (const [singular, plural] of Object.entries(categoryMappings)) {
            if (searchCategoryLower === plural && 
                (productCategoryLower === singular || productCategoryLower.includes(singular))) {
              matchesCategory = true;
              break;
            }
          }
        }
      }
      
      return matchesSearch && matchesCategory;
    });
    
    console.log(`Found ${filtered.length} matching products after filtering`);
    setFilteredBuffer(filtered);
    setHasMore(filtered.length > 0);
    
    // Load first batch of filtered results
    if (filtered.length > 0) {
      loadMoreFilteredProducts();
    } else {
      setHasMore(false);
    }
  }, [searchTerm, searchCategory]);

  // Load more products from filtered buffer
  const loadMoreFilteredProducts = () => {
    if (currentIndex >= filteredBuffer.length) {
      setHasMore(false);
      return;
    }
    // Set loading true to show loading indicator
    setLoading(true);
    // Add artificial delay for better UX (400ms)
    setTimeout(() => {
      // Get next batch from filtered buffer
      const nextBatch = filteredBuffer
        .slice(currentIndex, currentIndex + pageSize)
        .filter(product => {
          const id = product.uniqueId;
          // Skip if already displayed
          if (displayedIds.current.has(id)) {
            return false;
          }
          // Add to tracking set
          displayedIds.current.add(id);
          return true;
        });
      setDisplayedProducts(prev => [...prev, ...nextBatch]);
      setCurrentIndex(prev => prev + pageSize);
      // Check if we've reached the end of our filtered buffer
      if (currentIndex + pageSize >= filteredBuffer.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 400); // Shorter delay for search filtering
  };

  // Load more products from buffer with artificial delay
  const loadMoreProducts = () => {
    if (searchTerm || searchCategory !== 'all') {
      loadMoreFilteredProducts();
      return;
    }
    if (currentIndex >= productBuffer.current.length) {
      setHasMore(false);
      return;
    }
    // Set loading true to show loading indicator
    setLoading(true);
    // Add artificial delay for better UX (800ms)
    setTimeout(() => {
      // Filter out products that are already displayed
      const nextBatch = productBuffer.current
        .slice(currentIndex, currentIndex + pageSize)
        .filter(product => {
          const id = product.uniqueId;
          // Skip if already displayed
          if (displayedIds.current.has(id)) {
            return false;
          }
          // Add to tracking set
          displayedIds.current.add(id);
          return true;
        });
      setDisplayedProducts(prev => [...prev, ...nextBatch]);
      setCurrentIndex(prev => prev + pageSize);
      // Check if we've reached the end of our buffer
      if (currentIndex + pageSize >= productBuffer.current.length) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800); // 800ms delay to make loading visible
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log("Category changed to:", category);
    setSearchCategory(category);
  };

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts();
      }
    }, { threshold: 0.1 });
    if (lastProductElementRef.current) {
      observer.current.observe(lastProductElementRef.current);
    }
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, currentIndex]);

  // Initial data fetch
  useEffect(() => {
    fetchAllProducts();
    return () => {
      productBuffer.current = [];
      displayedIds.current.clear();
    };
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.productPrice * item.quantity);
    }, 0);
    setCartTotal(total);
    
    // Show cart if items are added, hide if empty
    if (cartItems.length > 0) {
      setIsCartVisible(true);
    }
  }, [cartItems]);

  const handleBuy = (product) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.uniqueId === product.uniqueId);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== productId));
    // Hide cart if it becomes empty
    if (cartItems.length <= 1) {
      setIsCartVisible(false);
    }
  };

  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const toggleCart = () => {
    if (cartItems.length > 0) {
      setIsCartVisible(!isCartVisible);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSearchCategory('all');
  };

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Replace with your real Stripe publishable key

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      // Prepare line items from cartItems
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.productName,
          },
          unit_amount: Math.round(item.productPrice * 100), // Stripe uses paise
        },
        quantity: item.quantity,
      }));

      // Call your backend to create a checkout session
      const response = await fetch('http://localhost:5000/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: lineItems }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Add debug option to display each product's actual category
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  return (
    <section className="products-section" id="AllProducts">
      <h2>Explore Products</h2>
      
      {/* Search Bar */}
      <div className="product-search-container">
        <div className="search-wrapper">
          <input
            type="text"
            className="product-search-input"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select
            className="product-category-select"
            value={searchCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="grains">Grains</option>
            <option value="pulses">Pulses</option>
          </select>
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        {(searchTerm || searchCategory !== 'all') && (
          <div className="search-results-info">
            {searchTerm && `Showing results for "${searchTerm}"`}
            {searchTerm && searchCategory !== 'all' && ' in '}
            {searchCategory !== 'all' && searchCategory}
            {filteredBuffer.length > 0 && `: ${filteredBuffer.length} products found`}
            <button className="reset-filters-button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>



      {/* Floating Cart */}
      <div className={`floating-cart ${isCartVisible ? 'visible' : ''}`}>
        <div className="cart-header">
          <h3>Shopping Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</h3>
          <button className="cart-toggle" onClick={toggleCart}>
            {isCartVisible ? '−' : '+'}
          </button>
        </div>
        {isCartVisible && (
          <div className="cart-content">
            {cartItems.length > 0 ? (
              <>
                <ul className="cart-items">
                  {cartItems.map(item => (
                    <li key={item.uniqueId} className="cart-item">
                      <div className="cart-item-image">
                        <img src={getProductImage(item)} alt={item.productName} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.productName}</h4>
                        <p className="item-price">Rs.{item.productPrice.toFixed(2)}</p>
                      </div>
                      <div className="cart-item-controls">
                        <button onClick={() => decreaseQuantity(item.uniqueId)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.uniqueId)}>+</button>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() => removeFromCart(item.uniqueId)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>Rs.{cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
              </>
            ) : (
              <p className="empty-cart">Your cart is empty</p>
            )}
          </div>
        )}
      </div>

      <div className="products-grid">
        {displayedProducts.map((product, index) => (
          <div
            key={product.uniqueId}
            className="product-card"
            ref={index === displayedProducts.length - 1 ? lastProductElementRef : null}
          >
            <div className="product-image">
              <img
                src={getProductImage(product)}
                alt={product.productName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://source.unsplash.com/featured/?farm,food,${encodeURIComponent(product.productName)}`;
                }}
              />
              <span className="product-category">{product.productCategory}</span>
            </div>
            <div className="product-info">
              <h3>{product.productName}</h3>
              <p className="product-description">
                {product.productDescription || `Fresh ${product.productName} from local farms`}
              </p>
              {showDebugInfo && (
                <p className="debug-info">
                  <small>Raw Category: {product.productCategory || 'none'}</small>
                </p>
              )}
              <div className="product-footer">
                <p className="product-price">Rs.{product.productPrice.toFixed(2)}</p>
                <button
                  className="buy-button"
                  onClick={() => handleBuy(product)}
                >
                  Add to Cart
                </button>
              </div>
              <p className="product-seller">
                {product.sellerName ? `Sold by: ${product.sellerName}` : 'Sold by: Local Farmer'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      )}

      {!hasMore && displayedProducts.length > 0 && (
        <div className="end-message">No more products to load</div>
      )}

      {!loading && displayedProducts.length === 0 && allProductsLoaded && (
        <div className="no-products">
          {searchTerm || searchCategory !== 'all' ?
            <div>
              <p>No products found matching your filters</p>
              <button onClick={resetFilters} className="reset-button">Reset Filters</button>
            </div>
            : 'No products available at the moment'
          }
        </div>
      )}
    </section>
  );
}

export default AllProducts;