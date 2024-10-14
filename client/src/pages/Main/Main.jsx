import React from 'react';
import { Link } from 'react-router-dom'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import '../CustomGenerate/Main-Custom.css';  

const Main = () => {
    return (
        <div>
            <InsideNavbar />

            {/* Inline text display--sample */}
            <div className="inline-text-container">
                <Link to="/custom" className="inline-text">
                    Customize Your Story
                </Link>
                <span className="inline-text1">Generate Without Customization</span>
            </div>
        </div>
    );
};

export default Main;
