
// SchemeCard Component
const SchemeCard = ({ scheme }) => {
    return (
      <div className="as-scheme-card">
        <div className="as-scheme-image">
          <img src={scheme.image} alt={scheme.title} />
          <div className="as-scheme-image-overlay"></div>
          <div className="as-scheme-image-content">
            <div className="as-scheme-category">{scheme.category}</div>
            <h3 className="as-scheme-title">{scheme.title}</h3>
          </div>
        </div>
        <div className="as-scheme-content">
          <p className="as-scheme-description">{scheme.description}</p>
          <div className="as-scheme-meta">
            <div className="as-scheme-meta-item">
              <FeatherIcon name="calendar" />
              <span>Deadline: {scheme.deadline}</span>
            </div>
            <div className="as-scheme-meta-item">
              <FeatherIcon name="map-pin" />
              <span>{scheme.region}</span>
            </div>
          </div>
          <button className="as-scheme-button">
            View Details
            <FeatherIcon name="arrow-right" />
          </button>
        </div>
      </div>
    );
  };
  
  