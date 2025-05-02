import React from 'react';

const ModelDialog = ({ equipment, onClose, onSelectModel }) => (
  <div className="farmgear-modal farmgear-modal-open">
    <div className="farmgear-modal-content">
      <span className="farmgear-close-button" onClick={onClose}>&times;</span>
      <h2>{equipment.name} - Choose a Model</h2>
      
      <div className="farmgear-equipment-details">
        <p><strong>Provider:</strong> {equipment.description.replace('Provided by ', '')}</p>
        <p><strong>Location:</strong> {equipment.location.address}</p>
        <p><strong>Contact:</strong> {equipment.contactNumber}</p>
        <p><strong>Available Units:</strong> {equipment.quantity}</p>
      </div>
      
      {equipment.models.map(model => (
        <div key={model.id} className="farmgear-model-option">
          <span>{model.name} - ₹{model.price}/hour</span>
          <button onClick={() => onSelectModel(model)}>Select</button>
        </div>
      ))}
    </div>
  </div>
);

export default ModelDialog;