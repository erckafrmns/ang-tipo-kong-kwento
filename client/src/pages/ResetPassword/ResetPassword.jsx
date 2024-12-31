import React, { useState } from 'react';
import './ResetPassword.css'; 
import Navbar from '../../components/Navbar/Navbar'; 
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(''); 
    setIsLoading(true);

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.'); 
      setIsLoading(false); 
      return; 
      
    }

    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword, confirm_new_password: confirmNewPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); 
        setTimeout(() => navigate('/'), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <>
      <Navbar hideInsideNavbar={true} />
      <div className="reset-password-overlay">
        <div className="reset-password-modal">
          <div className="rp-inputs">
            <h1>Reset Password</h1>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="reset-error-message">{error}</p>}
            <p>Enter your new password below.</p> 
            <div className="password-input-container">
            <form onSubmit={handleResetPassword}>
              <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="password-input"/>
              <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required className="password-input"/>
              
              <button type="submit" className={`reset-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
              {isLoading ? (
                <div className="reset-button-spinner"></div>
              ) : (
                'Reset Password'
              )}
            </button>
            </form> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
