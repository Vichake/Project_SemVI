const ModelDialog = ({ equipment, onClose, onSelectModel }) => (
    <div className="farmgear-modal farmgear-modal-open">
      <div className="farmgear-modal-content">
        <span className="farmgear-close-button" onClick={onClose}>&times;</span>
        <h2>{equipment.name} - Choose a Model</h2>
        {equipment.models.map(model => (
          <div key={model.id} className="farmgear-model-option">
            <span>{model.name} - ${model.price}/day</span>
            <button onClick={() => onSelectModel(model)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
  
  export default ModelDialog;
  