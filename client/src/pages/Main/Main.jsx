import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InsideNavbar from '../../components/Navbar/InsideNavbar';  
import Footer from '../../components/Footer/Footer';
import frame from '../../assets/frame.svg';
import '../CustomGenerate/Main-Custom.css';   

const Main = () => {

    const [story, setStory] = useState('');
    const navigate = useNavigate(); 

    const handleGenerateStory = () => {
        const title = "Ang Batang Matulungin"; //temporary 
        axios.post('http://localhost:5000/generate-story', { title })
            .then(response => {
                const generatedStory = response.data.story;
                setStory(generatedStory);  // Store the story in the state
                navigate('/story', { state: { story: generatedStory } });  // Redirect and pass the story
            })
            .catch(error => {
                console.error('There was an error generating the story!', error);
            });
    };
    


    return (
        <div className="main-container"> 
            <InsideNavbar />

            <section className="customization-container">
                <div className="custom"> 
                    <img src={frame} className="custom-frame" alt="Background" />
                    <Link to="/custom" className="custom-text"><span>Customize Your</span><span>Story</span></Link>
                </div>
                <div className="without-custom" onClick={handleGenerateStory}> 
                    <img src={frame} className="without-custom-frame" alt="Background" />
                    <div className="without-custom-text">Generate Without Customization</div>
                </div>
            </section>  

            <Footer isAlternative={true} />
        </div>
    )
}

export default Main;
