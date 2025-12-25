import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Forms from '../pages/Apply/Apply';
import ThankYou from '../pages/ThankYouPage/ThankYouPage';
import EMICalculator from '../pages/EMICalculator/EMICalculator';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Grievance from '../pages/Grievance/Grievance';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'forms',
        element: <Forms />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'emi-calculator',
        element: <EMICalculator />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'thank-you',
        element: <ThankYou />,
      },
      {
        path: 'terms-and-conditions',
        element: <TermsAndConditions />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPolicy />,
      },
            {
        path:'grievance',
        element: <Grievance />,
      },
    ],
  },
]);



