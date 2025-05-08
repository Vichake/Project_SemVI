const RentalForm = ({ equipment, model, onClose, onSubmit }) => (
    <div className="farmgear-modal farmgear-modal-open">
      <div className="farmgear-modal-content">
        <span className="farmgear-close-button" onClick={onClose}>&times;</span>
        <h2>Rent {equipment?.name} - {model?.name}</h2>
        <form onSubmit={onSubmit}>
          <input name="name" placeholder="Your Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="duration" placeholder="Rental Duration (hour's)" required />
          <button type="submit">Submit Rental</button>
        </form>
      </div>
    </div>
  );
  
  export default RentalForm;
  