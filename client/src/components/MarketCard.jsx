import React from 'react';
import './css/MarketCard.css';

const MarketCard = ({ market, distance }) => {
  const { marketName, district, state } = market;

  const handleClick = () => {
    // Commented out for now but would be used in a real implementation
    // window.location.href = `/nearby-markets/${market._id}`;
  }

  return (
    <div className="market-card" onClick={handleClick}>
      <div className="market-card__content">
        <h3 className="market-card__title">{marketName}</h3>
        <div className="market-card__details">
          <div className="market-card__info">
            <span className="market-card__label">District:</span>
            <span className="market-card__value">{district}</span>
          </div>
          <div className="market-card__info">
            <span className="market-card__label">State:</span>
            <span className="market-card__value">{state}</span>
          </div>
        </div>
        {distance !== undefined && (
          <div className="market-card__distance">
            <span className="market-card__distance-icon"></span>
            <span className="market-card__distance-value">{distance.toFixed(2)} km away</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketCard;