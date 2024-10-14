import React, { useState } from 'react';
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import './Main-Custom.css';  

const Custom = () => {
    const [title, setTitle] = useState(''); // State to hold the title input

    const handleInputChange = (event) => {
        setTitle(event.target.value); // Update the state as the user types
    };

    const handleGenerateClick = () => {
        // Handle the generate button click (e.g., logging the title or processing it)
        console.log("Title to generate:", title);
        // You can also add further actions here
    };

    return (
        <div>
            <InsideNavbar />
            
            <div className="custom-container">
                <h1>Customize Your Story</h1> 
                <label className="title-label">Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Alamat ng Papaya" 
                    className="title-input"
                />
                <button onClick={handleGenerateClick} className="generate-button">
                    Generate
                </button>
            </div>
        </div>
    );
};

export default Custom;
