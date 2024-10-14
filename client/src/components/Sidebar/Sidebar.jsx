import React from 'react';  
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md";  
import logo from '../../assets/logo.png';
import './Sidebar.css';  

const Sidebar = ({ isOpen, toggleSidebar }) => { 
    const navigate = useNavigate(); // Create a navigate function 
    const handleOutsideNewClick = () => {
        navigate('/main'); // Redirect to Main page
      };
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            {/* Grouped container for Close, Search, and New buttons */}
            <div className="top-buttons-container">
                {/* Close button */}
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

            {/* Newchat Button*/}
            <div className="new-chat-container">  
                <img src={logo} className="logo_small" alt="Logo" />
                <button className="new-chat-btn" >New chat</button>
            </div>
        </div>
    );
};

export default Sidebar;