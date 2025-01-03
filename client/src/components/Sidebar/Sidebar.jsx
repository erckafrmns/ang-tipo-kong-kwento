import React, { useState, useEffect } from 'react';
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

    // Function to fetch stories
    const fetchStories = () => {
        if (authToken) {
            // Fetch user stories from server
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
            // Fetch guest stories from sessionStorage
            const fetchedStories = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                if (key && key.startsWith('guestStory_')) {
                    const story = sessionStorage.getItem(key);
                    if (story) {
                        fetchedStories.push(JSON.parse(story));
                    }
                }
            }
            setStories(fetchedStories);
        }
    };

    // Fetch stories on component mount or authToken change
    useEffect(() => {
        fetchStories();
    }, [authToken]);

    // Live updates for sessionStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            if (!authToken) {
                fetchStories();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [authToken]);

    // Handle story click for navigation
    const handleStoryClick = (story_id, title, genre, story) => {
        const authToken = localStorage.getItem('authToken');
        const isGuest = !authToken; // Determine guest status based on token

        navigate(`/story/${story_id}`, {
            state: { 
                story_id, 
                title, 
                genre, 
                story, 
                isGuest 
            },
        });
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Navigate to new story page
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
                        <span className="sidebar-title">Ang Tipo Kong Kwento</span>
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

                    {/* New Story Button */}
                    <div className="new-chat-container">  
                        <img src={logo} className="logo_small" alt="Logo" />
                        <button className="new-chat-btn" onClick={handleNewStoryClick}>New Story</button> 
                        <MdOutlineHistoryEdu className="new-chat-icon" />
                    </div>

                    {/* Story List */}
                    <div className="story-list-container">
                        {stories.length > 0 ? (
                            stories.map((story, index) => (
                                <div 
                                    key={index} 
                                    className="story-container" 
                                    onClick={() => handleStoryClick(story.story_id, story.title, story.genre, story.story)}
                                >
                                    <span className="story-title">{story.title}</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-message">No stories available. Click "New Story" to create one!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Open Sidebar Button */}
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

export default Sidebar;
