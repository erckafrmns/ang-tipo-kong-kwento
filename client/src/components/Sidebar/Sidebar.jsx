import React, { useState } from 'react'
import '../Sidebar/Sidebar.css';
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md"; 
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const authToken = localStorage.getItem('authToken'); 
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOutsideNewClick = () => {
        if (!authToken) {
            navigate('/main', { state: { isGuest: true } });
        } else {
            navigate('/main');
        }
    };

    const handleNewStoryClick = () => {
        if (!authToken) {
            navigate('/main', { state: { isGuest: true } });
        } else {
            navigate('/main');
        }
    };

  return (
    <>
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
                    <button className="new-chat-btn" onClick={handleNewStoryClick}>New Story</button> 
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
  )
}

export default Sidebar