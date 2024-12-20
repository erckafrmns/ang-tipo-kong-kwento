import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import './Main-Custom.css';

const Custom = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => setTitle(event.target.value);
  const handleGenreChange = (event) => setGenre(event.target.value);

  const handleGenerateClick = useCallback(() => {
    if (!title || !genre) {
      alert('Please enter a title and select a genre');
      return;
    }

    navigate('/story', { state: { loading: true } });

    axios.post('http://localhost:5000/generate-custom-story', { title, genre })
      .then((response) => {
        const generatedStory = response.data.story;
        navigate('/story', { state: { title, genre, story: generatedStory } });
        closeModal();
      })
      .catch((error) => {
        console.error('Error generating the story!', error);
        alert('There was an error generating your story. Please try again.');
      });
  }, [title, genre, navigate, closeModal]);

  // Handle key press for Enter
  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      handleGenerateClick();
    }
  }, [handleGenerateClick]);

  // Add event listener for Enter key on mount and cleanup on unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="custom-modal-overlay">
      {/* Modal Container */}
      <div className="custom-modal">
        {/* Close Button */}
        <button className="close-icon" onClick={closeModal}><ImCross /></button>
        
        <div className="inputs">
          <h1>Customize your Story</h1>

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
