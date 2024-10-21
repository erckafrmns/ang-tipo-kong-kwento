import React, { useState } from 'react';
import logo2 from '../../assets/logo-2.svg';
import grainy1 from '../../assets/grainy-1.svg';
import grainy2 from '../../assets/grainy-2.svg';
import manSitting from '../../assets/man-sitting.svg';
import ladyReading from '../../assets/lady-reading.svg';
import logo from '../../assets/logo-1.svg';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import './LoginSignup.css'

const LoginSignup = () => {

  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <>
        <div className='loginSignup'>

        <Link to="/" className='loginSignup-logoIMG'>
          <img src={isLogin ? logo2 : logo} alt="" />
        </Link>
        <img className="loginSignup-grainy" src={isLogin ? grainy1 : grainy2} alt="" />
        <div className={`loginSignup-container ${isLogin ? 'login-bg' : 'signup-bg'}`}>
          
          <div className={`form-container ${isLogin ? 'login-active' : 'signup-active'}`}>

            <div className="form-side left-side">
              {isLogin ? (
                <div className="form-content login-form">
                  <h2>Login your account</h2>
                  <input type="text" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <a href="/#" className='forgotPassBtn'>Forgot password?</a>
                  <div className='loginSignup-buttons'>
                    <button className="form-btn">Login</button>
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
                  <Link to="/" className='loginSignUp-exIcon'><ImCross/></Link>
                  <h2>Create your account</h2>
                  <div className='form-fullname'>
                    <input type="text" placeholder="first name" />
                    <input type="text" placeholder="last name" />
                  </div>
                  <input type="email" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <div className='loginSignup-buttons'>
                    <button className="form-btn">Sign Up</button>
                    <button className='guest-btn'>Continue as guest</button>
                  </div>
                </div>
              ) : (
                <div className="side-content">
                  <Link to="/" className='loginSignUp-exIcon'><ImCross/></Link>
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