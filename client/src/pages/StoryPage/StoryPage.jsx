import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StoryPage.css';

const StoryPage = () => {
    const location = useLocation();
    const { story = '', loading = false } = location.state || {};
    const [displayedStory, setDisplayedStory] = useState('');

    useEffect(() => {
        if (loading) return; // Skip if still loading

        const words = story.split(' '); // Split the story into words
        let currentIndex = 0;

        const displayWords = () => {
            if (currentIndex < words.length) {
                setDisplayedStory((prev) => prev + (currentIndex === 0 ? '' : ' ') + words[currentIndex]);
                currentIndex += 1;
            } else {
                clearInterval(intervalId); // Stop when all words are displayed
            }
        };

        const intervalId = setInterval(displayWords, 100); // Adjust the speed here (100ms)

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [story, loading]);

    return ( 

        // <div className="story-page">
        //     <h1>Generated Story</h1>
        //     <p>{displayedStory}</p>
        // </div> 

        <div className="story-page">
            {loading ? (
                <div className="preloader">
                    <h1>Loading your story...</h1>
                    <div className="spinner"></div> {/* Spinner for visual effect */}
                </div>
            ) : (
                <>
                    <h1>Generated Story</h1>
                    <p>{story}</p>
                </>
            )}
        </div>
    );
};

export default StoryPage;
