import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="terms-page">
      <div className="terms-hero">
        <h1>Terms and Conditions — SoftLend</h1>
        <p>Last updated: {'12/08/2025'}</p>
      </div>

      <div className="terms-content">
        <section className="terms-section">
          <p>Welcome to SoftLend (“Website”). By accessing or using this Website, you (“User”) agree to be bound by these Terms & Conditions (“Terms”). If you do not agree, please do not use this Website.</p>
        </section>
        <section className="terms-section">
          <h2>1. Nature of Services</h2>
          <p>
            SoftLend is a loan lead-generation platform.
            We do not provide loans directly.
            We collect your information and share it with our lending partners (NBFCs/Banks/DSAs) to help process your loan application and provide loan offers.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. User Eligibility</h2>
          <p>
            You confirm that:

            You are an Indian citizen

            You are 18 years or older

            You are submitting information voluntarily
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Information You Provide</h2>
          <p>
            By using this Website, you may be required to submit personal information including but not limited to:

            Name

            Phone number

            Email ID

            PAN

            Last 4 digits of Aadhaar (optional)

            Income details

            Required loan amount

            This information is collected solely for loan processing and verification by lending partners.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Consent to Share Information</h2>
          <p>
            By submitting your details, you explicitly authorize SoftLend to:

            Collect and use your information for loan assessment

            Share your information with our lending partners, NBFCs, banks, and authorized DSAs

            Allow them to contact you for loan-related communication

            This includes communication through phone calls, SMS, WhatsApp, or email.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. DND Consent (Important)</h2>
          <p>
            You acknowledge and agree that:

            “Even if my mobile number is registered under DND (Do Not Disturb), I consent to receive calls, SMS, WhatsApp messages, or emails from SoftLend or its lending partners regarding my loan application.”

            If you do not want communication, you may withdraw consent anytime (see Section 10).
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Accuracy of Information</h2>
          <p>
            You agree that all information provided is:

            True

            Accurate

            Complete

            Providing false information may result in rejection of your loan request.
          </p>
        </section>

        <section className="terms-section">
          <h2>7. No Guarantee of Loan Approval</h2>
          <p>
            SoftLend is only a facilitator.
            We do not guarantee:

            Loan approval

            Loan amount

            Interest rate

            Timeline of processing

            These decisions are made entirely by the respective lender.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Third-Party Links</h2>
          <p>
            This Website may contain links to third-party platforms (NBFCs/banks).
            SoftLend is not responsible for their content, policies, or decisions.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            SoftLend shall not be liable for:

            Any delay or rejection of your loan

            Any financial loss

            Any communication made by partner lenders

            Any breach by third-party service providers

            You agree to use this Website at your own risk.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Consent Withdrawals</h2>
          <p>
            You may withdraw your consent anytime by writing to:
            📧 <a href="mailto:support@softlend.in">support@softlend.in</a>

            Upon withdrawal, we will stop sharing your data further, but already shared data cannot be recalled from lenders.
          </p>
        </section>

        <section className="terms-section">
          <h2>11. Data Protection Compliance</h2>
          <p>
            SoftLend follows reasonable security practices as required under the Digital Personal Data Protection Act, 2023 (DPDPA).

            Your data will be:

            Collected only with consent

            Used only for stated purposes

            Shared only with authorized lending partners

            Retained only as long as required for loan processing

          </p>
        </section>

        <section className="terms-section">
          <h2>12. Intellectual Property</h2>
          <p>
            All content, logos, text, and design on this Website are the property of SoftLend and cannot be copied without permission.
          </p>
        </section>

        <section className="terms-section">
          <h2>13. Changes to Terms</h2>
          <p>
            SoftLend reserves the right to update these Terms anytime.
            Changes will be posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section className="terms-section">
          <h2>14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India.
            Any disputes shall be handled exclusively in courts located in Bangalore, Karnataka.
          </p>
        </section>

        <section className="terms-section">
          <h2>15. Contact Us</h2>
          <p>
            For any questions or complaints, reach us at:

            📧 <a href="mailto:support@softlend.in">support@softlend.in</a>

            📍 Bangalore, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;













