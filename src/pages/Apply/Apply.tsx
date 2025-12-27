// Forms.tsx
import React, { useState } from 'react';
import './Apply.css';
import InitialApplicationForm from '../../components/InitialForm/InitialApplicationForm';
import MultiStepForm from '../../components/MultiStepForm/MultiStepForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forms: React.FC = () => {
  const [showMainForm] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="forms-header">
        <h1>Loan Application Form</h1>
        <p>Please fill in all required fields to proceed.</p>
      </div>

      {!showMainForm && (
        <div className="loans-page">
          <InitialApplicationForm
            onSuccess={async (data) => {
              console.log('Success:', data);

              // 1. Convert form → backend format
              const payload = {
                customer: {
                  first_name: data.firstName,
                  middle_name: data.secondName,
                  last_name: data.lastName,
                  // pan_number: data.panNumber,
                  date_of_birth: data.dob ? new Date(data.dob) : null,
                  contact_number: data.contactNumber,
                  email_address: data.email,
                  new_take_home_salary: Number(data.netTakeHomeSalary),
                  consent: data.termsAccepted,

                  lead: {
                    loan_amount_required: Number(data.loanAmount),
                    loan_type: data.loanType
                  }
                }
              };

              console.log("Mapped Payload:", JSON.stringify(payload));


              try {
                // 2. API CALL HERE
                const response = await axios.post(
                  "https://j5rpiig7656zd54cyhn6lxhiuq0qictj.lambda-url.ap-south-1.on.aws/customer",
                  payload,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );

                console.log("API Success:", response.data);

                // 3. Show next form section
                // setShowMainForm(true);
                window.scrollTo({ top: 0, behavior: "smooth" });

              } catch (error: any) {
                console.error("API Error:", error);

                if (error.response) {
                  alert("Server Error: " + error.response.data?.message);
                } else {
                  alert("Network Error. Please try again.");
                }
              }

              // setShowMainForm(true);

              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
      {showMainForm && (
        <div>
          <MultiStepForm onSuccess={async (data) => {
            console.log("MultiStepForm submitted successfully:", data);
            alert("MultiStepForm submitted successfully:");
            navigate('/thank-you');
          }} />
        </div>
      )}
    </>
  );
};

export default Forms;
