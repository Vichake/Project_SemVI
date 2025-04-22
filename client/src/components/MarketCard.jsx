import React from 'react';
import './css/MarketCard.css';

const MarketCard = ({ market, distance }) => {
  const { marketName, district, state } = market;
//   console.log('MarketCard:', market, distance);
//   onclicking on this card it should redirect to the market details page
  const handleClick = () => {
    // window.location.href = `/nearby-markets/${market._id}`; // Assuming you have a route set up for market details
  }
  return (
    <div className="card shadow-sm h-100 border-0 market-card " onClick={handleClick}>
      <div className="card-body">
        <h5 className="card-title">{marketName}</h5>
        <p className="card-text">
          <strong>District:</strong> {district}
        </p>
        <p className="card-text">
          <strong>State:</strong> {state}
        </p>
        {distance !== undefined && (
          <p className="card-text text-muted-market">
            📍 {distance.toFixed(2)} km away
          </p>
        )}
      </div>
    </div>
  );
};

export default MarketCard;
