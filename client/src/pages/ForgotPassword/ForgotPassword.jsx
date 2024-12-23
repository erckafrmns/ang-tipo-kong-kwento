import React, {useState} from 'react'
import './ForgotPassword.css'
import { ImCross } from "react-icons/im";


const ForgotPassword = ({closeModal, toggleModal}) => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),

      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); 
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
        <div className="forgotPassword">
            <div className="fp-container">
                <div className="fp-content">
                    <div className="fp-exBTN">
                        <button onClick={closeModal} className='fp-exIcon'><ImCross/></button>
                    </div>
                    {/* <img src={forgotpass} alt="" /> */}
                    <form onSubmit={handleSubmit}>
                      <h1>Forgot password</h1>
                      {message && <p className="success-message">{message}</p>}
                      {error && <p className="error-message">{error}</p>}
                      <p>Enter your email address to get instructions to reset your password.</p>
                      <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                      <button type="submit">Submit</button>
                    </form>
                    <button onClick={() => toggleModal('login')}>Back to Login</button>
                </div>
                
            </div>
                

        </div>
    </>
  )
}

export default ForgotPassword