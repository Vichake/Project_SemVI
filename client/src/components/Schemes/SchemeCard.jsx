import React, { useEffect } from 'react';

const SchemeCard = ({ scheme }) => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  if (!scheme) {
    return (
      <div className="as-scheme-card as-scheme-card-error">
        <div className="as-scheme-content">
          <p>Error loading scheme information.</p>
        </div>
      </div>
    );
  }

  const {
    index = 0,
    schemeName = 'Untitled Scheme',
    schemeDescription = 'No description available',
    schemeType = 'General',
    schemeEligibility = 'Not specified',
    startDate = null,
    endDate = null,
    guidelinesUrl = null,
    officialWebsite = null,
    stateName = '',
    status = 'inactive'
  } = scheme;

  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const deadlineText = endDate ? formatDate(endDate) : 'Ongoing';
  
  const startDateText = startDate ? formatDate(startDate) : 'Not specified';
  
  const schemeTypeDisplay = schemeType.charAt(0).toUpperCase() + schemeType.slice(1);
  
  const categoryDisplay = stateName ? `${schemeTypeDisplay} - ${stateName}` : schemeTypeDisplay;

  const handleWebsiteClick = (e) => {
    if (!officialWebsite) {
      e.preventDefault();
      alert('Official website is not available');
      return;
    }
    window.open(officialWebsite, '_blank');
  };

  const handleDownloadClick = (e) => {
    if (!guidelinesUrl) {
      e.preventDefault();
      alert('Guidelines are not available for download');
      return;
    }
    window.open(guidelinesUrl, '_blank');
  };

  // Generate a color based on status
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'as-status-active';
      case 'inactive':
        return 'as-status-inactive';
      case 'expired':
        return 'as-status-expired';
      default:
        return '';
    }
  };

  return (
    <div className="as-scheme-card">
      <div className="as-scheme-content">
        <p className="as-scheme-description">
          {schemeDescription?.length > 120 ? `${schemeDescription.substring(0, 120)}...` : schemeDescription}
        </p>
        
        <div className="as-scheme-meta">
          <div className="as-scheme-meta-item" title={`Eligibility: ${schemeEligibility}`}>
            <i data-feather="users"></i>
            <span>
              {schemeEligibility?.length > 30 ? `${schemeEligibility.substring(0, 30)}...` : schemeEligibility}
            </span>
          </div>
          <div className="as-scheme-meta-item" title={`Start Date: ${startDateText}\nDeadline: ${deadlineText}`}>
            <i data-feather="calendar"></i>
            <span>
              {startDateText} - {deadlineText}
            </span>
          </div>
        </div>
        
        <div className="as-scheme-actions">
          <a 
            href={officialWebsite || '#'} 
            className="as-scheme-button as-btn-website"
            onClick={handleWebsiteClick}
          >
            <span>Visit Website</span>
            <i data-feather="external-link"></i>
          </a>
          
          <a 
            href={guidelinesUrl || '#'} 
            className="as-scheme-button as-btn-download"
            onClick={handleDownloadClick}
          >
            <span>Download</span>
            <i data-feather="download"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;