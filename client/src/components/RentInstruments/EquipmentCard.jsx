import React from 'react';

const EquipmentCard = ({ equipment, onSelectModel }) => (
  <div className="farmgear-equipment-card">

    <div className="farmgear-equipment-content">
      <h3 className="farmgear-equipment-title">{equipment.name}</h3>
      <p className="farmgear-equipment-description">{equipment.description}</p>
      <div className="farmgear-equipment-meta">
        <span className="farmgear-price-icon">₹</span>
        <span>{equipment.price} per hour</span>
      </div>
      <div className="farmgear-equipment-meta">
        <span className="farmgear-location-icon">📍</span>
        <span>{equipment.location.address}</span>
      </div>
      <div className="farmgear-equipment-meta">
        <span className="farmgear-quantity-icon">🔢</span>
        <span>Available: {equipment.quantity} units</span>
      </div>
      <div className="farmgear-equipment-meta">
        <span className="farmgear-service-icon">🔧</span>
        <span>Last Serviced: {equipment.lastServiceDate}</span>
      </div>
      <div className="farmgear-equipment-actions">
        <button className="farmgear-rent-button" onClick={() => onSelectModel(equipment)}>
          Rent Now
        </button>
      </div>
    </div>
  </div>
);

export default EquipmentCard;