import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import emailImage from '../../assets/email.svg'; // Import the email image 
import Navbar from '../../components/Navbar/Navbar'; 
import './VerifyEmail.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve email from the state passed during navigation
  const email = location.state?.email || 'your email'; // Fallback if no email is provided

  const handleGoToLogin = () => {
    // Navigate to "/" and pass state to open the login modal
    navigate('/', { state: { openModal: 'login' } });
  };

  return (  
    <> 
      <Navbar hideInsideNavbar={true} />
      <div className="verify-email">
        <div className="verify-email-container">
          {/* Add the email image */}
          <img src={emailImage} alt="Email Sent" className="email-image" />
          <h1>Verify your email</h1>
          <p>
            We have sent an email to <strong>{email}</strong> to verify your email 
            address and activate your account.
          </p>
          <button className="btn-go-to-login" onClick={handleGoToLogin}>Go to Login</button>
        </div>
      </div>  
    </>
  );
};

export default VerifyEmail;
