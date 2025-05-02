import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MarketCard from '../../components/MarketCard.jsx';
import Header from '../../components/Header.jsx';
import { useUser } from '../../context/userContext.jsx';
import './css/Nearby.css';

const Nearby = () => {
  const url = 'http://localhost:5000';
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const { userData } = useUser();

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Could not get your location');
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${url}/user/getMarketData`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (userLocation) {
      fetchData();
    }
  }, [userLocation]);

  useEffect(() => {
    if (data.length > 0 && userLocation) {
      const filtered = data
        .map((market) => {
          const [lon, lat] = market.location.coordinates;
          const distance = getDistanceFromLatLonInKm(
            userLocation.latitude,
            userLocation.longitude,
            lat,
            lon
          );
          return { ...market, distance };
        })
        .filter((market) => market.distance <= 100)
        .sort((a, b) => a.distance - b.distance);
  
      setFilteredData(filtered);
      setLoading(false);
    }
  }, [data, userLocation]);

  return (
    <>
      <Header userData={userData} />
      <div className="nearby-view">
        <div className="nearby-view__container">
          <div className="nearby-view__header">
            <h1 className="nearby-view__main-title">
              Nearby Markets
            </h1>
            <p className="nearby-view__subtitle">
              Discover fresh produce and agricultural products at markets near you
            </p>
            <div className="nearby-view__header-badge">
              <span className="nearby-view__location-icon"></span>
              {userLocation && (
                <span className="nearby-view__current-location">
                  Showing markets within 100 km of your location
                </span>
              )}
            </div>
          </div>

          {loading ? (
            <div className="nearby-view__loading">
              <div className="nearby-view__loader">
                <div className="nearby-view__loader-circle"></div>
                <div className="nearby-view__loader-circle"></div>
                <div className="nearby-view__loader-circle"></div>
              </div>
              <div className="nearby-view__loading-text">Finding markets near you...</div>
            </div>
          ) : error ? (
            <div className="nearby-view__error">Error: {error}</div>
          ) : selectedMarket ? (
            // Single Market View
            <div className="nearby-view__detail">
              <button
                className="nearby-view__back-btn"
                onClick={() => setSelectedMarket(null)}
              >
                ← Back to Markets
              </button>
              <h2 className="nearby-view__market-title">{selectedMarket.name}</h2>
              <div className="nearby-view__market-info">
                <p className="nearby-view__market-description"><strong>Description:</strong> Best market near you</p>
                <p className="nearby-view__market-address"><strong>Address:</strong> Vashi, Navi Mumbai</p>
                <p className="nearby-view__market-distance"><strong>Distance:</strong> {selectedMarket.distance?.toFixed(2)} km</p>
                {/* Add more info here if available */}
              </div>
            </div>
          ) : (
            // Grid View
            <>
              {filteredData.length === 0 ? (
                <p className="nearby-view__no-results">
                  No markets found within 100km radius.
                </p>
              ) : (
                <div className="nearby-view__grid">
                  {filteredData.map((market) => (
                    <div
                      className="nearby-view__grid-item"
                      key={market._id}
                      onClick={() => setSelectedMarket(market)}
                    >
                      <MarketCard market={market} distance={market.distance} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nearby;0