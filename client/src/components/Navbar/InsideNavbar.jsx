import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';
import insidebanner from '../../assets/banner.svg';  
import modalLine from '../../assets/modal-line.svg'; 
import '../Sidebar/Sidebar.css';
import Sidebar from '../Sidebar/Sidebar';

const InsideNavbar = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); 
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location

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

    const getLinkClass = (path) => {
        // If the current location matches the link path, apply the 'active' class
        return location.pathname === path ? 'nav-left active' : 'nav-left';
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
                            <Link to="/main" className={getLinkClass('/main')}>Home</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" className={getLinkClass('/contact-us')}>Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/account" className={getLinkClass('/account')}>Account</Link>
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
