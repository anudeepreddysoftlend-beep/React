import React from "react";
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About SoftLend</h1>
        <p>Your trusted digital loan lead-generation and referral platform</p>
      </div>

      {/* Introduction Section */}
      <section className="about-section">
        <div className="about-content-card card">
          <h2 className="section-heading">Who We Are</h2>
          <div className="about-text-content">
            <p>
              SoftLend is a digital loan lead-generation and referral platform that helps individuals 
              connect with RBI-regulated NBFCs and authorized lending partners for various loan products.
            </p>
            <p>
              We do not provide loans directly and do not take any lending decisions. Our role is limited 
              to collecting user information with explicit consent and securely sharing it with our partner 
              lenders to help them evaluate loan eligibility and offer suitable financial products.
            </p>
            <p>
              SoftLend aims to simplify the loan discovery process by enabling borrowers to submit their 
              details through a single platform and receive communication from verified lenders.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="info-section">
        <div className="info-card card">
          <h2 className="section-heading">What We Do</h2>
          <ul className="info-list">
            <li>
              <span className="list-icon">✓</span>
              <span>Collect loan enquiries from users through our website</span>
            </li>
            <li>
              <span className="list-icon">✓</span>
              <span>Share verified leads with registered NBFCs and lending partners</span>
            </li>
            <li>
              <span className="list-icon">✓</span>
              <span>Enable faster and more transparent communication between borrowers and lenders</span>
            </li>
          </ul>
        </div>
      </section>

      {/* What We Don't Do Section */}
      <section className="info-section">
        <div className="info-card card">
          <h2 className="section-heading">What We Don't Do</h2>
          <ul className="info-list">
            <li>
              <span className="list-icon">✗</span>
              <span>We do not sanction, approve, or guarantee loans</span>
            </li>
            <li>
              <span className="list-icon">✗</span>
              <span>We do not charge users any upfront fees</span>
            </li>
            <li>
              <span className="list-icon">✗</span>
              <span>We do not access or fetch credit bureau data directly</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Data Privacy Section */}
      <section className="about-section">
        <div className="about-content-card card">
          <h2 className="section-heading">Data Privacy & Consent</h2>
          <div className="about-text-content">
            <p>
              We respect user privacy and comply with applicable Indian laws, including the Digital Personal 
              Data Protection Act, 2023 (DPDPA) and TRAI regulations.
            </p>
            <p>
              User data is collected only after explicit consent and is shared strictly for loan-processing 
              purposes with authorized partners.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="info-section">
        <div className="info-card card">
          <h2 className="section-heading">Our Commitment</h2>
          <ul className="info-list">
            <li>
              <span className="list-icon">🔒</span>
              <span>Transparency in how user data is used</span>
            </li>
            <li>
              <span className="list-icon">🔒</span>
              <span>Secure handling of personal information</span>
            </li>
            <li>
              <span className="list-icon">🔒</span>
              <span>Compliance with regulatory and data-protection standards</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;

