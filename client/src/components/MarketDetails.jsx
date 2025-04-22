import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MarketCard from '../../components/MarketCard.jsx';
import MarketDetails from '../../components/MarketDetails.jsx';
import Header from '../../components/Header.jsx';
import { useUser } from '../../context/userContext.jsx';
import './css/Nearby.css';

const Nearby = () => {
  const url = 'http://localhost:5000/api';
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
        .filter((market) => market.distance <= 100);

      setFilteredData(filtered);
      setLoading(false);
    }
  }, [data, userLocation]);

  return (
    <>
      <Header userData={userData} />
      <div className='nearby-page'>
        <div className="nearby-market-container container">
          {loading ? (
            <div className="market-loading-container">
              <div className="market-spinner"></div>
              <div className="market-loading-text">Loading nearby markets...</div>
            </div>
          ) : error ? (
            <div className="market-error-message">Error: {error}</div>
          ) : selectedMarket ? (
            <MarketDetails
              market={selectedMarket}
              onBack={() => setSelectedMarket(null)}
            />
          ) : (
            <>
              {filteredData.length === 0 ? (
                <p className="market-no-results">
                  No markets found within 100km radius.
                </p>
              ) : (
                <div className="market-card-row">
                  {filteredData.map((market) => (
                    <div
                      className="market-col"
                      key={market._id}
                      onClick={() => setSelectedMarket(market)}
                      style={{ cursor: 'pointer' }}
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

export default Nearby;
