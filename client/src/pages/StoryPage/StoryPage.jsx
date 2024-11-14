import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StoryPage.css';

const StoryPage = () => {
    const location = useLocation();
    const { story } = location.state || { story: '' };
    const [displayedStory, setDisplayedStory] = useState('');
    const words = story.split(' '); // Split the story into words

    useEffect(() => {
        let currentIndex = 0;

        // Function to display words one by one
        const displayWords = () => {
            if (currentIndex < words.length) {
                setDisplayedStory(prev => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
                currentIndex += 1;
            } else {
                clearInterval(intervalId); // Stop when all words are displayed
            }
        };

        const intervalId = setInterval(displayWords, 100); // Adjust the speed here (100ms)
        
        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [story]); // Dependency array includes story to restart effect on story change

    return (
        // <div className="story-page">
        //     <h1>Generated Story</h1>
        //     <p>{displayedStory}</p>
        // </div>

        <div className="story-page">
            <h1>Generated Story</h1>
            <p>{story}</p>
        </div>
    );
};

export default StoryPage;