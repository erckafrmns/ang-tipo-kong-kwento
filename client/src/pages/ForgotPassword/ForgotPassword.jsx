import React, { useState } from 'react';
import axios from 'axios';  
import './ForgotPassword.css';
import { ImCross } from "react-icons/im";

const ForgotPassword = ({ closeModal, toggleModal }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(''); 
    setIsLoading(true); 

    try {
        const response = await axios.post('http://localhost:5000/forgot-password', {
            email,
        });

        setMessage(response.data.message);
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
        } else {
            setError('An unexpected error occurred. Please try again later.');
        }
        console.error(err);
    } finally {
        setIsLoading(false); 
    }
};


  return (
    <div className="forgot-password-overlay">
      <div className="forgot-password-modal">
        <button onClick={closeModal} className="close-icon"> <ImCross /> </button>
        <div className="fp-inputs">
          <h1>Forgot Password</h1>  
          {message && <p className="fp-success-message">{message}</p>}
          {error && <p className="fp-error-message">{error}</p>}
          <p>Enter your email address to get instructions to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="email-input"/>
            <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <div className="fp-button-spinner"></div>
              ) : (
                'Submit'
              )}
            </button>

            <button type="button" onClick={() => toggleModal('login')} className="back-to-login-btn">
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
