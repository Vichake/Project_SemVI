const HeroSection = ({ onBrowseClick }) => (
    <section className="farmgear-hero-section">
      <div className="farmgear-hero-bg"></div>
      <div className="farmgear-container">
        <div className="farmgear-hero-content">
          <h1 className="farmgear-hero-title farmgear-animate-fade-in">
            Rent the Best Farm Equipment with Ease!
          </h1>
          <p className="farmgear-hero-description farmgear-animate-fade-in">
            Choose from a variety of farm instruments and rent them instantly.
          </p>
          <button 
            className="farmgear-cta-button farmgear-animate-fade-in"
            onClick={onBrowseClick}
          >
            Browse Instruments
          </button>
        </div>
      </div>
    </section>
  );
  
  export default HeroSection;

  