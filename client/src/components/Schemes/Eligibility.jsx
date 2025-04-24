
// Eligibility Checker Component
const EligibilityChecker = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    landSize: '',
    landOwnership: '',
    farmerCategory: '',
    crop: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, landOwnership: e.target.value });
  };

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

  const findSchemes = () => {
    // Here you would typically send this data to a server
    console.log('Eligibility Form Data:', formData);
    alert('Based on your information, we found 5 schemes you may be eligible for. In a real application, we would show you these schemes or redirect you to a results page.');
  };

  return (
    <section className="as-eligibility-checker">
      <div className="as-container">
        <div className="as-eligibility-grid">
          <div className="as-eligibility-content as-fade-in">
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
                  <FeatherIcon name="check-circle" />
                </div>
                <div>
                  <h3 className="as-feature-title">Personalized Recommendations</h3>
                  <p className="as-feature-text">Get schemes that match your specific farming situation</p>
                </div>
              </div>
              
              <div className="as-feature-item">
                <div className="as-feature-icon">
                  <FeatherIcon name="check-circle" />
                </div>
                <div>
                  <h3 className="as-feature-title">Save Time Researching</h3>
                  <p className="as-feature-text">Quickly find relevant schemes instead of searching manually</p>
                </div>
              </div>
              
              <div className="as-feature-item">
                <div className="as-feature-icon">
                  <FeatherIcon name="check-circle" />
                </div>
                <div>
                  <h3 className="as-feature-title">Application Guidance</h3>
                  <p className="as-feature-text">Get information on how to apply for each recommended scheme</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="as-eligibility-form-container as-fade-in">
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
                {/* Step 1 */}
                <div className={`as-eligibility-step ${currentStep === 1 ? 'as-active' : ''}`}>
                  <h3 className="as-step-title">Location Information</h3>
                  
                  <div className="as-form-group">
                    <label htmlFor="state">State</label>
                    <div className="as-select-wrapper">
                      <select 
                        id="state" 
                        name="state" 
                        value={formData.state}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select your state</option>
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
                      <FeatherIcon name="chevron-down" />
                    </div>
                  </div>
                  
                  <div className="as-form-group">
                    <label htmlFor="district">District</label>
                    <input 
                      type="text" 
                      id="district" 
                      name="district" 
                      placeholder="Enter your district"
                      value={formData.district}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="as-form-actions">
                    <button type="button" className="as-btn as-btn-primary as-btn-block" onClick={nextStep}>
                      Continue
                      <FeatherIcon name="arrow-right" />
                    </button>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className={`as-eligibility-step ${currentStep === 2 ? 'as-active' : ''}`}>
                  <h3 className="as-step-title">Farm Details</h3>
                  
                  <div className="as-form-group">
                    <label htmlFor="landSize">Land Size (in acres)</label>
                    <input 
                      type="number" 
                      id="landSize" 
                      name="landSize" 
                      placeholder="Enter land size"
                      value={formData.landSize}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="as-form-group">
                    <label>Land Ownership</label>
                    <div className="as-radio-group">
                      <div className="as-radio-item">
                        <input 
                          type="radio" 
                          id="owned" 
                          name="landOwnership" 
                          value="owned"
                          checked={formData.landOwnership === 'owned'}
                          onChange={handleRadioChange}
                        />
                        <label htmlFor="owned">Owned Land</label>
                      </div>
                      <div className="as-radio-item">
                        <input 
                          type="radio" 
                          id="leased" 
                          name="landOwnership" 
                          value="leased"
                          checked={formData.landOwnership === 'leased'}
                          onChange={handleRadioChange}
                        />
                        <label htmlFor="leased">Leased Land</label>
                      </div>
                      <div className="as-radio-item">
                        <input 
                          type="radio" 
                          id="both" 
                          name="landOwnership" 
                          value="both"
                          checked={formData.landOwnership === 'both'}
                          onChange={handleRadioChange}
                        />
                        <label htmlFor="both">Both Owned & Leased</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="as-form-group">
                    <label htmlFor="farmerCategory">Farmer Category</label>
                    <div className="as-select-wrapper">
                      <select 
                        id="farmerCategory" 
                        name="farmerCategory"
                        value={formData.farmerCategory}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select your category</option>
                        <option value="marginal">Marginal Farmer (&lt; 1 hectare)</option>
                        <option value="small">Small Farmer (1-2 hectares)</option>
                        <option value="medium">Medium Farmer (2-10 hectares)</option>
                        <option value="large">Large Farmer (&gt; 10 hectares)</option>
                      </select>
                      <FeatherIcon name="chevron-down" />
                    </div>
                  </div>
                  
                  <div className="as-form-actions">
                    <button type="button" className="as-btn as-btn-outline" onClick={prevStep}>Back</button>
                    <button type="button" className="as-btn as-btn-primary" onClick={nextStep}>
                      Continue
                      <FeatherIcon name="arrow-right" />
                    </button>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className={`as-eligibility-step ${currentStep === 3 ? 'as-active' : ''}`}>
                  <h3 className="as-step-title">Farming Information</h3>
                  
                  <div className="as-form-group">
                    <label htmlFor="crop">Primary Crop</label>
                    <div className="as-select-wrapper">
                      <select 
                        id="crop" 
                        name="crop"
                        value={formData.crop}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select your primary crop</option>
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
                      <FeatherIcon name="chevron-down" />
                    </div>
                  </div>
                  
                  <div className="as-form-actions">
                    <button type="button" className="as-btn as-btn-outline" onClick={prevStep}>Back</button>
                    <button type="button" className="as-btn as-btn-primary" onClick={findSchemes}>
                      Find Schemes
                      <FeatherIcon name="filter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

