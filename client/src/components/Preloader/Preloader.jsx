import React, { useState, useEffect } from "react"; 
import '../Preloader/Preloader.css';  
import '../Preloader/Preloader-vv.css';  
import logo from '../../assets/logo.png'; // Update path to logo if necessary

const Preloader = ({ message }) => { 
    const [randomMessage, setRandomMessage] = useState(""); 
    const [fadeClass, setFadeClass] = useState("fade-in");


    const messages = [
        "Weaving the tale of your dreams",
        "Crafting a magical adventure",
        "Conjuring your story, one word at a time",
        "Unraveling a world of imagination",
        "Summoning characters from the unknown",
        "Scribbling the magic of a new world",
        "Breathing life into your story",
        "Enchanting words to create your world",
        "Whisking you away to a land of dreams",
        "Spinning the threads of your imagination",
        "Piecing together your story, one sentence at a time",
        "Weaving magic into every line",
        "Transforming ideas into enchanting tales",
        "Bringing your imagination to life",
        "Sketching the blueprint of your fantasy",
        "Sculpting worlds from the fabric of creativity",
        "Guiding you through the labyrinth of storytelling",
        "Writing the first chapter of your adventure",
        "Drawing inspiration from your inner muse",
        "Brewing a potion of captivating words",
        "Crafting stories as unique as you",
        "Unveiling your epic masterpiece",
        "Casting literary spells to create magic",
        "Painting vivid dreams with words",
        "Turning your ideas into timeless stories",
        "Exploring uncharted territories of imagination",
        "Building bridges to worlds unknown",
        "Diving into the sea of endless creativity"
    ];

    useEffect(() => {
        if (!message) {
            // Set the initial message
            setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);

            const interval = setInterval(() => {
                setFadeClass("fade-out");

                setTimeout(() => {
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    setRandomMessage(randomMessage);

                    // Switch back to fade-in class
                    setFadeClass("fade-in");
                }, 1000); // Match with fade-out animation duration
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [message]);

    return (
        <div className="preloader">
            <p className={`messages ${fadeClass}`}>{message || randomMessage}</p>
            <div className="magic-loader">
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
            </div>
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
