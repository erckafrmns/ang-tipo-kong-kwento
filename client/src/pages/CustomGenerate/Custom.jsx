import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import paper from '../../assets/tornpaper.svg'; 
import grainy from '../../assets/grainy-bg.svg'; 
import logo from '../../assets/logo-2.svg'; 
import { BiSolidCastle } from "react-icons/bi";
import './Main-Custom.css';  

const Custom = () => {
    const [title, setTitle] = useState(''); // State to hold the title input 
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setTitle(event.target.value); // Update the state as the user types
    }; 

    const handleOutsideNewClick = () => {
        navigate('/main'); // Redirect to Main page
      };

    const handleGenerateClick = () => {
        // Handle the generate button click (e.g., logging the title or processing it)
        console.log("Title to generate:", title);
        // You can also add further actions here
    };

    return (
        <div className="custom-body">
            <div className="grainy-bg-container"> 
                <img src={grainy} className="grainy-bg" alt="Background" /> 
                <img src={logo} className="logo-2" alt="logo" /> 
            </div> 
            
            <div className="custom-container">   
                <div className="small-container">
                    <img src={paper} className="tornpaper" alt="" />  
                    <button className="close-icon" onClick={handleOutsideNewClick}>
                    <BiSolidCastle />
                </button>
                </div>  
                    <div className="inputs">
                        <h1>Customize Your Story</h1> 
                        <input 
                            type="text" 
                            value={title} 
                            onChange={handleInputChange} 
                            placeholder="e.g., alamat ng papaya" 
                            className="title-input"/> 
                        <label className="title-label">title</label>
                        <button onClick={handleGenerateClick} className="generate-button">generate</button>     
                    </div>
            </div>
        </div>
    );
};

export default Custom;
