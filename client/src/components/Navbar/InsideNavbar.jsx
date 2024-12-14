import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md";
import logo from '../../assets/logo.png';
import grainy from '../../assets/grainy-bg.svg';
import insidebanner from '../../assets/banner.svg';
import '../Sidebar/Sidebar.css';

const InsideNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(null); // Sidebar will default to CSS width
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOutsideNewClick = () => {
        navigate('/main');
    };

    // Resizing logic
    const handleMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const newWidth = e.clientX - 10; // Calculate width based on sidebar position
        const defaultWidth = 250; // Default CSS width
        if (newWidth > defaultWidth && newWidth < 500) { // Min and max width
            setSidebarWidth(newWidth);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
            <div
                className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
                style={{ width: sidebarWidth ? `${sidebarWidth}px` : 'auto' }} // Use inline width only if resized
            >
                {isSidebarOpen && <img src={grainy} className="grainy-bg-sidebar" alt="Background" />}

                {/* Sidebar Content */}
                <div className="sidebar-content">
                    <div className="top-buttons-container">
                        <div className="close-btn-container">
                            <button className="close-btn" onClick={toggleSidebar}>
                                <TbLayoutSidebarInactive />
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search title" 
                                className="search-bar"
                            /> 
                        </div>

                        {/* New Story Button */}
                        <div className="new-btn-container">
                            <button className="new-btn" onClick={handleOutsideNewClick}>
                                <MdOutlineHistoryEdu />
                            </button>
                        </div>
                    </div>

                    {/* New Chat Button */}
                    <div className="new-chat-container">  
                        <img src={logo} className="logo_small" alt="Logo" />
                        <button className="new-chat-btn">New chat</button>
                    </div>
                </div>
                <div className="resizer" onMouseDown={handleMouseDown}></div>
            </div>

            {/* Button Container for Open, Outside New, and Logout Buttons */}
            <div className={`button-container ${isSidebarOpen ? 'hidden' : ''}`}>
                <div className="open-btn-container">
                    <button
                        className={`open-btn ${isSidebarOpen ? 'hidden' : ''}`}
                        onClick={toggleSidebar}
                    >
                        <TbLayoutSidebarInactive />
                    </button>
                </div>

                <span className="between-text">Ang Ibong Adarna</span>

                <div className="outside-btn-container">
                    <button className="outside-new-btn" onClick={handleOutsideNewClick}>
                        <MdOutlineHistoryEdu />
                    </button>
                </div>
            </div> 

            {/* Logout Button 
            <div className="logout-btn-container">
                <button className="logout-btn" onClick={handleLogout}>
                    <RiLogoutBoxRLine /> Logout
                </button>
            </div>*/}
        </>
    );
};

export default InsideNavbar;
