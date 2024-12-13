import React from 'react';
import { TbCircleChevronsUp } from "react-icons/tb";
import './ScrollToTop.css';  // Default CSS
import './ScrollToTop-vv.css'; // Alternative CSS

const ScrollToTop = ({ isAlternative }) => {
    const [isButtonVisible, setIsButtonVisible] = React.useState(false); // Initially hidden

    // Function to scroll to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle scroll event to detect when the button should be visible
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        // Only show button when scrolled to the bottom
        if (scrollPosition + windowHeight >= documentHeight - 80) {
            setIsButtonVisible(true);
        } else {
            setIsButtonVisible(false);
        }
    };
    
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        handleScroll();  // Check on mount
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <TbCircleChevronsUp
                className={`upButton ${isButtonVisible ? 'visible' : ''} ${isAlternative ? 'altStyle' : ''}`}
                onClick={scrollToTop}
            />
        </>
    );
};

export default ScrollToTop;
