const EquipmentCard = ({ equipment, onSelectModel }) => (
    <div className="farmgear-equipment-card">
      <div className="farmgear-equipment-image">
        <img src={equipment.image} alt={equipment.name} />
      </div>
      <div className="farmgear-equipment-content">
        <h3 className="farmgear-equipment-title">{equipment.name}</h3>
        <p className="farmgear-equipment-description">{equipment.description}</p>
        <div className="farmgear-equipment-meta">
          <span className="farmgear-price-icon">📅</span>
          <span>${equipment.price} per day</span>
        </div>
        <div className="farmgear-equipment-actions">
          <button className="farmgear-rent-button" onClick={() => onSelectModel(equipment)}>
            Select Model
          </button>
        </div>
      </div>
    </div>
  );
  
  export default EquipmentCard;
  