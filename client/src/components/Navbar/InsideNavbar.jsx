import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import insidebanner from '../../assets/banner.svg';  
import modalLine from '../../assets/modal-line.svg'; 
import '../Sidebar/Sidebar.css';
import Sidebar from '../Sidebar/Sidebar';

const InsideNavbar = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); 
    const navigate = useNavigate();

    const handleOutsideNewClick = () => {
        navigate('/main');
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear JWT token
        setShowLogoutConfirmation(false); 
        navigate('/'); 
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false); 
    };

    return (
        <>
            <img src={insidebanner} className="inside-banner" alt="Banner" />
            <div id='navbar'>   		
                <div className="logo">
                    <Link to="/main">
                        <img src={logo} className="logo-image" alt="Logo" />
                    </Link>
                </div>
                <div className="inside-navbar1">
                    <ul>
                        <li>
                            <Link to="/main" className="nav-left">Home</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className="nav-left nav-space">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/account" className="nav-right" >Account</Link>
                        </li>
                        <li>
                            <button 
                                onClick={() => setShowLogoutConfirmation(true)} 
                                className="nav-right"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div> 
            </div> 

            {/* Logout Confirmation Modal */}
            {showLogoutConfirmation && (
                <div className="modal-container">
                    <div className="modal-logout"> 
                        <h2>Logout</h2> 
                        <img src={modalLine} alt="Modal Line" className="modal-line" /> {/* Replaced div with an image */}
                        <p>Are you sure you want to log out?</p>
                        <div className="modal-buttons">
                            <button onClick={handleLogout} className="confirm-btn">Logout</button>
                            <button onClick={cancelLogout} className="cancel-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <Sidebar />
        </>
    );
};

export default InsideNavbar;
