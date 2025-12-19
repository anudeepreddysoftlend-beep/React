import React, { useState, useCallback } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import './InitialApplicationForm.css';

interface FormData {
  firstName: string;
  secondName: string;
  lastName: string;
  // panNumber: string;
  // aadharNumber: string;
  netTakeHomeSalary: string;
  dob: string;
  contactNumber: string;
  email: string;
  loanAmount: string;
  loanType: string;
  termsAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const MIN_LOAN = 10000;
const MAX_LOAN = 5000000;

const InitialApplicationForm: React.FC<{ onSuccess?: (data: FormData) => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    secondName: '',
    lastName: '',
    // panNumber: '',
    // aadharNumber: '',
    netTakeHomeSalary: '',
    dob: '',
    contactNumber: '',
    email: '',
    loanAmount: String(MIN_LOAN),
    loanType: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatCurrency = (value: string): string => {
    const numValue = Number(value);
    if (isNaN(numValue)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numValue);
  };

  const sliderPercentage = ((Number(formData.loanAmount) - MIN_LOAN) / (MAX_LOAN - MIN_LOAN)) * 100;

  const validateFormData = (data: FormData): FormErrors => {
    const e: FormErrors = {};

    // First Name
    if (!data.firstName.trim()) e.firstName = 'First name is required';
    else if (data.firstName.trim().length < 4)
      e.firstName = 'First name must be at least 4 characters';

    // Last Name
    if (!data.lastName.trim()) e.lastName = 'Last name is required';
    else if (data.lastName.trim().length < 4)
      e.lastName = 'Last name must be at least 4 characters';

    // Loan Amount
    if (data.loanAmount === '' || data.loanAmount == null) {
      e.loanAmount = 'Loan amount is required';
    } else {
      const loanNum = Number(data.loanAmount);

      if (isNaN(loanNum)) {
        e.loanAmount = 'Loan amount must be a valid number';
      } else if (loanNum < MIN_LOAN || loanNum > MAX_LOAN) {
        e.loanAmount = `Loan amount must be between ${MIN_LOAN} and ${MAX_LOAN}`;
      } else if (loanNum % 1000 !== 0) {
        e.loanAmount = 'Amount must be in multiples of ₹1,000';
      }
    }


    // DOB
    if (!data.dob) {
      e.dob = 'Date of birth is required';
    } else {
      const dobDate = new Date(data.dob);
      const today = new Date();

      // Calculate 18 years ago from today
      const minAdultDate = new Date();
      minAdultDate.setFullYear(today.getFullYear() - 18);

      if (dobDate > minAdultDate) {
        e.dob = 'You must be at least 18 years old';
      }
    }


    // // PAN
    // if (!data.panNumber) {
    //   e.panNumber = 'PAN Number is required';
    // } else {
    //   // Correct PAN format (ABCDE1234F) with 4th letter allowed P or B
    //   const panRegex = /^[A-Z]{3}[PB][A-Z][0-9]{4}[A-Z]$/;

    //   if (!panRegex.test(data.panNumber)) {
    //     e.panNumber =
    //       'PAN must be in format ABCDE1234F (5 letters, 4 digits, 1 letter) and 4th letter must be P or B';
    //   }
    // }

    // // Aadhar
    // if (!data.aadharNumber) {
    //   e.aadharNumber = 'Last 4 digits of Aadhaar are required';
    // } else if (!/^\d{4}$/.test(data.aadharNumber)) {
    //   e.aadharNumber = 'Aadhaar must be exactly 4 digits';
    // }

    // Contact
    if (!data.contactNumber) e.contactNumber = 'Contact number is required';
    else if (!/^\d{10}$/.test(data.contactNumber)) e.contactNumber = 'Contact must be 10 digits';

    // Email
    if (!data.email) {
      e.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      const allowedDomains = [
        'gmail.com',
        'outlook.com',
        'yahoo.com',
        'hotmail.com',
        'icloud.com',
        'live.com',
        'msn.com'
      ];

      if (!emailRegex.test(data.email)) {
        e.email = 'Enter valid email format';
      } else {
        const domain = data.email.split('@')[1];
        if (!allowedDomains.includes(domain.toLowerCase())) {
          e.email = 'Email domain not allowed';
        }
      }
    }

    // Salary
    if (data.netTakeHomeSalary === '' || data.netTakeHomeSalary == null) {
      e.netTakeHomeSalary = 'Net salary is required';
    } else {
      const salary = Number(data.netTakeHomeSalary);
      if (isNaN(salary)) e.netTakeHomeSalary = 'Salary must be a number';
      else if (salary < 0) e.netTakeHomeSalary = 'Salary cannot be negative';
    }

    // Loan Type
    if (!data.loanType) e.loanType = 'Please select loan type';

    // Terms and Conditions
    if (!data.termsAccepted) {
      e.termsAccepted = 'You must accept the Terms and Conditions and Privacy Policy';
    }

    return e;
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    const newValue = name === 'panNumber' ? value.toUpperCase() : value;
    const finalValue = type === 'checkbox' ? checked : newValue;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    // Clear error while typing
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateFormData(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (onSuccess) onSuccess(formData);
      alert('Form Submitted Successfully!');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="loans-page">
      {/* Form */}
      <form onSubmit={handleSubmit} className="loan-form" noValidate>
        {/* Personal & Contact Information Section */}
        <div className="form-section">
          <h2 className="section-title">Personal & Contact Information</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="loanAmount">
                Loan Amount Required <span className="required">*</span>
              </label>
              <div className="loan-slider-container">
                <div className="slider-wrapper">
                  <input
                    type="range"
                    id="loanAmount"
                    name="loanAmount"
                    min={MIN_LOAN}
                    max={MAX_LOAN}
                    step={10000}
                    value={formData.loanAmount}
                    onChange={handleChange}
                    className={`slider ${errors.loanAmount ? 'error' : ''}`}
                  />
                  <div className="slider-track">
                    <div className="slider-fill" style={{ width: `${sliderPercentage}%` }}></div>
                  </div>
                </div>

                <div className="slider-values">
                  <span>{formatCurrency(String(MIN_LOAN))}</span>
                  <span className="slider-current-value">
                    {formatCurrency(formData.loanAmount)}
                  </span>
                  <span>{formatCurrency(String(MAX_LOAN))}</span>
                </div>

                <input
                  type="number"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className={`loan-amount-input ${errors.loanAmount ? 'error' : ''}`}
                  placeholder="Enter loan amount"
                  min={MIN_LOAN}
                  max={MAX_LOAN}
                />
                {errors.loanAmount && <span className="error-message">{errors.loanAmount}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="secondName">Middle Name</label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                value={formData.secondName}
                onChange={handleChange}
                placeholder="Enter middle name (optional)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dob">
                Date of Birth <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? 'error' : ''}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>

            {/* <div className="form-group">
              <label htmlFor="panNumber">
                PAN Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                maxLength={10}
                value={formData.panNumber}
                onChange={handleChange}
                className={errors.panNumber ? 'error' : ''}
                placeholder="ABCDE1234F"
                style={{ textTransform: 'uppercase' }}
              />
              {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="aadharNumber">
                Aadhar Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                maxLength={4}
                value={formData.aadharNumber}
                onChange={handleChange}
                className={errors.aadharNumber ? 'error' : ''}
                placeholder="Last 4 digits of Aadhaar"
              />
              {errors.aadharNumber && <span className="error-message">{errors.aadharNumber}</span>}
            </div> */}

            <div className="form-group">
              <label htmlFor="contactNumber">
                Contact Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                maxLength={10}
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? 'error' : ''}
                placeholder="10 digit contact number"
              />
              {errors.contactNumber && (
                <span className="error-message">{errors.contactNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="netTakeHomeSalary">
                Net Take Home Salary <span className="required">*</span>
              </label>
              <input
                type="number"
                id="netTakeHomeSalary"
                name="netTakeHomeSalary"
                value={formData.netTakeHomeSalary}
                onChange={handleChange}
                className={errors.netTakeHomeSalary ? 'error' : ''}
                placeholder="Enter Net Take Home salary"
                min="0"
              />
              {errors.netTakeHomeSalary && (
                <span className="error-message">{errors.netTakeHomeSalary}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="loanType">
                Loan Type <span className="required">*</span>
              </label>
              <select
                id="loanType"
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className={errors.loanType ? 'error' : ''}
              >
                <option value="">Select Loan Type</option>
                <option value="Fresh Loan">Fresh Loan</option>
                <option value="Balance Transfer">Balance Transfer</option>
              </select>
              {errors.loanType && <span className="error-message">{errors.loanType}</span>}
            </div>
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div>
          <label className="terms-checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className={`terms-checkbox ${errors.termsAccepted ? 'error' : ''}`}
            />
            <span className="terms-text">
              By using this website, you agree to the{' '}
              <Link to="/terms-and-conditions" className="terms-link">
                Terms and Conditions
              </Link>
              {' '}and the{' '}
              <Link to="/privacy-policy" className="terms-link">
                Privacy Policy
              </Link>
              {' '}of www.softlend.in.                                 I also agree to receive calls, WhatsApp messages, and SMS from SoftLend or its partners regarding loan offers, even if my number is registered under DND. I understand that I can withdraw my consent at any time.
            </span>
          </label>
          {errors.termsAccepted && (
            <span className="error-message">{errors.termsAccepted}</span>
          )}
        </div>

        {/* Form Navigation */}
        <div className="form-navigation">
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InitialApplicationForm;
