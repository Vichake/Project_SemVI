// src/pages/AgriSchemes/components/SchemeCard.jsx
import React from 'react';

const SchemeCard = ({ scheme }) => {
  return (
    <div className="as-scheme-card">
      <div className="as-scheme-image">
        <img src={`/api/placeholder/400/240`} alt={scheme.title} />
        <div className="as-scheme-image-overlay"></div>
        <div className="as-scheme-image-content">
          <span className="as-scheme-category">{scheme.category}</span>
          <h3 className="as-scheme-title">{scheme.title}</h3>
        </div>
      </div>
      <div className="as-scheme-content">
        <p className="as-scheme-description">{scheme.description}</p>
        <div className="as-scheme-meta">
          <div className="as-scheme-meta-item">
            <i data-feather="users"></i>
            <span>Eligibility: {scheme.eligibility}</span>
          </div>
          <div className="as-scheme-meta-item">
            <i data-feather="calendar"></i>
            <span>Deadline: {scheme.deadline}</span>
          </div>
        </div>
        <button className="as-scheme-button">
          <span>View Details</span>
          <i data-feather="arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SchemeCard;