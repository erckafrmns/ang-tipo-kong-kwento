import React, { useState } from 'react';
import './ResetPassword.css';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
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
    }
  };

  return (
    <>
      <div className="resetPassword">
        <div className="rp-container">

          <form onSubmit={handleResetPassword}>
            <h1>Reset Password</h1>
            <p>Enter your new password below.</p>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
            <input type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required/>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
