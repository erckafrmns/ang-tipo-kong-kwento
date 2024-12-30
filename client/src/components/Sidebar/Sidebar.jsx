import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../Sidebar/Sidebar.css';
import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md"; 
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [stories, setStories] = useState([]);
    const authToken = localStorage.getItem('authToken'); 
    const navigate = useNavigate();


    // Fetch the stories 
    useEffect(() => {
        if (authToken) {
            axios.get('http://localhost:5000/retrieve-user-stories', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            })
            .then(response => {
                setStories(response.data);  
            })
            .catch(error => {
                console.error('Error fetching stories:', error);
            });

        } else {
            const temporaryStory = sessionStorage.getItem('temporary_stories');
            if (temporaryStory) {
                console.log(temporaryStory);
                setStories([JSON.parse(temporaryStory)]); 
            }
        }
    }, [authToken]);


    // Handle story click to go to story page
    const handleStoryClick = (story_id) => {
        navigate(`/story/${story_id}`);
    };
    
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

                <div className="story-list-container">
                    {stories.length > 0 ? (
                        stories.map((story, index) => (
                            <div 
                                key={index} 
                                className="story-container" 
                                onClick={() => handleStoryClick(story.story_id)}
                            >
                                <span className="story-title">{story.title}</span>
                            </div>
                        ))
                    ) : (
                        <p>No stories available</p>
                    )}
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