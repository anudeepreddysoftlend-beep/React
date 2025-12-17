import React from "react";
import { useNavigate } from "react-router-dom";
import "./Loans.css";

interface LoanBanner {
  id: string;
  title: string;
  description: string;
  icon: string;
  className: string;
  features: string[];
}

const loanBanners: LoanBanner[] = [
  {
    id: "personal",
    title: "Personal Loan",
    description:
      "Get the funds you need for personal expenses, medical emergencies, or urgent financial needs",
    icon: "👤",
    className: "personal-loan",
    features: ["Quick Approval", "Flexible Terms", "Competitive Rates"],
  },
  {
    id: "business",
    title: "Business Loan",
    description:
      "Fuel your business growth with working capital, expansion funds, or equipment financing",
    icon: "💼",
    className: "business-loan",
    features: ["Fast Processing", "No Collateral", "Easy Documentation"],
  },
  {
    id: "auto",
    title: "Auto Loan",
    description:
      "Drive your dream vehicle home with hassle-free auto loan solutions",
    icon: "🚗",
    className: "auto-loan",
    features: ["Low Interest", "Instant Approval", "Wide Coverage"],
  },
  {
    id: "home",
    title: "Home Loan",
    description:
      "Make your dream home a reality with affordable home loan options",
    icon: "🏠",
    className: "home-loan",
    features: ["Low EMI", "Long Tenure", "Tax Benefits"],
  },
  {
    id: "property",
    title: "Loan Against Property",
    description:
      "Unlock the value of your property to meet your financial needs",
    icon: "🏢",
    className: "property-loan",
    features: ["High Loan Value", "Lower Interest", "Flexible Usage"],
  },
  {
    id: "gold",
    title: "Gold Loan",
    description:
      "Get instant funds by pledging your gold with minimal documentation",
    icon: "🥇",
    className: "gold-loan",
    features: ["Instant Disbursal", "Secure", "Minimal Paperwork"],
  },
];

const Loans: React.FC = () => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate("/forms");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBannerClick();
    }
  };

  return (
    <div className="loans-page">
      <div className="loans-header">
        <h1>Choose Your Loan Type</h1>
        <p>
          Select the loan that best fits your needs and start your application today
        </p>
      </div>

      <div className="loan-banners-container">
        {loanBanners.map((loan) => (
          <div
            key={loan.id}
            className={`loan-banner ${loan.className}`}
            onClick={handleBannerClick}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <div className="banner-icon">{loan.icon}</div>

            <div className="banner-content">
              <h2>{loan.title}</h2>
              <p>{loan.description}</p>

              <div className="banner-features">
                {loan.features.map((feature) => (
                  <span key={feature} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="banner-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loans;

