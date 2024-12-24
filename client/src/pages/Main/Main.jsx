import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import GuestNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import frame from '../../assets/frame.svg';
import Custom from '../CustomGenerate/Custom.jsx';
import '../CustomGenerate/Main-Custom.css';

const Main = ({isGuest}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  // const isGuest = location.state?.isGuest || false;

  const handleGenerateStory = () => {

    if (isGuest) {
      navigate('/story', { state: { loading: true, isGuest: true } });
      axios
        .post('http://localhost:5000/generate-story', {})
        .then((response) => {
          const generatedTitle = response.data.title;
          const generatedStory = response.data.story;
          navigate('/story', { state: { title: generatedTitle, story: generatedStory, isGuest: true } });
        })
        .catch((error) => {
          console.error('Error generating the story without prompt!', error);
        }); 
    } else {
      navigate('/story', { state: { loading: true } });
      axios
        .post('http://localhost:5000/generate-story', {})
        .then((response) => {
          const generatedTitle = response.data.title;
          const generatedStory = response.data.story;
          navigate('/story', { state: { title: generatedTitle, story: generatedStory } });
        })
        .catch((error) => {
          console.error('Error generating the story without prompt!', error);
        });
    }
    
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen); 

  return (
    <div className="main-container">
      {isGuest ? <GuestNavbar /> : <InsideNavbar />}
      <section className="customization-container">
        <div className="custom" onClick={toggleModal}>
          <img src={frame} className="custom-frame" alt="Frame" />
          <div className="custom-text">
            <span>Customize your</span>
            <span>Story</span>
          </div>
        </div>
        <div className="without-custom" onClick={handleGenerateStory}>
          <img src={frame} className="without-custom-frame" alt="Frame" />
          <div className="without-custom-text"> 
            <span>Generate without</span> 
            <span>Customization</span> 
            </div>
        </div>
      </section> 
      <Footer isAlternative={true} />
      {isModalOpen && <Custom closeModal={toggleModal} />} {/* Modal rendering */}
    </div>
  );
};

export default Main;
