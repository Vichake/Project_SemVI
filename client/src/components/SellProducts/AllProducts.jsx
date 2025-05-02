import React, { useState, useEffect, useRef } from 'react';
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

  // Farm product image mapping using online images
  const productImages = {
    'onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'tomato': 'https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    // ... rest of the image mappings remain the same
  };

  // Default category images
  const categoryImages = {
    'vegetable': 'https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'fruit': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'dairy': 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'meat': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'grain': 'https://images.unsplash.com/photo-1530138452425-891b068de425?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
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
      const response = await fetch('http://localhost:5000/user/getProducts');
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

        // Initialize filtered buffer to all products
        setFilteredBuffer(productBuffer.current);

        // Load initial batch of products
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

  // Filter products based on search term and category
  useEffect(() => {
    // Reset displayed products when search changes
    setDisplayedProducts([]);
    displayedIds.current.clear();
    setCurrentIndex(0);

    // Debug log to see current filter settings
    console.log("Filtering with search term:", searchTerm, "and category:", searchCategory);

    // Filter the product buffer based on search term and category
    const filtered = productBuffer.current.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.productDescription &&
          product.productDescription.toLowerCase().includes(searchTerm.toLowerCase()));

      // Modified category matching logic - use includes instead of exact match
      const matchesCategory = searchCategory === 'all' ||
        (product.productCategory &&
          product.productCategory.toLowerCase().includes(searchCategory.toLowerCase()));

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
      // Clear buffer when component unmounts
      productBuffer.current = [];
      displayedIds.current.clear();
    };
  }, []);

  // Calculate cart total whenever items change
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

  // Add product to cart
  const handleBuy = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.uniqueId === product.uniqueId);

      if (existingItemIndex !== -1) {
        // Increment quantity if product already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new product to cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== productId));

    // Hide cart if it becomes empty
    if (cartItems.length <= 1) {
      setIsCartVisible(false);
    }
  };

  // Increase item quantity
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.uniqueId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Toggle cart visibility
  const toggleCart = () => {
    if (cartItems.length > 0) {
      setIsCartVisible(!isCartVisible);
    }
  };

  // Reset filters function
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
            <option value="vegetable">Vegetables</option>
            <option value="fruit">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="grain">Grains</option>
            <option value="meat">Meat</option>
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