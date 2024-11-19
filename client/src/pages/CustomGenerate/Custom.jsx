import React, { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import paper from '../../assets/tornpaper.svg'; 
import grainy from '../../assets/grainy-bg.svg'; 
import logo from '../../assets/logo-2.svg'; 
import { GiCrossedBones } from "react-icons/gi"; 
import Footer from '../../components/Footer/Footer';
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
            if (!title) {
                alert('Please enter a title');
                return;
            }
            navigate('/story', { state: { loading: true } }); // Navigate immediately with loading state
            axios.post('http://localhost:5000/generate-custom-story', { title })
                .then(response => {
                    const generatedStory = response.data.story;
                    navigate('/story', { state: { story: generatedStory } }); // Update with the story
                })
                .catch(error => {
                    console.error('Error generating the story!', error);
                });
        };


    return ( 
        <>
        <div className="custom-body">
            <div className="grainy-bg-container"> 
                <img src={grainy} className="grainy-bg" alt="Background" /> 
                <img src={logo} className="logo-2" alt="logo" /> 
            </div> 
            
            <div className="custom-container">   
                <div className="small-container">
                    <img src={paper} className="tornpaper" alt="" />  
                    <button className="close-icon" onClick={handleOutsideNewClick}>
                    <GiCrossedBones />
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
        <Footer isAlternative={false} /> 
        </>
    );
};

export default Custom;
