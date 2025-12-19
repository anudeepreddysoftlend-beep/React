import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Loans.css';

function Loans() {
  const [isLegalDropdownOpen, setIsLegalDropdownOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  return (
    <div className="home-page">
      {/* Hero Section */}

      {/* ✅ Hidden additional keywords for search bots */}
      <p style={{ display: "none" }}>
        SoftLend is India's trusted digital lending platform and loan aggregator connecting borrowers with top lenders for quick loan approval and same-day disbursal.
        Apply online for urgent cash needs, medical emergencies, travel loans, wedding loans, home renovation credit, MSME working capital loans, salary-based loans for
        salaried and self-employed individuals, secured and unsecured loan options, and loans against gold with paperless KYC verification.
        Check loan eligibility instantly, calculate EMI using SoftLend's loan calculator, get low-interest credit lines, fast onboarding, minimal documentation, and
        multi-lender co-lending loan approvals in minutes.
        Get money today, access collateral-free loans, small ticket emergency loans, consumer lending support, business line-of-credit loans, and personal finance funding
        with instant processing through India's best fintech lenders.
      </p>

      {/* Optional multiple hidden keyword variations for stronger brand ranking */}
      <p style={{ display: "none" }}>
        softLend loan, SoftLend personal loan, SoftLend gold loan, SoftLend business loan, online loan SoftLend, instant approvals SoftLend,
        loan today SoftLend, emergency funding SoftLend india, credit line SoftLend india, MSME loan SoftLend, loan aggregator SoftLend,
        paperless loan india SoftLend, KYC loan SoftLend, salary loan SoftLend, urgent cash loan SoftLend, medical loan SoftLend,
        wedding loan SoftLend, travel loan SoftLend, home improvement loan SoftLend, fast loans SoftLend no documents india
      </p>

      {/* Loan Categories Section */}
      <section className="loan-categories-section">
        <h2 className="section-title">Loans</h2>

        <div className="loan-categories-grid">
          {[
            { label: "Personal Loan", icon: "👤" },
            { label: "Home Loan", icon: "🏠" },
            { label: "Business Loan", icon: "🏢" },
            { label: "Auto Loan", icon: "🚗" },
            { label: "Loan Against Property", icon: "🏦" },
            { label: "Gold Loan", icon: "🪙" },
          ].map((loan) => (
            <Link
              key={loan.label}
              to="/forms"
              className="loan-category-card"
            >
              <div className="loan-icon">{loan.icon}</div>
              <div className="loan-label">{loan.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <div>
          {/* ABOUT */}
          <Link
            to="/about"
            className={`footer-link footer-link-about ${hoveredLink === "about" ? "footer-link-hovered" : ""
              }`}
            onMouseEnter={() => setHoveredLink("about")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            About
          </Link>

          {/* CONTACT */}
          <Link
            to="/contact"
            className={`footer-link footer-link-contact ${hoveredLink === "contact" ? "footer-link-hovered" : ""
              }`}
            onMouseEnter={() => setHoveredLink("contact")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Contact
          </Link>

          {/* LEGAL DROPDOWN */}
          <div
            className={`footer-link-dropdown footer-link-legal ${hoveredLink === "legal" ? "footer-link-hovered" : ""
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

export default Loans;
