import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './MultiStepForm.css';

/* -------------------------------------------
   FORM DATA INTERFACE
------------------------------------------- */
interface FormData {
  // Applicant Details
  fatherNameWithInitial: string;
  spouseName: string;
  motherName: string;
  maritalStatus: string;
  callerName: string;
  permanentName: string;
  permanentContactNumber: string;

  // Contact Information
  officialMailId: string;
  presentAddress: string;
  rentOrOwnHouse: string;
  presentAddressLandmark: string;
  presentAddressStayDuration: string;
  permanentAddress: string;
  presentContactNumber: string;

  // Employment & Financial
  designation: string;
  companyNameAsPerPaySlip: string;
  officeAddress: string;
  officeAddressLandmark: string;
  officeContactNumber: string;
  totalWorkExperience: string;
  presentCompanyWorkExperience: string;
  netTakeHomeSalary: string;
  salaryAccount: string;
  existingLoanDetails: string;
  loanAmount: string;
  bankName: string;

  // Documents & References
  referenceRelative1: string;
  referenceRelative2: string;
  documentsMail: string;
  documentsWhatsapp: string;
}

interface FormErrors {
  [key: string]: string;
}

/* -------------------------------------------
   REUSABLE VALIDATION HELPERS
------------------------------------------- */
const requireText = (val: string) => val.trim().length > 0;
const minLen = (val: string, len: number) => val.trim().length >= len;
const isEmail = (email: string) => /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
const isPhone10 = (num: string) => /^[0-9]{10}$/.test(num);
const isDecimalOrInt = (value: string) => /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
const durationRegex = /^\d+(\.\d+)?(\s+(year|years|yr|yrs))?$/i;

