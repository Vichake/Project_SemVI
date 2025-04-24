import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/userContext.jsx';
import Header from '../../components/Header.jsx';
import './css/Schemes.css'

const AgriSchemes = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('national');
  const [currentStep, setCurrentStep] = useState(1);
  const { userData } = useUser();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize feather icons
    if (window.feather) {
      window.feather.replace();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
  
  // Mock data for schemes
  const schemes = {
    national: [
      {
        title: "PM-KISAN Scheme",
        category: "Financial Support",
        description: "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families.",
        eligibility: "All small & marginal farmers",
        deadline: "Ongoing"
      },
      {
        title: "Pradhan Mantri Fasal Bima Yojana",
        category: "Insurance",
        description: "Comprehensive risk coverage for crop cycle from pre-sowing to post-harvest losses due to non-preventable risks.",
        eligibility: "All farmers with insurable crops",
        deadline: "Seasonal enrollment"
      },
      {
        title: "National Mission for Sustainable Agriculture",
        category: "Sustainable Farming",
        description: "Promoting sustainable agriculture through climate change adaptation measures, water use efficiency, and soil health management.",
        eligibility: "All farmers",
        deadline: "Ongoing"
      }
    ],
    state: [
      {
        title: "Karnataka Raitha Siri",
        category: "Financial Support",
        description: "Direct income support for farmers in Karnataka state with additional benefits for organic farming practices.",
        eligibility: "Karnataka farmers",
        deadline: "Annual registration"
      },
      {
        title: "Punjab Pani Bachao Paise Kamao",
        category: "Water Conservation",
        description: "Financial incentives for farmers to save water during paddy cultivation through direct benefit transfer.",
        eligibility: "Punjab farmers",
        deadline: "Seasonal"
      }
    ],
    specialized: [
      {
        title: "Tribal Sub-Plan for Agriculture",
        category: "Tribal Development",
        description: "Special assistance for tribal farmers including subsidized equipment, seeds, and training programs.",
        eligibility: "Tribal farmers",
        deadline: "Ongoing"
      },
      {
        title: "Women Farmers Empowerment Programme",
        category: "Gender Support",
        description: "Special provisions for training, credit linkage, and equipment support focused on women in agriculture.",
        eligibility: "Women farmers",
        deadline: "Quarterly enrollment"
      }
    ]
  };
  
  return (
    <div className="as-root">
      <Header userData={userData} />
      <main>
        {/* Hero Section */}
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
                <span className="as-text-primary">Made for Farmers</span>
              </h1>
              <p className="as-hero-description as-fade-in">
                Navigate through all available government initiatives designed to support 
                agricultural growth, financial assistance, and sustainable farming practices.
              </p>
              <div className="as-hero-actions as-fade-in">
                <a href="/eligibility" className="as-btn as-btn-primary as-btn-lg">
                  Find Eligible Schemes
                  <i data-feather="arrow-right"></i>
                </a>
                <a href="/schemes" className="as-btn as-btn-outline as-btn-lg">
                  Browse All Schemes
                </a>
              </div>
            </div>

            <div className="as-hero-cards as-fade-in">
              <div className="as-glass-card">
                <div className="as-card-icon">
                  <i data-feather="feather"></i>
                </div>
                <h3 className="as-card-title">Agricultural Support</h3>
                <p className="as-card-text">Access schemes focused on crop improvement, irrigation, and farming techniques.</p>
              </div>

              <div className="as-glass-card">
                <div className="as-card-icon">
                  <i data-feather="dollar-sign"></i>
                </div>
                <h3 className="as-card-title">Financial Assistance</h3>
                <p className="as-card-text">Discover subsidies, loans, and insurance options available for farmers.</p>
              </div>

              <div className="as-glass-card">
                <div className="as-card-icon">
                  <i data-feather="users"></i>
                </div>
                <h3 className="as-card-title">Community Programs</h3>
                <p className="as-card-text">Join initiatives designed to strengthen farmer communities and knowledge sharing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Schemes Section */}
        <section className="as-featured-schemes">
          <div className="as-container">
            <div className="as-section-header">
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
                  onClick={() => handleTabChange('national')}
                >
                  National
                </button>
                <button 
                  className={`as-tab ${activeTab === 'state' ? 'as-active' : ''}`} 
                  onClick={() => handleTabChange('state')}
                >
                  State-level
                </button>
                <button 
                  className={`as-tab ${activeTab === 'specialized' ? 'as-active' : ''}`} 
                  onClick={() => handleTabChange('specialized')}
                >
                  Specialized
                </button>
              </div>

              <div className="as-schemes-content">
                {Object.keys(schemes).map((schemeType) => (
                  <div 
                    key={schemeType}
                    className={`as-schemes-grid ${activeTab === schemeType ? 'as-active' : ''}`} 
                    id={`${schemeType}-schemes`}
                  >
                    {schemes[schemeType].map((scheme, index) => (
                      <div key={index} className="as-scheme-card">
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
                    ))}
                  </div>
                ))}

                <div className="as-schemes-footer">
                  <a href="/schemes" className="as-btn as-btn-outline as-btn-lg">
                    View All <span className="as-current-scheme-type">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span> Schemes
                    <i data-feather="arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility Checker Section */}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="as-footer">
        <div className="as-container">
          <div className="as-footer-grid">
            <div className="as-footer-col">
              <h3 className="as-footer-logo"><span className="as-text-primary">Agri</span>Schemes</h3>
              <p className="as-footer-description">
                Your one-stop resource for navigating government schemes and initiatives designed to 
                support farmers and agricultural growth across India.
              </p>
              <div className="as-footer-social">
                <a href="#" className="as-social-link" aria-label="Facebook">
                  <i data-feather="facebook"></i>
                </a>
                <a href="#" className="as-social-link" aria-label="Twitter">
                  <i data-feather="twitter"></i>
                </a>
                <a href="#" className="as-social-link" aria-label="Instagram">
                  <i data-feather="instagram"></i>
                </a>
                <a href="#" className="as-social-link" aria-label="YouTube">
                  <i data-feather="youtube"></i>
                </a>
              </div>
            </div>
            
            <div className="as-footer-col">
              <h3 className="as-footer-heading">Contact Information</h3>
              <ul className="as-footer-contact">
                <li>Ministry of Agriculture & Farmers Welfare</li>
                <li>Krishi Bhawan, New Delhi - 110001</li>
                <li>Email: info@agrischemes.gov.in</li>
                <li>Helpline: 1800-111-222</li>
              </ul>
            </div>
          </div>
          
          <div className="as-footer-bottom">
            <p className="as-copyright">
              © <span id="current-year"></span> AgriSchemes. All rights reserved.
            </p>
            
            <div className="as-footer-legal">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/disclaimer">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgriSchemes;