import React, { useState, useEffect } from 'react';
import manSitting from '../../assets/man-sitting.svg';
import ladyReading from '../../assets/lady-reading.svg';
import { ImCross } from "react-icons/im";
import {useNavigate} from 'react-router-dom';
import './LoginSignup.css'

const LoginSignup = ({ closeModal, formType, toggleModal  }) => { 
  const [isLogin, setIsLogin] = useState(formType === 'login'); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    setIsLogin(formType === 'login');
  }, [formType]);

  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setErrorMessage(''); // Clear error message when switching forms
    // Clear inputs
    setLoginEmail(''); 
    setLoginPassword('');
    setErrorMessage('');
    setSignupEmail('');
    setSignupPassword('');
    setFirstName('');
    setLastName('');
    setErrorMessage('');
    setIsLoading(false);
  };


  const [login_email, setLoginEmail] = useState('');
  const [login_password, setLoginPassword] = useState('');
  const [signup_email, setSignupEmail] = useState('');
  const [signup_password, setSignupPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login_email, login_password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token); // Store JWT token
        setLoginEmail('');
        setLoginPassword('');
        setErrorMessage('');
        navigate('/main');
      } else {
        setErrorMessage(data.message || 'Incorrect username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Something went wrong, please try again later.');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, signup_email, signup_password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/verify-email', { state: { email: signup_email } });
        setSignupEmail('');
        setSignupPassword('');
        setFirstName('');
        setLastName('');
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Something went wrong, please try again later.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
        <div className="loginSignup">
          <div className="loginSignup-container">
            <div className={`form-container ${isLogin ? 'login-bg login-active' : 'signup-bg signup-active'}`}>

            <div className="form-side left-side">
              {isLogin ? (
                <div className="form-content login-form">
                  <h2>Login your account</h2> 
                  {errorMessage && <p className="error-message">{errorMessage}</p>} 
                  <input type="text" placeholder="email" value={login_email} onChange={(e) => setLoginEmail(e.target.value)}  />
                  <input type="password" placeholder="password" value={login_password} onChange={(e) => setLoginPassword(e.target.value)} />
                  <button className='forgotPassBtn' onClick={() => toggleModal('forgotpassword')}>Forgot password?</button>
                  <div className='loginSignup-buttons'>
                  <button className="form-btn" onClick={handleLogin} disabled={isLoading}>
                      {isLoading ?   
                      <div className="spinner-wrapper">
                        <div className="button-spinner"></div>   
                      </div>
                      : 'Login'}
                    </button>

                    <button className='guest-btn'>Continue as guest</button>
                  </div>
                </div>
              ) : (
                <div className="side-content">
                  <img src={ladyReading} className="side-image" alt="" />
                  <button className="side-btn side-loginbtn" onClick={toggleForm}>Login</button>
                </div>
              )}
            </div>

            <div className="form-side right-side">
              {!isLogin ? (
                <div className="form-content signup-form">
                  <button onClick={closeModal} className='loginSignUp-exIcon'><ImCross/></button>
                  <h2>Create your account</h2> 
                  {errorMessage && <p className="error-message">{errorMessage}</p>} 
                  <div className='form-fullname'>
                    <input type="text" placeholder="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}  required/>
                    <input type="text" placeholder="last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                  </div>
                  <input type="email" placeholder="email" value={signup_email} onChange={(e) => setSignupEmail(e.target.value)} required/>
                  <input type="password" placeholder="password" value={signup_password} onChange={(e) => setSignupPassword(e.target.value)} required/>
                  <div className='loginSignup-buttons'>
                  <button className="form-btn" onClick={handleSignup} disabled={isLoading}>
                      {isLoading ? ( <div className="spinner-wrapper">
                        <div className="button-spinner"></div>   
                      </div>) : ('Sign Up')}
                    </button>
                    <button className='guest-btn'>Continue as guest</button>
                  </div>
                </div>
              ) : (
                <div className="side-content">
                  <button onClick={closeModal} className='loginSignUp-exIcon'><ImCross/></button>
                  <img src={manSitting}  className="side-image" alt="" />
                  <button className="side-btn side-signbtn" onClick={toggleForm}>Sign up</button>
                </div>
              )}
            </div>

          </div>

        </div>

        </div>
        
    
    </>
  )
}

export default LoginSignup