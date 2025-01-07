import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import './Main-Custom.css';

const Custom = ({ closeModal, isGuest }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const authToken = localStorage.getItem('authToken');
  const [isShortStory, setIsShortStory] = useState(true); 
  const navigate = useNavigate();

  const handleInputChange = (event) => setTitle(event.target.value);
  const handleGenreChange = (event) => setGenre(event.target.value);
  const toggleStoryLength = () => setIsShortStory((prev) => !prev);

  const handleGenerateClick = useCallback(() => {
    if (!title || !genre) {
      alert('Please enter a title and select a genre');
      return;
    }

    const storyLength = isShortStory ? 'Short' : 'Long';

    if (isGuest) {
      navigate('/story', { state: { loading: true, isGuest: true } });
      axios
        .post('http://localhost:5000/generate-custom-story', { title, genre, storyLength })
        .then((response) => {
          const story_id = response.data.story_id;
          const generatedStory = response.data.story;

          // Save the story in sessionStorage for guest users
          const storyData = {
            story_id,
            title,
            genre,
            story: generatedStory,
            timestamp: new Date().toISOString(),
          };
          sessionStorage.setItem(`guestStory_${story_id}`, JSON.stringify(storyData));

          navigate(`/story/${story_id}`, {
              state: { ...storyData, isGuest: true },
          });

          closeModal();
        })
        .catch((error) => {
          console.error('Error generating the story for guest!', error);
          alert('There was an error generating your story. Please try again.');
        });
    } else {
      navigate('/story', { state: { loading: true } });
      axios
        .post('http://localhost:5000/generate-custom-story', 
          { title, genre, storyLength }, 
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            }
          }
        )
        .then((response) => {
          const story_id = response.data.story_id;
          const generatedStory = response.data.story;
          navigate(`/story/${story_id}`, { state: { title, genre, story: generatedStory } });
          closeModal();
        })
        .catch((error) => {
          console.error('Error generating the story!', error);
          alert('There was an error generating your story. Please try again.');
        });
    }
  }, [title, genre, isShortStory, isGuest, navigate, closeModal]);


  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleGenerateClick();
    }
  }, [handleGenerateClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <button className="close-icon" onClick={closeModal}><ImCross /></button>

        <div className="inputs">
          <h1>Customize your Story</h1>

          {/* Story Length Toggle */}
          <div className="toggle-container">
            <span className={`toggle-option ${isShortStory ? 'active' : ''}`} onClick={toggleStoryLength}>Short Story</span>
            <span className={`toggle-option ${!isShortStory ? 'active' : ''}`} onClick={toggleStoryLength}>Long Story</span>
          </div>

          {/* Genre Dropdown */}
          <select value={genre} onChange={handleGenreChange} className="genre-select">
            <option value="">- select genre -</option>
            <option value="Alamat">Alamat</option>
            <option value="Kwentong Bayan">Kwentong Bayan</option>
            <option value="Pabula">Pabula</option>
          </select>

          {/* Story Title Input */}
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="story title"
            className="title-input"
          />

          {/* Generate Button */}
          <button onClick={handleGenerateClick} className="generate-button">generate</button>
        </div>
      </div>
    </div>
  );
};

export default Custom;
