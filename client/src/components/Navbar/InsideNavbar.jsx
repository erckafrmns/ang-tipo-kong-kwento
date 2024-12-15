import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md"; 
import { IoSearch } from "react-icons/io5";
import logo from '../../assets/logo.png';
import insidebanner from '../../assets/banner.svg';
import '../Sidebar/Sidebar.css';

const InsideNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOutsideNewClick = () => {
        navigate('/main');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Clear JWT token
        alert('Logged out successfully!');
        navigate('/'); 
    };
    
    

    return (
        <>
            <img src={insidebanner} className="inside-banner" alt="Banner" />
        <div id='navbar'>   		
            <div className="logo">
                <Link to="/">
                    <img src={logo} className="logo-image" alt="Logo" />
                </Link>
            </div>
            <div className="inside-navbar1">
                <ul>
                    <li>
                        <Link to="/main" className="nav-left">Home</Link>
                    </li>
                    <li>
                        <a href="" className="nav-left nav-space" >Settings</a>
                    </li>
                    <li>
                        <Link to="" className="nav-right">Contact Us</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="nav-right">Logout</button>
                    </li>
                </ul>
            </div> 
        </div> 

            {/* Sidebar Component */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                {/* Sidebar Content */}
                <div className="sidebar-content">
                    <div className="close-btn-container">
                        <span className="sidebar-title">Ang tipo kong Kwento</span>
                        <button className="close-btn" onClick={toggleSidebar}>
                            <TbLayoutSidebarInactive />
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Search Title" 
                            className="search-bar" 
                        />
                        <IoSearch className="search-icon" />
                    </div>

                    {/* New Chat Button */}
                    <div className="new-chat-container">  
                        <img src={logo} className="logo_small" alt="Logo" />
                        <button className="new-chat-btn">New Story</button> 
                        <MdOutlineHistoryEdu className="new-chat-icon" />
                    </div>
                </div>
            </div>

            {/* Button Container for Open and Outside New */}
            <div className={`button-container ${isSidebarOpen ? 'hidden' : ''}`}>
                <div className="open-btn-container">
                    <button
                        className={`open-btn ${isSidebarOpen ? 'hidden' : ''}`}
                        onClick={toggleSidebar}
                    >
                        <TbLayoutSidebarInactive />
                    </button>
                </div>

            </div> 
        </>
    );
};

export default InsideNavbar;
