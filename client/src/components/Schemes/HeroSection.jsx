const HeroSection = () => {
    return (
      <section className="as-hero">
        <div className="as-hero-bg">
          <div className="as-hero-gradient"></div>
          <div className="as-hero-circle as-hero-circle-1"></div>
          <div className="as-hero-circle as-hero-circle-2"></div>
        </div>
  
        <div className="as-container">
          <div className="as-hero-content">
            <div className="as-badge as-fade-in">Empowering Farmers Across India</div>
            <h1 className="as-hero-title as-fade-in">
              Discover Government Schemes
              <span className="as-text-primary"> Made for Farmers</span>
            </h1>
            <p className="as-hero-description as-fade-in">
              Navigate through all available government initiatives designed to support 
              agricultural growth, financial assistance, and sustainable farming practices.
            </p>
            <div className="as-hero-actions as-fade-in">
              <a href="/eligibility" className="as-btn as-btn-primary as-btn-lg">
                Find Eligible Schemes
                <FeatherIcon name="arrow-right" />
              </a>
              <a href="/schemes" className="as-btn as-btn-outline as-btn-lg">
                Browse All Schemes
              </a>
            </div>
          </div>
  
          <div className="as-hero-cards as-fade-in">
            <div className="as-glass-card">
              <div className="as-card-icon">
                <FeatherIcon name="feather" />
              </div>
              <h3 className="as-card-title">Agricultural Support</h3>
              <p className="as-card-text">Access schemes focused on crop improvement, irrigation, and farming techniques.</p>
            </div>
  
            <div className="as-glass-card">
              <div className="as-card-icon">
                <FeatherIcon name="dollar-sign" />
              </div>
              <h3 className="as-card-title">Financial Assistance</h3>
              <p className="as-card-text">Discover subsidies, loans, and insurance options available for farmers.</p>
            </div>
  
            <div className="as-glass-card">
              <div className="as-card-icon">
                <FeatherIcon name="users" />
              </div>
              <h3 className="as-card-title">Community Programs</h3>
              <p className="as-card-text">Join initiatives designed to strengthen farmer communities and knowledge sharing.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  