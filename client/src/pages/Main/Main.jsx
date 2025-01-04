import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import GuestNavbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import frame from '../../assets/frame.svg';
import Custom from '../CustomGenerate/Custom.jsx';
import '../CustomGenerate/Main-Custom.css';
import Sidebar from '../../components/Sidebar/Sidebar' 
import { DefaultPreloader } from '../../components/Preloader/Preloader';
;

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const isGuest = location.state?.isGuest || false;
  const authToken = localStorage.getItem('authToken');

  const handleGenerateStory = () => {

    if (isGuest) {
      navigate('/story', { state: { loading: true, isGuest: true } });
      axios
        .post('http://localhost:5000/generate-random-story', {})
        .then((response) => {
          const story_id = response.data.story_id
          const generatedTitle = response.data.title;
          const generatedGenre = response.data.genre;
          const generatedStory = response.data.story;
          
          // Save the story in sessionStorage for guest users
          const storyData = {
            story_id,
            title: generatedTitle,
            genre: generatedGenre,
            story: generatedStory,
          };
          sessionStorage.setItem(`guestStory_${story_id}`, JSON.stringify(storyData));

          navigate(`/story/${story_id}`, {
              state: { ...storyData, isGuest: true },
          });
          
          // navigate(`/story/${story_id}`, { state: { title: generatedTitle, genre: generatedGenre, story: generatedStory, isGuest: true } });
        })
        .catch((error) => {
          console.error('Error generating the story without prompt!', error);
        }); 
    } else {
      navigate(`/story`, { state: { loading: true } });
      axios
        .post('http://localhost:5000/generate-random-story', {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          }
        )
        .then((response) => {
          const story_id = response.data.story_id
          const generatedTitle = response.data.title;
          const generatedGenre = response.data.genre;
          const generatedStory = response.data.story;
          navigate(`/story/${story_id}`, { state: { title: generatedTitle, genre: generatedGenre, story: generatedStory } });
        })
        .catch((error) => {
          console.error('Error generating the story without prompt!', error);
        });
    }
    
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);  

  const [isLoading, setIsLoading] = React.useState(true);
  
      React.useEffect(() => {
          const timer = setTimeout(() => setIsLoading(false), 3000);
  
          return () => clearTimeout(timer);
      }, []);

  return (
    <div className="main-container"> 
      {isLoading ? <DefaultPreloader /> : null}

      {isGuest ? (
        <>
          <GuestNavbar />
          <Sidebar />
        </>
      ) : (
        <InsideNavbar />
      )} 
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
      {isModalOpen && <Custom closeModal={toggleModal} isGuest={isGuest}/>} {/* Modal rendering */}
    </div>
  );
};

export default Main;
