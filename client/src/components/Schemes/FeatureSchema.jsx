// FeaturedSchemes Component
const FeaturedSchemes = () => {
  const [activeTab, setActiveTab] = useState('national');

  return (
    <section className="as-featured-schemes">
      <div className="as-container">
        <div className="as-section-header as-fade-in">
          <div className="as-badge">Explore Available Schemes</div>
          <h2 className="as-section-title">Featured Government Initiatives</h2>
          <p className="as-section-description">
            Discover key programs designed to support various aspects of farming and agriculture
          </p>
        </div>

        <div className="as-schemes-tabs">
          <div className="as-tabs-list">
            <button 
              className={`as-tab ${activeTab === 'national' ? 'as-active' : ''}`} 
              onClick={() => setActiveTab('national')}
            >
              National
            </button>
            <button 
              className={`as-tab ${activeTab === 'state' ? 'as-active' : ''}`} 
              onClick={() => setActiveTab('state')}
            >
              State-level
            </button>
            <button 
              className={`as-tab ${activeTab === 'specialized' ? 'as-active' : ''}`} 
              onClick={() => setActiveTab('specialized')}
            >
              Specialized
            </button>
          </div>

          <div className="as-schemes-content">
            <div className={`as-schemes-grid ${activeTab === 'national' ? 'as-active' : ''}`}>
              {schemes.national.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
            
            <div className={`as-schemes-grid ${activeTab === 'state' ? 'as-active' : ''}`}>
              {schemes.state.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
            
            <div className={`as-schemes-grid ${activeTab === 'specialized' ? 'as-active' : ''}`}>
              {schemes.specialized.map(scheme => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>

            <div className="as-schemes-footer">
              <a href="/schemes" className="as-btn as-btn-outline as-btn-lg">
                View All <span className="as-current-scheme-type">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span> Schemes
                <FeatherIcon name="arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
