import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';

function MarketSelector({ activeMarket, onMarketChange }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productPrices, setProductPrices] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setTimeoutError(false); // Reset timeout error state on each request

      const prices = {};
      const productsSet = new Set();
      const api_key = '579b464db66ec23bdd000001f41e1501d3504c6046bc7b79cb295eb9';
      const limit = 25000;

      try {
        const response = await Axios.get(
          `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${api_key}&format=json&limit=${limit}`,
          {
            params: { market: activeMarket },
            timeout: 10000, 
          }
        );

        if (response.status !== 200) {
          toast.error('Failed to fetch data from API', { position: 'bottom-center' });
          return;
        }

        response.data.records.forEach((item) => {
          const product = item.commodity.toLowerCase();
          productsSet.add(product);

          prices[product] = {
            minPrice: item.min_price,
            maxPrice: item.max_price,
            modalPrice: item.modal_price,
          };
        });

        setAllProducts(Array.from(productsSet));
        setProductPrices(prices);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.code === 'ECONNABORTED') {
          setTimeoutError(true); // Set timeout error flag
        } else {
          toast.error('Error fetching data. Please try again later.', { position: 'bottom-center' });
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeMarket) {
      fetchPrices();
    }
  }, [activeMarket]);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts([]);
    } else {
      const lower = search.toLowerCase();
      const matchedProducts = allProducts.filter((p) => p.toLowerCase().includes(lower));
      setFilteredProducts(matchedProducts);
    }
  }, [search, allProducts]);

  return (
    <section className="market-selector">
      <h2 className="section-title">Search for Product...</h2>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Loading state */}
      {loading && <p className="loading-message">Loading prices, please wait...</p>}

      {/* Timeout error message */}
      {timeoutError && (
        <p className="error-message">
          The request is taking too long. Please try again later.
        </p>
      )}

      <div className="market-prices">
        {filteredProducts.length === 0 ? (
          <p className="no-products"></p>
        ) : (
          filteredProducts.map((product) => (
            <div className="card" key={product}>
              <div className="card-header">
                {product.charAt(0).toUpperCase() + product.slice(1)}
              </div>
              <div className="card-body">
                <span>Min Price: <span className="card-price">₹{(productPrices[product]?.minPrice / 100) || 'N/A'} Per/Kg</span></span>
                <span>Max Price: <span className="card-price">₹{(productPrices[product]?.maxPrice / 100) || 'N/A'} Per/Kg</span></span>
                <span>Modal Price: <span className="card-price">₹{(productPrices[product]?.modalPrice / 100) || 'N/A'} Per/Kg</span></span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MarketSelector;
