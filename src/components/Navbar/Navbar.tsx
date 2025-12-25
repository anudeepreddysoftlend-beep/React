import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
          <div className="navbar-brand">
            <Link to="/">
              <span className="brand-title">SoftLend</span>
              <span className="brand-subtitle">Where Borrower Meets Lender.</span>
            </Link>
          </div>
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Loans
            </Link>
          </li>
          <li>
            <Link 
              to="/emi-calculator" 
              className={isActive('/emi-calculator') ? 'active' : ''}
            >
              EMI Calculator
            </Link>
          </li>
          <li>
            <Link 
              to="/forms" 
              className={isActive('/forms') ? 'active' : ''}
            >
              Apply
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

