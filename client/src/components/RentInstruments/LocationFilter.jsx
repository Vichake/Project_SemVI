import React from 'react';
// import './css/LocationFilter.css'; // You'll need to create this CSS file

const LocationFilter = ({ locationRange, onRangeChange, locationPermission }) => {
  // Handle slider change
  const handleRangeChange = (e) => {
    onRangeChange(parseInt(e.target.value, 10));
  };

  if (locationPermission === 'denied') {
    return (
      <div className="location-filter">
        <div className="location-error">
          <p>Location access denied. Please enable location services to see equipment near you.</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry with Location
          </button>
        </div>
      </div>
    );
  }

  if (locationPermission === 'unsupported') {
    return (
      <div className="location-filter">
        <div className="location-error">
          <p>Your browser doesn't support geolocation. Try using a different browser.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="location-filter">
      <h3>Distance Filter</h3>
      <div className="range-slider-container">
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={locationRange}
          onChange={handleRangeChange}
          className="range-slider"
          disabled={locationPermission !== 'granted'}
        />
        <div className="range-value">
          <span>{locationRange} km</span>
        </div>
      </div>
      {locationPermission === 'pending' && (
        <p className="location-pending">Waiting for location access...</p>
      )}
    </div>
  );
};

export default LocationFilter;