/* -------------------------------------------
   MAIN COMPONENT
------------------------------------------- */
const MultiStepForm: React.FC<{ onSuccess?: (data: FormData) => void }> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fatherNameWithInitial: '',
    spouseName: '',
    motherName: '',
    maritalStatus: '',
    callerName: '',
    permanentName: '',
    permanentContactNumber: '',

    officialMailId: '',
    presentAddress: '',
    rentOrOwnHouse: '',
    presentAddressLandmark: '',
    presentAddressStayDuration: '',
    permanentAddress: '',
    presentContactNumber: '',

    designation: '',
    companyNameAsPerPaySlip: '',
    officeAddress: '',
    officeAddressLandmark: '',
    officeContactNumber: '',
    totalWorkExperience: '',
    presentCompanyWorkExperience: '',
    netTakeHomeSalary: '',
    salaryAccount: '',
    existingLoanDetails: '',
    loanAmount: '',
    bankName: '',

    referenceRelative1: '',
    referenceRelative2: '',
    documentsMail: '',
    documentsWhatsapp: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sections = [
    'Applicant Details',
    'Contact Information Address Details',
    'Employment Information',
    'Document & References',
  ];

  /* -------------------------------------------
     FIELD → SECTION MAP
  ------------------------------------------- */
  const fieldToSectionMap: Record<string, number> = {
    fatherNameWithInitial: 0,
    spouseName: 0,
    motherName: 0,
    maritalStatus: 0,
    permanentContactNumber: 0,
    permanentName: 0,

    officialMailId: 1,
    rentOrOwnHouse: 1,
    presentAddress: 1,
    presentAddressLandmark: 1,
    presentAddressStayDuration: 1,
    permanentAddress: 1,
    presentContactNumber: 1,

    designation: 2,
    officeAddress: 2,
    companyNameAsPerPaySlip: 2,
    officeAddressLandmark: 2,
    officeContactNumber: 2,
    totalWorkExperience: 2,
    presentCompanyWorkExperience: 2,
    salaryAccount: 2,
    bankName: 2,

    referenceRelative1: 3,
    referenceRelative2: 3,
    documentsMail: 3,
    documentsWhatsapp: 3,
  };

  /* -------------------------------------------
     INPUT CHANGE HANDLER
  ------------------------------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-clear spouse if marital status changes
      if (name === 'maritalStatus' && value !== 'Married') {
        updated.spouseName = '';
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const cleaned = { ...prev };
        delete cleaned[name];
        return cleaned;
      });
    }
  };

  /* -------------------------------------------
     VALIDATION PER SECTION
  ------------------------------------------- */
  const validateSection = (sectionIndex: number, data: FormData): FormErrors => {
    const errs: FormErrors = {};

    /* ---- SECTION 0: Applicant Details ---- */
    if (sectionIndex === 0) {
      if (!requireText(data.fatherNameWithInitial))
        errs.fatherNameWithInitial = 'Father Name is required';
      else if (!minLen(data.fatherNameWithInitial, 4))
        errs.fatherNameWithInitial = 'Minimum 4 characters required';

      if (!requireText(data.motherName)) errs.motherName = "Mother's name is required";
      else if (!minLen(data.motherName, 4)) errs.motherName = 'Minimum 4 characters required';

      if (!requireText(data.maritalStatus)) errs.maritalStatus = 'Please select marital status';

      if (data.maritalStatus === 'Married') {
        if (!requireText(data.spouseName)) errs.spouseName = 'Spouse name is required';
        else if (!minLen(data.spouseName, 4)) errs.spouseName = 'Minimum 4 characters required';
      }

      if (!requireText(data.permanentContactNumber))
        errs.permanentContactNumber = 'Contact number is required';
      else if (!isPhone10(data.permanentContactNumber))
        errs.permanentContactNumber = 'Enter valid 10-digit number';

      if (!requireText(data.permanentName)) errs.permanentName = 'Permanent name is required';
      else if (!minLen(data.permanentName, 4)) errs.permanentName = 'Minimum 4 characters required';
    }

    /* ---- SECTION 1: Contact Information ---- */
    if (sectionIndex === 1) {
      if (!requireText(data.officialMailId)) errs.officialMailId = 'Official email is required';
      else if (!isEmail(data.officialMailId)) errs.officialMailId = 'Enter a valid email address';

      if (!requireText(data.rentOrOwnHouse)) errs.rentOrOwnHouse = 'Choose an option';

      if (!requireText(data.presentAddress)) errs.presentAddress = 'Present address is required';
      else if (!minLen(data.presentAddress, 15))
        errs.presentAddress = 'Minimum 15 characters required';

      if (!requireText(data.presentAddressLandmark))
        errs.presentAddressLandmark = 'Address landmark is required';
      else if (!minLen(data.presentAddressLandmark, 4))
        errs.presentAddressLandmark = 'Minimum 4 characters required';

      if (!requireText(data.permanentAddress))
        errs.permanentAddress = 'Permanent address is required';
      else if (!minLen(data.permanentAddress, 15))
        errs.permanentAddress = 'Minimum 15 characters required';

      if (!requireText(data.presentAddressStayDuration))
        errs.presentAddressStayDuration = 'Duration is required';
      else if (!durationRegex.test(data.presentAddressStayDuration.trim()))
        errs.presentAddressStayDuration = 'Enter duration like "2" or "2 years"';

      if (!requireText(data.presentContactNumber))
        errs.presentContactNumber = 'Present contact number is required';
      else if (!isPhone10(data.presentContactNumber))
        errs.presentContactNumber = 'Enter valid 10-digit number';
    }

    /* ---- SECTION 2: Employment & Financial ---- */
    if (sectionIndex === 2) {
      if (!requireText(data.designation)) errs.designation = 'Designation is required';
      else if (!minLen(data.designation, 4)) errs.designation = 'Minimum 4 characters required';

      if (!requireText(data.companyNameAsPerPaySlip))
        errs.companyNameAsPerPaySlip = 'Company Name As Per Pay Slip is required';
      else if (!minLen(data.companyNameAsPerPaySlip, 4))
        errs.companyNameAsPerPaySlip = 'Minimum 4 characters required';

      if (!requireText(data.officeAddress)) errs.officeAddress = 'Office address is required';
      else if (!minLen(data.officeAddress, 15))
        errs.officeAddress = 'Minimum 15 characters required';

      if (!requireText(data.officeAddressLandmark))
        errs.officeAddressLandmark = 'Office Address landmark is required';
      else if (!minLen(data.officeAddressLandmark, 4))
        errs.officeAddressLandmark = 'Minimum 4 characters required';

      if (!requireText(data.officeContactNumber))
        errs.officeContactNumber = 'Office contact number is required';
      else if (!isPhone10(data.officeContactNumber))
        errs.officeContactNumber = 'Enter valid 10-digit number';

      if (!requireText(data.totalWorkExperience))
        errs.totalWorkExperience = 'Total work experience is required';
      else if (!isDecimalOrInt(data.totalWorkExperience))
        errs.totalWorkExperience = 'Enter a valid number';

      if (!requireText(data.presentCompanyWorkExperience))
        errs.presentCompanyWorkExperience = 'Present company experience is required';
      else if (!isDecimalOrInt(data.presentCompanyWorkExperience))
        errs.presentCompanyWorkExperience = 'Enter a valid number';

      if (!requireText(data.salaryAccount))
        errs.salaryAccount = 'Salary account number is required';
      else if (!/^[0-9]{9,18}$/.test(data.salaryAccount))
        errs.salaryAccount = 'Enter 9–18 digit number';

      if (!requireText(data.bankName)) errs.bankName = 'Bank name is required';
      else if (!minLen(data.bankName, 4)) errs.bankName = 'Minimum 4 characters required';
    }

    /* ---- SECTION 3: Document & References ---- */
    if (sectionIndex === 3) {
      if (!requireText(data.referenceRelative1))
        errs.referenceRelative1 = 'Reference Relative 1 is required';
      else if (!minLen(data.referenceRelative1, 4))
        errs.referenceRelative1 = 'Minimum 4 characters required';

      if (!requireText(data.referenceRelative2))
        errs.referenceRelative2 = 'Reference Relative 2 is required';
      else if (!minLen(data.referenceRelative2, 4))
        errs.referenceRelative2 = 'Minimum 4 characters required';

      if (!requireText(data.documentsMail)) errs.documentsMail = 'Documents email is required';
      else if (!isEmail(data.documentsMail)) errs.documentsMail = 'Enter valid email address';

      if (!requireText(data.documentsWhatsapp))
        errs.documentsWhatsapp = 'WhatsApp number is required';
      else if (!isPhone10(data.documentsWhatsapp))
        errs.documentsWhatsapp = 'Enter valid 10-digit number';
    }

    return errs;
  };

  /* -------------------------------------------
     NEXT / PREVIOUS
  ------------------------------------------- */
  const handleNext = () => {
    const validationErrors = validateSection(currentSection, formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const first = Object.keys(validationErrors)[0];
      setTimeout(() => document.getElementsByName(first)[0]?.focus(), 0);
      return;
    }

    setErrors({});
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* -------------------------------------------
     FINAL SUBMIT
  ------------------------------------------- */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const finalErrors: FormErrors = {
      ...validateSection(0, formData),
      ...validateSection(1, formData),
      ...validateSection(2, formData),
      ...validateSection(3, formData),
    };

    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);

      const firstField = Object.keys(finalErrors)[0];
      const jumpTo = fieldToSectionMap[firstField] ?? 0;

      setCurrentSection(jumpTo);
      setTimeout(() => document.getElementsByName(firstField)[0]?.focus(), 0);

      return;
    }

    setIsSubmitting(true);

    if (onSuccess) {
      onSuccess(formData);
    }
    
    alert('Form submitted successfully!');
    setIsSubmitting(false);
  };

  /* -------------------------------------------
     RENDER COMPONENT
  ------------------------------------------- */
  return (
    <div className="loans-page">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          Section {currentSection + 1} of {sections.length}
        </div>
      </div>

      {/* Section Navigation */}
      <div className="section-nav">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`section-nav-item ${index === currentSection ? 'active' : ''
              } ${index < currentSection ? 'completed' : ''}`}
            disabled={index > currentSection}
            onClick={() => {
              setCurrentSection(index);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="section-number">{index + 1}</span>
            <span className="section-name">{section}</span>
          </button>
        ))}
      </div>

      {/* FORM START */}
      <form onSubmit={handleSubmit} className="loan-form">
        {/* ---------------------------------------------------
           SECTION 0 — Applicant Details
        --------------------------------------------------- */}
        {currentSection === 0 && (
          <div className="form-section">
                <h2 className="section-title">Applicant Details</h2>
                <div className="form-grid">
                  {/* Father Name */}
                  <div className="form-group">
                    <label htmlFor="fatherNameWithInitial">
                      Father Name with Initial <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="fatherNameWithInitial"
                      name="fatherNameWithInitial"
                      value={formData.fatherNameWithInitial}
                      onChange={handleChange}
                      className={errors.fatherNameWithInitial ? 'error' : ''}
                      placeholder="e.g., Mr. John D."
                    />
                    {errors.fatherNameWithInitial && (
                      <span className="error-message">{errors.fatherNameWithInitial}</span>
                    )}
                  </div>

                  {/* Mother Name */}
                  <div className="form-group">
                    <label htmlFor="motherName">
                      Mother Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="motherName"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className={errors.motherName ? 'error' : ''}
                      placeholder="Enter mother's full name"
                    />
                    {errors.motherName && (
                      <span className="error-message">{errors.motherName}</span>
                    )}
                  </div>

                  {/* Marital Status */}
                  <div className="form-group">
                    <label htmlFor="maritalStatus">
                      Marital Status <span className="required">*</span>
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className={errors.maritalStatus ? 'error' : ''}
                    >
                      <option value="">Select marital status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                    {errors.maritalStatus && (
                      <span className="error-message">{errors.maritalStatus}</span>
                    )}
                  </div>

                  {/* Spouse Name */}
                  <div className="form-group">
                    <label htmlFor="spouseName">Spouse's Name</label>
                    <input
                      type="text"
                      id="spouseName"
                      name="spouseName"
                      value={formData.spouseName}
                      onChange={handleChange}
                      className={errors.spouseName ? 'error' : ''}
                      placeholder="Enter spouse name (if married)"
                      disabled={formData.maritalStatus !== 'Married'}
                    />
                    {errors.spouseName && (
                      <span className="error-message">{errors.spouseName}</span>
                    )}
                  </div>

                  {/* Permanent Name */}
                  <div className="form-group">
                    <label htmlFor="permanentName">
                      Permanent Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="permanentName"
                      name="permanentName"
                      value={formData.permanentName}
                      onChange={handleChange}
                      className={errors.permanentName ? 'error' : ''}
                      placeholder="Name at permanent address"
                    />
                    {errors.permanentName && (
                      <span className="error-message">{errors.permanentName}</span>
                    )}
                  </div>

                  {/* Permanent Contact */}
                  <div className="form-group">
                    <label htmlFor="permanentContactNumber">
                      Permanent Contact Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="permanentContactNumber"
                      name="permanentContactNumber"
                      maxLength={10}
                      value={formData.permanentContactNumber}
                      onChange={handleChange}
                      className={errors.permanentContactNumber ? 'error' : ''}
                      placeholder="10 digit number"
                    />
                    {errors.permanentContactNumber && (
                      <span className="error-message">{errors.permanentContactNumber}</span>
                    )}
                  </div>
                </div>
          </div>
        )}

        {/* ---------------------------------------------------
           SECTION 1 — Contact Information
        --------------------------------------------------- */}
        {currentSection === 1 && (
          <div className="form-section">
                <h2 className="section-title">Contact Information</h2>
                <div className="form-grid">
                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="officialMailId">
                      Official Mail ID <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="officialMailId"
                      name="officialMailId"
                      value={formData.officialMailId}
                      onChange={handleChange}
                      className={errors.officialMailId ? 'error' : ''}
                      placeholder="official.email@company.com"
                    />
                    {errors.officialMailId && (
                      <span className="error-message">{errors.officialMailId}</span>
                    )}
                  </div>
                  {/* Rent or Own */}
                  <div className="form-group">
                    <label htmlFor="rentOrOwnHouse">
                      Rent House / Own House <span className="required">*</span>
                    </label>
                    <select
                      id="rentOrOwnHouse"
                      name="rentOrOwnHouse"
                      value={formData.rentOrOwnHouse}
                      onChange={handleChange}
                      className={errors.rentOrOwnHouse ? 'error' : ''}
                    >
                      <option value="">Select option</option>
                      <option value="Own">Own House</option>
                      <option value="Rent">Rent House</option>
                    </select>
                    {errors.rentOrOwnHouse && (
                      <span className="error-message">{errors.rentOrOwnHouse}</span>
                    )}
                  </div>
                  {/* Present Address */}
                  <div className="form-group full-width">
                    <label htmlFor="presentAddress">
                      Present Address <span className="required">*</span>
                    </label>
                    <textarea
                      id="presentAddress"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className={errors.presentAddress ? 'error' : ''}
                      placeholder="Enter complete present address"
                      rows={3}
                    />
                    {errors.presentAddress && (
                      <span className="error-message">{errors.presentAddress}</span>
                    )}
                  </div>
                  {/* Landmark */}
                  <div className="form-group">
                    <label htmlFor="presentAddressLandmark">
                      Present Address Landmark <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="presentAddressLandmark"
                      name="presentAddressLandmark"
                      value={formData.presentAddressLandmark}
                      onChange={handleChange}
                      className={errors.presentAddressLandmark ? 'error' : ''}
                      placeholder="Nearby landmark"
                    />
                    {errors.presentAddressLandmark && (
                      <span className="error-message">{errors.presentAddressLandmark}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="presentContactNumber">
                      Present Contact Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="presentContactNumber"
                      name="presentContactNumber"
                      maxLength={10}
                      value={formData.presentContactNumber}
                      onChange={handleChange}
                      className={errors.presentContactNumber ? 'error' : ''}
                      placeholder="10 digit number"
                    />
                    {errors.presentContactNumber && (
                      <span className="error-message">{errors.presentContactNumber}</span>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="form-group">
                    <label htmlFor="presentAddressStayDuration">
                      Present Address Stay Duration <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="presentAddressStayDuration"
                      name="presentAddressStayDuration"
                      value={formData.presentAddressStayDuration}
                      onChange={handleChange}
                      className={errors.presentAddressStayDuration ? 'error' : ''}
                      placeholder="e.g., 2 years"
                    />
                    {errors.presentAddressStayDuration && (
                      <span className="error-message">{errors.presentAddressStayDuration}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="permanentAddress">
                      Permanent Address <span className="required">*</span>
                    </label>
                    <textarea
                      id="permanentAddress"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className={errors.permanentAddress ? 'error' : ''}
                      placeholder="Enter complete permanent address"
                      rows={3}
                    />
                    {errors.permanentAddress && (
                      <span className="error-message">{errors.permanentAddress}</span>
                    )}
                  </div>
                </div>
          </div>
        )}

        {/* ---------------------------------------------------
           SECTION 2 — Employment & Financial
        --------------------------------------------------- */}

        {currentSection === 2 && (
          <div className="form-section">
                <h2 className="section-title">Employment & Financial Information</h2>
                <div className="form-grid">
                  {/* Designation */}
                  <div className="form-group">
                    <label htmlFor="designation">
                      Designation <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className={errors.designation ? 'error' : ''}
                      placeholder="Your job title"
                    />
                    {errors.designation && (
                      <span className="error-message">{errors.designation}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="companyNameAsPerPaySlip">
                      Company Name As Per Pay Slip <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="companyNameAsPerPaySlip"
                      name="companyNameAsPerPaySlip"
                      value={formData.companyNameAsPerPaySlip}
                      onChange={handleChange}
                      className={errors.companyNameAsPerPaySlip ? 'error' : ''}
                      placeholder="Company name as per payslip"
                    />
                    {errors.companyNameAsPerPaySlip && (
                      <span className="error-message">{errors.companyNameAsPerPaySlip}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="officeAddress">
                      Office Address <span className="required">*</span>
                    </label>
                    <textarea
                      id="officeAddress"
                      name="officeAddress"
                      value={formData.officeAddress}
                      onChange={handleChange}
                      className={errors.officeAddress ? 'error' : ''}
                      placeholder="Enter complete office address"
                      rows={3}
                    />
                    {errors.officeAddress && (
                      <span className="error-message">{errors.officeAddress}</span>
                    )}
                  </div>

                  {/* Office Landmark */}
                  <div className="form-group">
                    <label htmlFor="officeAddressLandmark">
                      Office Address Landmark <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="officeAddressLandmark"
                      name="officeAddressLandmark"
                      value={formData.officeAddressLandmark}
                      onChange={handleChange}
                      className={errors.officeAddressLandmark ? 'error' : ''}
                      placeholder="Office nearby landmark"
                    />
                    {errors.officeAddressLandmark && (
                      <span className="error-message">{errors.officeAddressLandmark}</span>
                    )}
                  </div>

                  {/* Office Contact */}
                  <div className="form-group">
                    <label htmlFor="officeContactNumber">
                      Office Contact Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="officeContactNumber"
                      name="officeContactNumber"
                      maxLength={10}
                      value={formData.officeContactNumber}
                      onChange={handleChange}
                      className={errors.officeContactNumber ? 'error' : ''}
                      placeholder="10 digit office number"
                    />
                    {errors.officeContactNumber && (
                      <span className="error-message">{errors.officeContactNumber}</span>
                    )}
                  </div>

                  {/* Total Experience */}
                  <div className="form-group">
                    <label htmlFor="totalWorkExperience">
                      Total Work Experience <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="totalWorkExperience"
                      name="totalWorkExperience"
                      inputMode="decimal"
                      value={formData.totalWorkExperience}
                      onChange={handleChange}
                      className={errors.totalWorkExperience ? 'error' : ''}
                      placeholder="e.g., 5 or 5.5"
                    />
                    {errors.totalWorkExperience && (
                      <span className="error-message">{errors.totalWorkExperience}</span>
                    )}
                  </div>

                  {/* Present Experience */}
                  <div className="form-group">
                    <label htmlFor="presentCompanyWorkExperience">
                      Present Company Work Experience <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="presentCompanyWorkExperience"
                      name="presentCompanyWorkExperience"
                      inputMode="decimal"
                      value={formData.presentCompanyWorkExperience}
                      onChange={handleChange}
                      className={errors.presentCompanyWorkExperience ? 'error' : ''}
                      placeholder="e.g., 2 or 2.5"
                    />
                    {errors.presentCompanyWorkExperience && (
                      <span className="error-message">{errors.presentCompanyWorkExperience}</span>
                    )}
                  </div>

                  {/* Salary Account */}
                  <div className="form-group">
                    <label htmlFor="salaryAccount">
                      Salary Account <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="salaryAccount"
                      name="salaryAccount"
                      inputMode="numeric"
                      value={formData.salaryAccount}
                      onChange={handleChange}
                      className={errors.salaryAccount ? 'error' : ''}
                      placeholder="9–18 digit number"
                    />
                    {errors.salaryAccount && (
                      <span className="error-message">{errors.salaryAccount}</span>
                    )}
                  </div>

                  {/* Bank Name */}
                  <div className="form-group">
                    <label htmlFor="bankName">
                      Bank Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="bankName"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className={errors.bankName ? 'error' : ''}
                      placeholder="Your bank name"
                    />
                    {errors.bankName && <span className="error-message">{errors.bankName}</span>}
                  </div>

                  {/* Existing Loans */}
                  <div className="form-group full-width">
                    <label htmlFor="existingLoanDetails">Existing Loan Details</label>
                    <textarea
                      id="existingLoanDetails"
                      name="existingLoanDetails"
                      value={formData.existingLoanDetails}
                      onChange={handleChange}
                      placeholder="Provide details (optional)"
                      rows={4}
                    />
                  </div>


                </div>
          </div>
        )}

        {/* ---------------------------------------------------
           SECTION 3 — Document & References
        --------------------------------------------------- */}
        {currentSection === 3 && (
          <div className="form-section">
                <h2 className="section-title">Document & Reference Details</h2>
                <div className="form-grid">
                  {/* Reference Relative 1 */}
                  <div className="form-group">
                    <label htmlFor="referenceRelative1">
                      Reference Relative 1 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="referenceRelative1"
                      name="referenceRelative1"
                      value={formData.referenceRelative1}
                      onChange={handleChange}
                      className={errors.referenceRelative1 ? 'error' : ''}
                      placeholder="Name & contact details"
                    />
                    {errors.referenceRelative1 && (
                      <span className="error-message">{errors.referenceRelative1}</span>
                    )}
                  </div>

                  {/* Reference Relative 2 */}
                  <div className="form-group">
                    <label htmlFor="referenceRelative2">
                      Reference Relative 2 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="referenceRelative2"
                      name="referenceRelative2"
                      value={formData.referenceRelative2}
                      onChange={handleChange}
                      className={errors.referenceRelative2 ? 'error' : ''}
                      placeholder="Name & contact details"
                    />
                    {errors.referenceRelative2 && (
                      <span className="error-message">{errors.referenceRelative2}</span>
                    )}
                  </div>

                  {/* Documents Email */}
                  <div className="form-group">
                    <label htmlFor="documentsMail">
                      Documents Mail <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="documentsMail"
                      name="documentsMail"
                      value={formData.documentsMail}
                      onChange={handleChange}
                      className={errors.documentsMail ? 'error' : ''}
                      placeholder="Email"
                    />
                    {errors.documentsMail && (
                      <span className="error-message">{errors.documentsMail}</span>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="form-group">
                    <label htmlFor="documentsWhatsapp">
                      Documents WhatsApp <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="documentsWhatsapp"
                      name="documentsWhatsapp"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.documentsWhatsapp}
                      onChange={handleChange}
                      className={errors.documentsWhatsapp ? 'error' : ''}
                      placeholder="10 digit number"
                    />
                    {errors.documentsWhatsapp && (
                      <span className="error-message">{errors.documentsWhatsapp}</span>
                    )}
                  </div>

                  {/* Caller Name */}
                  <div className="form-group">
                    <label htmlFor="callerName">Caller Name (Optional)</label>
                    <input
                      type="text"
                      id="callerName"
                      name="callerName"
                      value={formData.callerName}
                      onChange={handleChange}
                      placeholder="Name of reference"
                    />
                  </div>

                  <div className="document-note">
                    <p>
                      <strong>Note:</strong> Ensure your documents are ready. You will receive
                      instructions via email or WhatsApp.
                    </p>
                  </div>
                </div>
              </div>
            )}

        {/* ---------------------------------------------------
           BUTTONS
        --------------------------------------------------- */}
        <div className="form-navigation">
              {currentSection > 0 && (
                <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                  Previous
                </button>
              )}

              {currentSection < sections.length - 1 && (
                <button type="button" onClick={handleNext} className="btn btn-primary">
                  Next
                </button>
              )}

              {currentSection === sections.length - 1 && (
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
