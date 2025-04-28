// src/pages/AgriSchemes/components/EligibilityCheckerSection.jsx
import React, { useState } from 'react';
import EligibilitySteps from './EligibilitySteps';

const EligibilityCheckerSection = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="as-eligibility-checker">
      <div className="as-container">
        <div className="as-eligibility-grid">
          <div className="as-eligibility-content">
            <div className="as-badge">Personalized Recommendations</div>
            <h2 className="as-eligibility-title">
              Find Schemes You're <span className="as-text-primary">Eligible For</span>
            </h2>
            <p className="as-eligibility-description">
              Answer a few questions about your farm and situation, and we'll identify government schemes 
              you may qualify for based on your profile and requirements.
            </p>
            
            <div className="as-eligibility-features">
              <div className="as-feature-item">
                <div className="as-feature-icon">
                  <i data-feather="check-circle"></i>
                </div>
                <div>
                  <h3 className="as-feature-title">Personalized Recommendations</h3>
                  <p className="as-feature-text">Get schemes that match your specific farming situation</p>
                </div>
              </div>
              
              <div className="as-feature-item">
                <div className="as-feature-icon">
                  <i data-feather="check-circle"></i>
                </div>
                <div>
                  <h3 className="as-feature-title">Save Time Researching</h3>
                  <p className="as-feature-text">Quickly find relevant schemes instead of searching manually</p>
                </div>
              </div>
              
              <div className="as-feature-item">
                <div className="as-feature-icon">
                  <i data-feather="check-circle"></i>
                </div>
                <div>
                  <h3 className="as-feature-title">Application Guidance</h3>
                  <p className="as-feature-text">Get information on how to apply for each recommended scheme</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="as-eligibility-form-container">
            <div className="as-eligibility-card">
              <div className="as-eligibility-card-header">
                <h3 className="as-eligibility-card-title">Eligibility Checker</h3>
                <div className="as-steps-indicator">
                  <span className={`as-step ${currentStep >= 1 ? 'as-active' : ''}`}></span>
                  <span className={`as-step ${currentStep >= 2 ? 'as-active' : ''}`}></span>
                  <span className={`as-step ${currentStep >= 3 ? 'as-active' : ''}`}></span>
                </div>
              </div>
              
              <div className="as-eligibility-card-body">
                <EligibilitySteps currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCheckerSection;