import React from 'react';
import './Grievance.css';

const Grievance: React.FC = () => {
  return (
    <div className="grievance-page">
      <div className="grievance-hero">
        <h1>Grievance Redressal</h1>
        <p>We are committed to resolving your concerns promptly</p>
      </div>

      <div className="grievance-content">
        <section className="grievance-section">
          <p><strong>Grievance Redressal Officer (GRO)</strong></p>

          <ul>
            <li><strong>Name:</strong> Anudeep Reddy</li>
            <li><strong>Designation:</strong> Chief Operating Officer</li>
            <li><strong>Email:</strong> <a href="mailto:anudeepreddy.softlend@gmail.com">anudeepreddy.softlend@gmail.com</a></li>
            <li><strong>Phone:</strong> +91 9480080044</li>
            <li><strong>Address:</strong> # 7, 1st Cross Second main, Ganganagar, Bangalore 560032</li>
          </ul>

          <p className="resolution-note">
            Customers may raise complaints by writing to the above email or contacting the phone number during business hours.
            Complaints shall be acknowledged and resolved within <strong>15 business days</strong>, unless otherwise communicated.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Grievance;
