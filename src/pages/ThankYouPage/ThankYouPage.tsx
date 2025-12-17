import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouPage.css";

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="success-icon">&#10004;</div>

        <h1 className="thankyou-title">Thank You!</h1>

        <p className="thankyou-subtitle">
          Your loan application has been submitted successfully.
        </p>

        <p className="thankyou-message">
          Our team is currently reviewing your details. You will receive a call
          or email from our loan specialists shortly.  
          We appreciate your time and look forward to assisting you further!
        </p>

        <button className="home-button" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
