import { useState } from "react";
import { Link } from "react-router-dom";
// import './Home.css'
function Home() {
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Implement translation logic if needed
  };

  useEffect(() => {
    document.body.classList.add("home-page");
    return () => {
      document.body.classList.remove("home-page");
    };
  }, []); 

  return (
    <>
      {/* Language Selector */}
      <div className="language-selector">
        <button onClick={() => changeLanguage("en")}>English</button>
        <button onClick={() => changeLanguage("mr")}>मराठी</button>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <h1>🌾 Farmer's Portal 🌾</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/market">Find Nearby Market</Link></li>
              <li><Link to="/techniques">Learn New Techniques</Link></li>
              <li><Link to="/sell">Sell Product</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <section className="hero">
          <img src="/images/farm-banner.jpg" alt="Farm Banner" className="hero-image" />
          <div className="hero-text">
            <h2>Empowering Farmers Through Technology</h2>
            <p>Connect with markets, learn new techniques, and sell produce efficiently.</p>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <h2>Our Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src="/images/market.jpg" alt="Market" />
              <h3>Find Nearby Market</h3>
              <p>Locate markets nearby and plan your selling efficiently.</p>
            </div>
            <div className="feature-card">
              <img src="/images/Technqui.jpg" alt="Techniques" />
              <h3>Learn New Techniques</h3>
              <p>Stay ahead with innovative farming methods and resources.</p>
            </div>
            <div className="feature-card">
              <img src="/images/sell.jpg" alt="Sell Product" />
              <h3>Sell Product</h3>
              <p>List your produce online and connect directly with buyers.</p>
            </div>
            <div className="feature-card">
              <img src="/images/scheme.jpg" alt="Government Schemes" />
              <h3>Know New Government Schemes</h3>
              <p>Stay informed about the latest government initiatives for farmers.</p>
            </div>
            <div className="feature-card">
              <img src="/images/Instrument.jpg" alt="Rent Instrument" />
              <h3>Rent An Instrument</h3>
              <p>Get access to new and easy-to-use tools in agriculture.</p>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="about-us">
          <h2>About Us</h2>
          <p>We empower farmers by providing easy access to resources, markets, and knowledge to enhance productivity.</p>
        </section>

        {/* FAQs */}
        <section className="faqs">
          <h2>Frequently Asked Questions (FAQs)</h2>
          <ul>
            <li><strong>How can I sell my products?</strong><br />List your produce on the "Sell Product" page.</li>
            <li><strong>How do I find the nearest market?</strong><br />Use the "Find Nearby Market" section.</li>
            <li><strong>Are there any charges?</strong><br />No, all services are free.</li>
          </ul>
        </section>

        {/* Social Media Links */}
        <section className="follow-us">
          <h2>Follow Us</h2>
          <div className="social-container">
            <img src="/images/logo.jpg" alt="Logo" />
            <p>Stay connected and updated:</p>
            <ul className="social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="/images/Facebook.png" alt="Facebook" /></a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="/images/twiter.jpg" alt="Twitter" /></a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="/images/Insta.png" alt="Instagram" /></a></li>
            </ul>
          </div>
        </section>

        {/* Profile Section */}
        <section className="profile-info" id="profile-info" style={{ display: "none" }}>
          <h2>Profile</h2>
          <div id="user-info">
            <p>Welcome, <span id="user-name">User</span>!</p>
            <p>Email: <span id="user-email">user@example.com</span></p>
            <p>Phone: <span id="user-phone">123-456-7890</span></p>
          </div>
          <button onClick={() => console.log("Logout User")}>Logout</button>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Farmer's Portal. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;
