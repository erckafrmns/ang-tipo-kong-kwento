import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InsideNavbar from '../../components/Navbar/InsideNavbar';  
import Footer from '../../components/Footer/Footer';
import frame from '../../assets/frame.svg';
import '../CustomGenerate/Main-Custom.css';   

const Main = () => {

    const navigate = useNavigate(); 

    const handleGenerateStory = () => {
    navigate('/story', { state: { loading: true } }); // Navigate immediately with loading state
    axios.post('http://localhost:5000/generate-story', {})
        .then(response => {
            const generatedTitle = response.data.title;
            const generatedStory = response.data.story;
            navigate('/story', { state: { title: generatedTitle, story: generatedStory } }); // Update with the story
        })
        .catch(error => {
            console.error('There was an error generating the story without prompt!', error);
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
