import React, { useState, useEffect } from "react"; 
import '../Preloader/Preloader.css';  
import '../Preloader/Preloader-vv.css';  
import logo from '../../assets/logo.png'; // Update path to logo if necessary

const Preloader = ({ message }) => { 
    const [randomMessage, setRandomMessage] = useState("");

    const messages = [
        "Weaving the tale of your dreams...",
        "Crafting a magical adventure...",
        "Conjuring your story, one word at a time...",
        "Unraveling a world of imagination...",
        "Summoning characters from the unknown...",
        "Scribbling the magic of a new world...",
        "Breathing life into your story...",
        "Enchanting words to create your world..."
    ];

    useEffect(() => {
        // If no message prop is provided, pick a random message
        if (!message) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            setRandomMessage(randomMessage);
        }
    }, [message]);

    return (
        <div className="preloader">
            <h1>{message || randomMessage}</h1>
            <div className="spinner"></div>
        </div>
    );
};

const DefaultPreloader = () => {
    return (
        <div className="DefaultPreloader">
            <img src={logo} alt="Loading..." className="preloaderLogo" />
        </div>
    );
};

export { Preloader, DefaultPreloader };
