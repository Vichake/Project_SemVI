// src/pages/AgriSchemes/components/EligibilitySteps.jsx
import React from 'react';

const EligibilitySteps = ({ currentStep, nextStep, prevStep }) => {
  return (
    <>
      {/* Step 1 */}
      <div className={`as-eligibility-step ${currentStep === 1 ? 'as-active' : ''}`} id="step-1">
        <h3 className="as-step-title">Location Information</h3>
        
        <div className="as-form-group">
          <label htmlFor="state">State</label>
          <div className="as-select-wrapper">
            <select id="state" name="state">
              <option value="" disabled selected>Select your state</option>
              <option value="andhra-pradesh">Andhra Pradesh</option>
              <option value="assam">Assam</option>
              <option value="bihar">Bihar</option>
              <option value="gujarat">Gujarat</option>
              <option value="karnataka">Karnataka</option>
              <option value="kerala">Kerala</option>
              <option value="madhya-pradesh">Madhya Pradesh</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="punjab">Punjab</option>
              <option value="tamil-nadu">Tamil Nadu</option>
              <option value="uttar-pradesh">Uttar Pradesh</option>
              <option value="west-bengal">West Bengal</option>
            </select>
            <i data-feather="chevron-down"></i>
          </div>
        </div>
        
        <div className="as-form-group">
          <label htmlFor="district">District</label>
          <input type="text" id="district" name="district" placeholder="Enter your district" />
        </div>
        
        <div className="as-form-actions">
          <button type="button" className="as-btn as-btn-primary as-btn-block as-next-step" onClick={nextStep}>
            Continue
            <i data-feather="arrow-right"></i>
          </button>
        </div>
      </div>
      
      {/* Step 2 */}
      <div className={`as-eligibility-step ${currentStep === 2 ? 'as-active' : ''}`} id="step-2">
        <h3 className="as-step-title">Farm Details</h3>
        
        <div className="as-form-group">
          <label htmlFor="landSize">Land Size (in acres)</label>
          <input type="number" id="landSize" name="landSize" placeholder="Enter land size" />
        </div>
        
        <div className="as-form-group">
          <label>Land Ownership</label>
          <div className="as-radio-group">
            <div className="as-radio-item">
              <input type="radio" id="owned" name="landOwnership" value="owned" />
              <label htmlFor="owned">Owned Land</label>
            </div>
            <div className="as-radio-item">
              <input type="radio" id="leased" name="landOwnership" value="leased" />
              <label htmlFor="leased">Leased Land</label>
            </div>
            <div className="as-radio-item">
              <input type="radio" id="both" name="landOwnership" value="both" />
              <label htmlFor="both">Both Owned & Leased</label>
            </div>
          </div>
        </div>
        
        <div className="as-form-group">
          <label htmlFor="farmerCategory">Farmer Category</label>
          <div className="as-select-wrapper">
            <select id="farmerCategory" name="farmerCategory">
              <option value="" disabled selected>Select your category</option>
              <option value="marginal">Marginal Farmer (&lt; 1 hectare)</option>
              <option value="small">Small Farmer (1-2 hectares)</option>
              <option value="medium">Medium Farmer (2-10 hectares)</option>
              <option value="large">Large Farmer (&gt; 10 hectares)</option>
            </select>
            <i data-feather="chevron-down"></i>
          </div>
        </div>
        
        <div className="as-form-actions">
          <button type="button" className="as-btn as-btn-outline as-prev-step" onClick={prevStep}>Back</button>
          <button type="button" className="as-btn as-btn-primary as-next-step" onClick={nextStep}>
            Continue
            <i data-feather="arrow-right"></i>
          </button>
        </div>
      </div>
      
      {/* Step 3 */}
      <div className={`as-eligibility-step ${currentStep === 3 ? 'as-active' : ''}`} id="step-3">
        <h3 className="as-step-title">Farming Information</h3>
        
        <div className="as-form-group">
          <label htmlFor="crop">Primary Crop</label>
          <div className="as-select-wrapper">
            <select id="crop" name="crop">
              <option value="" disabled selected>Select your primary crop</option>
              <option value="rice">Rice</option>
              <option value="wheat">Wheat</option>
              <option value="maize">Maize</option>
              <option value="millet">Millet</option>
              <option value="pulses">Pulses</option>
              <option value="oilseeds">Oilseeds</option>
              <option value="sugarcane">Sugarcane</option>
              <option value="cotton">Cotton</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
            </select>
            <i data-feather="chevron-down"></i>
          </div>
        </div>
        
        <div className="as-form-actions">
          <button type="button" className="as-btn as-btn-outline as-prev-step" onClick={prevStep}>Back</button>
          <button type="button" className="as-btn as-btn-primary" id="find-schemes">
            Find Schemes
            <i data-feather="filter"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default EligibilitySteps;