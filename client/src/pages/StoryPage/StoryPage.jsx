import React from 'react';
import { useLocation } from 'react-router-dom';
import './StoryPage.css'

const StoryPage = () => {
    const location = useLocation();  
    const { story } = location.state || { story: '' };  

    return (
        <div className="story-page">
            <h1>Generated Story</h1>
            <p>{story}</p>
        </div>
    );
};

export default StoryPage;
