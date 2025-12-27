import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-hero">
        <h1>PRIVACY POLICY — SoftLend</h1>
        <p>Last updated: {'12/08/2025'}</p>
      </div>

      <div className="privacy-content">
        <section className="privacy-section">
          <p>
            SoftLend (“we”, “our”, “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, share, and protect your information when you use our website (“Website”).
            By accessing or using this Website, you consent to the practices described in this Policy.

            This Policy is compliant with the Digital Personal Data Protection Act, 2023 (DPDPA).
          </p>
        </section>
        <section className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We may collect the following personal information when you submit a loan enquiry:

            Name

            Phone number

            Email ID

            PAN

            Last 4 digits of Aadhaar (optional)

            Income details

            Employment details

            Loan amount requirement

            Any information voluntarily provided by you

            We also collect device and usage information such as:

            IP address

            Browser type

            Cookies for analytics
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Purpose of Data Collection</h2>
          <p>
            Your personal information is collected only for the following purposes:

            Assessing your eligibility for a loan

            Sharing your details with our lending partners (NBFCs/Banks/DSAs)

            KYC verification (PAN-based verification)

            Credit-related checks performed by lenders

            Communicating loan offers and updates

            Improving our Website and user experience

            We will not use your data for any purpose not mentioned here without your consent.
          </p>
        </section>

        <section className="privacy-section">
          <h2>3. Legal Basis for Processing (DPDPA Compliance)</h2>
          <p>We process your personal data based on:</p>
          <p>

            ✔ Your explicit consent when you fill out the form<br />
            ✔ Performance of services requested by you<br />
            ✔ Legitimate business purpose of connecting you with lenders<br />

          </p>

          <p>You may withdraw your consent at any time (see Section 9).</p>
        </section>

        <section className="privacy-section">
          <h2>4. Sharing of Personal Information</h2>
          <p>
            We may share your data only with:

            Registered NBFCs

            Banks

            Authorized DSAs

            Third-party service providers assisting in loan processing

            We do not sell or misuse your personal information.

            Your data is shared only for loan assessment and verification.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. DND Consent</h2>
          <p>
            By submitting your details, you explicitly consent that:

            “Even if my number is registered under DND (Do Not Disturb), I agree to receive calls, SMS, emails, and WhatsApp messages from SoftLend and its lending partners regarding my loan application.”

            This consent is required to legally contact you.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Data Storage & Retention</h2>
          <p>We retain your data only as long as necessary for:

            Loan processing

            Resolving disputes

            Complying with legal obligations

            After this period, the data is securely deleted or anonymized.</p>
        </section>

        <section className="privacy-section">
          <h2>7. Your Rights Under DPDPA</h2>
          <p>
            Under the Digital Personal Data Protection Act, 2023, you have the right to:</p>

          <p>

            ✔ Access your personal data <br />
            ✔ Correct inaccurate data <br />
            ✔ Withdraw consent <br />
            ✔ Request deletion (where applicable) <br />
            ✔ Know with whom your data has been shared <br />
            ✔ Lodge a complaint with the Data Protection Board <br />
          </p>


          <p>We will respond to valid requests within the required timelines.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Data Security Measures</h2>
          <p>
            We use reasonable security measures to protect your information, including:

            Encrypted data transmission

            Restricted access to sensitive data

            Secure data storage

            Regular monitoring to prevent unauthorized access

            However, no system is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Consent Withdrawal</h2>
          <p>
            You may withdraw your consent anytime by contacting:

            📧 <a href="mailto:support@softlend.in">support@softlend.in</a>

            Upon withdrawal:

            We will stop processing your data

            We will stop sharing your data further

            Data already shared with lenders cannot be recalled


          </p>
        </section>

        <section className="privacy-section">
          <h2>10. Third-Party Websites</h2>
          <p>
            Our Website may contain links to third-party sites.
            We are not responsible for their:

            Content

            Privacy practices

            Data usage

            Please review their policies before sharing information.
          </p>
        </section>

        <section className="privacy-section">
          <h2>11. Children’s Privacy</h2>
          <p>
            Our services are not intended for individuals below 18 years of age.
            We do not knowingly collect data from minors.
          </p>
        </section>

        <section className="privacy-section">
          <h2>12. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically.
            Any changes will be reflected on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>13. Contact Us</h2>
          <p>
            For any privacy-related questions or requests, contact:

            📧 <a href="mailto:support@softlend.in">support@softlend.in</a>

            📍 Bangalore, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;













