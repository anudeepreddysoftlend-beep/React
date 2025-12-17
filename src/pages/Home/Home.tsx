import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

function Home() {
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* ✅ Visible H1 with brand name for SEO - Google prioritizes visible content */}
          <h1 className="hero-title">
            SmoothLend - Your Financial Future Starts Here
          </h1>

          {/* ✅ Hidden additional keywords for search bots */}
          <p style={{ display: "none" }}>
            SmoothLend is India's trusted digital lending platform and loan aggregator connecting borrowers with top lenders for quick loan approval and same-day disbursal.
            Apply online for urgent cash needs, medical emergencies, travel loans, wedding loans, home renovation credit, MSME working capital loans, salary-based loans for
            salaried and self-employed individuals, secured and unsecured loan options, and loans against gold with paperless KYC verification.
            Check loan eligibility instantly, calculate EMI using SmoothLend's loan calculator, get low-interest credit lines, fast onboarding, minimal documentation, and
            multi-lender co-lending loan approvals in minutes.
            Get money today, access collateral-free loans, small ticket emergency loans, consumer lending support, business line-of-credit loans, and personal finance funding
            with instant processing through India's best fintech lenders.
          </p>

          {/* Optional multiple hidden keyword variations for stronger brand ranking */}
          <p style={{ display: "none" }}>
            smoothlend loan, smoothlend personal loan, smoothlend gold loan, smoothlend business loan, online loan smoothlend, instant approvals smoothlend,
            loan today smoothlend, emergency funding smoothlend india, credit line smoothlend india, MSME loan smoothlend, loan aggregator smoothlend,
            paperless loan india smoothlend, KYC loan smoothlend, salary loan smoothlend, urgent cash loan smoothlend, medical loan smoothlend,
            wedding loan smoothlend, travel loan smoothlend, home improvement loan smoothlend, fast loans smoothlend no documents india
          </p>

          <p className="hero-subtitle">
            Welcome to SmoothLend - Get the loan you need with competitive rates, flexible terms, and a simple application process.
            Trusted by thousands of customers nationwide.
          </p>

          <p className="hero-subtitle">Apply for Personal Loan Online with SmoothLend</p>
          <p className="hero-subtitle">Get Loan Against Gold Online with SmoothLend – Instant Disbursal</p>
          <p className="hero-subtitle">Check Loan Eligibility & EMI Calculator at SmoothLend</p>
          <p className="hero-subtitle">SmoothLend - Where Borrower Meets Lender – Fast, Smooth, Paperless Lending</p>

          <div className="hero-buttons">
            <Link to="/forms" className="btn btn-secondary">Apply Now</Link>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Approval</h3>
            <p>Get approved in minutes with our streamlined application process. No lengthy paperwork required.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">💰</div>
            <h3>Competitive Rates</h3>
            <p>Enjoy some of the best interest rates in the market. We work hard to save you money.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Safe</h3>
            <p>Your data is protected with bank-level encryption. Your privacy is our priority.</p>
          </div>
          <div className="feature-card card">
            <div className="feature-icon">👥</div>
            <h3>Expert Support</h3>
            <p>Our dedicated team is here to help you every step of the way. 24/7 customer support available.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$2B+</div>
            <div className="stat-label">Loans Disbursed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
  <div>
    {/* ABOUT */}
    <Link
      to="/about"
      className={`footer-link footer-link-about ${
        hoveredLink === "about" ? "footer-link-hovered" : ""
      }`}
      onMouseEnter={() => setHoveredLink("about")}
      onMouseLeave={() => setHoveredLink(null)}
    >
      About
    </Link>

    {/* CONTACT */}
    <Link
      to="/contact"
      className={`footer-link footer-link-contact ${
        hoveredLink === "contact" ? "footer-link-hovered" : ""
      }`}
      onMouseEnter={() => setHoveredLink("contact")}
      onMouseLeave={() => setHoveredLink(null)}
    >
      Contact
    </Link>

    {/* LEGAL DROPDOWN */}
    <div
      className={`footer-link-dropdown footer-link-legal ${
        hoveredLink === "legal" ? "footer-link-hovered" : ""
      }`}
      onMouseEnter={() => {
        setHoveredLink("legal");
        setIsLegalDropdownOpen(true);
      }}
      onMouseLeave={() => {
        setHoveredLink(null);
        setIsLegalDropdownOpen(false);
      }}
    >
      <span>Legal</span>

      {isLegalDropdownOpen && (
        <div
          className="footer-dropdown"
          onMouseEnter={() => {
            setHoveredLink("legal");
            setIsLegalDropdownOpen(true);
          }}
        >
          <Link to="/terms-and-conditions" className="footer-dropdown-item">
            Terms and Conditions
          </Link>

          <Link to="/privacy-policy" className="footer-dropdown-item">
            Privacy Policy
          </Link>
        </div>
      )}
    </div>
  </div>
</footer>


    </div>
  );
}

export default Home;

// import React from "react";

// const Home: React.FC = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <p>Welcome to our application.</p>
//     </div>
//   );
// };

// export default Home;
