import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Sidebar/Sidebar.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';

import { TbLayoutSidebarInactive } from "react-icons/tb";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
 
const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [stories, setStories] = useState([]);
    const authToken = localStorage.getItem('authToken');
    const [selectedStoryId, setSelectedStoryId] = useState(null); // Track the selected story ID
    const [dropdownStates, setDropdownStates] = useState({}); // Track dropdown open/close for each story
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

            // Sort stories from latest to oldest 
            const sortedStories = fetchedStories.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            );

            setStories(sortedStories);
        }
    }; 

    // const categorizeStories = () => {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

    //     const categorized = {
    //         today: [],
    //         previous7Days: [],
    //         previous30Days: [],
    //         older: [],
    //     };

    //     stories.forEach(story => {
    //         const storyDate = new Date(story.timestamp);
    //         storyDate.setHours(0, 0, 0, 0); // Reset time to midnight for the story date

    //         if (isNaN(storyDate)) {
    //             console.error('Invalid timestamp for story:', story.title);
    //             return;
    //         }

    //         const diffInDays = Math.floor((today - storyDate) / (1000 * 60 * 60 * 24));

    //         if (diffInDays === 0) {
    //             categorized.today.push(story);
    //         } else if (diffInDays > 0 && diffInDays <= 7) {
    //             categorized.previous7Days.push(story);
    //         } else if (diffInDays > 7 && diffInDays <= 30) {
    //             categorized.previous30Days.push(story);
    //         } else {
    //             categorized.older.push(story);
    //         }
    //     });

    //     return categorized;
    // };

    // const categorizedStories = categorizeStories();
    

    // Fetch stories on component mount or authToken change
    useEffect(() => {
        fetchStories();
    }, [authToken]);  

    // useEffect(() => {
    //     if (stories.length > 0) {
    //         const categorized = categorizeStories();  
    //         // Do something with categorized stories if needed (like setting the state)
    //     }
    // }, [stories]);

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
        setSelectedStoryId(story.story_id);

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

    // Toggle dropdown visibility for a specific story
    const toggleDropdown = (e, story_id) => {
        e.stopPropagation();
        setDropdownStates((prevState) => ({
            ...prevState,
            [story_id]: !prevState[story_id],
        }));
    };

    const handleDeleteStory = (e, story_id) => {
        e.stopPropagation(); 

        if (authToken) { // IF AUTHENTICATED USER
            axios
                .delete(`http://localhost:5000/delete-story/${story_id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    // Update the UI
                    setStories((prevStories) =>
                        prevStories.filter((story) => story.story_id !== story_id)
                    );
                })
                .catch((error) => {
                    console.error('Error deleting story:', error);
                });
        } else { //IF GUEST USER
            const keyToDelete = Object.keys(sessionStorage).find((key) => {
                const story = JSON.parse(sessionStorage.getItem(key));
                return story && story.story_id === story_id;
            });

            if (keyToDelete) {
                sessionStorage.removeItem(keyToDelete);
                // Update the UI
                setStories((prevStories) =>
                    prevStories.filter((story) => story.story_id !== story_id)
                );
                console.log('Guest story deleted from sessionStorage.');
            } else {
                console.log('Story not found in sessionStorage.');
            }
        }
    }; 

    useEffect(() => {
        const handleScroll = () => {
            const sidebar = document.querySelector('.sidebar');
            const buttonContainer = document.querySelector('.button-container');
            const scrollPosition = window.scrollY;
            const scrollableContent = document.querySelector('.scrollable-content'); 
    
            const initialHeight = '89%';
            const expandedHeight = '96%';
            const fixedMarginTop = -40;
    
            if (sidebar) {
                if (scrollPosition >= 100) {
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = `${fixedMarginTop}px`;
                    sidebar.style.height = expandedHeight;
                } else {
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = '0';
                    sidebar.style.height = initialHeight;
                }
            }
    
            if (buttonContainer) {
                if (scrollPosition >= 100) {
                    buttonContainer.style.position = 'fixed';
                    buttonContainer.style.top = `${fixedMarginTop}px`;
                } else {
                    buttonContainer.style.position = 'fixed';
                    buttonContainer.style.top = '0';
                }
            }
    
            if (scrollableContent) {
                if (scrollPosition >= 100) {
                    scrollableContent.style.maxHeight = '80vh'; 
                } else {
                    scrollableContent.style.maxHeight = '73vh'; 
                }
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);    

    // const tempstories = [
    //     {
    //         story_id: 1,
    //         title: "Story A",
    //         genre: "Adventure",
    //         story: "An exciting adventure.",
    //         timestamp: new Date().toISOString(), // Today
    //     },
    //     {
    //         story_id: 2,
    //         title: "Story B",
    //         genre: "Fantasy",
    //         story: "A magical journey.",
    //         timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    //     },
    //     {
    //         story_id: 3,
    //         title: "Story C",
    //         genre: "Horror",
    //         story: "A chilling tale.",
    //         timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    //     },
    //     {
    //         story_id: 4,
    //         title: "Story D",
    //         genre: "Sci-Fi",
    //         story: "A futuristic escapade.",
    //         timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    //     },
    //     {
    //         story_id: 5,
    //         title: "Story E",
    //         genre: "Mystery",
    //         story: "A detective's case.",
    //         timestamp: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000).toISOString(), // 31 days ago
    //     }, 
    //     {
    //         story_id: 6,
    //         title: "Story FFFFFFFFFF",
    //         genre: "Horror",
    //         story: "A chilling tale.",
    //         timestamp: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    //     },  
    //     {
    //         story_id: 7,
    //         title: "Story AAAAAAAAAAAAAAAAAAAA",
    //         genre: "Horror",
    //         story: "A chilling tale.",
    //         timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    //     }, 
    // ]; 

    const convertToLocalTime = (utcDateString) => {
        const date = new Date(utcDateString);
        return date; // This gives you the date in the local timezone
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

                        <div className="scrollable-content">
                        {/* New Story Button */}
                        <div className="new-chat-container">
                            <img src={logo} className="logo_small" alt="Logo" />
                            <button className="new-chat-btn" onClick={handleNewStoryClick}>New Story</button>
                            <MdOutlineHistoryEdu className="new-chat-icon" />
                        </div>

                        {/* Story List*/}
                        <div className="story-list-container">
                            {stories.length > 0 ? (
                                stories.map((story, index) => (
                                    <div
                                        key={index}
                                        className={`story-container ${selectedStoryId === story.story_id ? 'active' : ''}`}
                                        onClick={() => handleStoryClick(story.story_id, story.title, story.genre, story.story)}
                                    >
                                        <span className="story-title">{story.title}</span>
                                        <PiDotsThreeOutlineDuotone
                                            className="menu-icon"
                                            onClick={(e) => toggleDropdown(e, story.story_id)}
                                        />

                                        {dropdownStates[story.story_id] && (
                                            <div className="dropdown-menu">
                                                <button className="dropdown-item" onClick={(e) => handleDeleteStory(e, story.story_id)}>
                                                    <RiDeleteBin6Line className="delete-icon" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="empty-message">No stories available. Click "New Story" to create one!</p>
                            )}
                        </div>
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
    
    
//     return (
//         <>
//             {/* Sidebar Component */}
//             <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//                 {/* Sidebar Content */}
//                 <div className="sidebar-content">
//                     <div className="close-btn-container">
//                         <span className="sidebar-title">Ang Tipo Kong Kwento</span>
//                         <button className="close-btn" onClick={toggleSidebar}>
//                             <TbLayoutSidebarInactive />
//                         </button>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="search-container">
//                         <input
//                             type="text"
//                             placeholder="Search Title"
//                             className="search-bar"
//                         />
//                         <IoSearch className="search-icon" />
//                     </div>
 
//                     <div className="scrollable-content">
//                         {/* New Story Button */}
//                         <div className="new-chat-container">
//                             <img src={logo} className="logo_small" alt="Logo" />
//                             <button className="new-chat-btn" onClick={handleNewStoryClick}>New Story</button>
//                             <MdOutlineHistoryEdu className="new-chat-icon" />
//                         </div>

//                         <div className="story-list-container">
//                         {stories.length > 0 ? (
//                                 stories
//                                     .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort stories by date (newest first)
//                                     .map((story, index) => {
//                                         const today = new Date(); // Local time
//                                         const storyDate = convertToLocalTime(story.timestamp); // Convert to local time
                                        
//                                         // Calculate difference in days
//                                         const diffInTime = today - storyDate;
//                                         const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

//                                         // Determine category
//                                         const isToday = diffInDays === 0; // Same day
//                                         const isPrevious7Days = diffInDays >= 1 && diffInDays <= 7; // 1 to 7 days ago
//                                         const isPrevious30Days = diffInDays > 7 && diffInDays <= 30; // 8 to 30 days ago
//                                         const isOlder = diffInDays > 30; // Older than 30 days

//                                         // Determine the category for this story
//                                         const category = isToday
//                                             ? 'Today'
//                                             : isPrevious7Days
//                                             ? 'Previous 7 Days'
//                                             : isPrevious30Days
//                                             ? 'Previous 30 Days'
//                                             : 'Older';

//                                         // Track the last category shown to avoid duplication
//                                         const isFirstInGroup =
//                                             index === 0 || // First story overall
//                                             category !==
//                                                 (stories[index - 1] && // Compare category with previous story's category
//                                                     (() => {
//                                                         const prevStoryDate = convertToLocalTime(stories[index - 1].timestamp); // Convert to local time
//                                                         const prevDiffInTime = today - prevStoryDate;
//                                                         const prevDiffInDays = Math.floor(prevDiffInTime / (1000 * 60 * 60 * 24));

//                                                         const prevIsToday = prevDiffInDays === 0;
//                                                         const prevIsPrevious7Days = prevDiffInDays >= 1 && prevDiffInDays <= 7;
//                                                         const prevIsPrevious30Days = prevDiffInDays > 7 && prevDiffInDays <= 30;
//                                                         const prevIsOlder = prevDiffInDays > 30;

//                                                         return prevIsToday
//                                                             ? 'Today'
//                                                             : prevIsPrevious7Days
//                                                             ? 'Previous 7 Days'
//                                                             : prevIsPrevious30Days
//                                                             ? 'Previous 30 Days'
//                                                             : 'Older';
//                                                     })());

//                                         return (
//                                             <React.Fragment key={index}>
//                                                 {/* Add the group header if it's the first story in the group */}
//                                                 {isFirstInGroup && (
//                                                     <div className="group-header">{category}</div>
//                                                 )}

//                                                 {/* Render the story */}
//                                                 <div
//                                                     className={`story-container ${
//                                                         selectedStoryId === story.story_id ? 'active' : ''
//                                                     }`}
//                                                     onClick={() =>
//                                                         handleStoryClick(
//                                                             story.story_id,
//                                                             story.title,
//                                                             story.genre,
//                                                             story.story
//                                                         )
//                                                     }
//                                                 >
//                                                     <span className="story-title">{story.title}</span>
//                                                     <PiDotsThreeOutlineDuotone
//                                                         className="menu-icon"
//                                                         onClick={(e) => toggleDropdown(e, story.story_id)}
//                                                     />
//                                                     {dropdownStates[story.story_id] && (
//                                                         <div className="dropdown-menu">
//                                                             <button
//                                                                 className="dropdown-item"
//                                                                 onClick={(e) => handleDeleteStory(e, story.story_id)}
//                                                             >
//                                                                 <RiDeleteBin6Line className="delete-icon" />
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </React.Fragment>
//                                         );
//                                     })
//                             ) : (
//                                 <p className="empty-message">No stories available. Click "New Story" to create one!</p>
//                             )}
//                         </div>

//                     </div>
//                 </div>
//             </div>

//             {/* Open Sidebar Button */}
//             <div className={`button-container ${isSidebarOpen ? 'hidden' : ''}`}>
//                 <div className="open-btn-container">
//                     <button
//                         className={`open-btn ${isSidebarOpen ? 'hidden' : ''}`}
//                         onClick={toggleSidebar}
//                     >
//                         <TbLayoutSidebarInactive />
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Sidebar;

