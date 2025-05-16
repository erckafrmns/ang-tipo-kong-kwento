import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImCross } from "react-icons/im";
import './Main-Custom.css';
import { toast } from 'react-hot-toast';

const Custom = ({ closeModal, isGuest }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [showGenreOptions, setShowGenreOptions] = useState(false);
  const [theme, setTheme] = useState('');
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const authToken = localStorage.getItem('authToken');
  const [isShortStory, setIsShortStory] = useState(true); 
  const navigate = useNavigate();

  const uncapitalizedWords = ["ng", "at", "sa", "ito", "ni", "para", "na", "sa", "kung", "kaya", "ay"];

  const handleInputChange = (event) => {
    const inputTitle = event.target.value;
    setTitle(capitalizeTitle(inputTitle)); 
  };

  const capitalizeTitle = (input) => {
    return input
      .split(" ")
      .map((word, index) => {
        // Capitalize the first word or any word that isn't in the uncapitalized list
        if (index === 0 || !uncapitalizedWords.includes(word.toLowerCase())) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        // For words that shouldn't be capitalized, just return them as is
        return word.toLowerCase();
      })
      .join(" ");
  };

  const toggleStoryLength = (selectedOption) => {
    setIsShortStory((prev) => {
      if ((selectedOption === 'short' && !prev) || (selectedOption === 'long' && prev)) {
        return !prev;
      }
      return prev; 
    });
  };
  
  const handleGenerateClick = useCallback(() => {
    if (!title || !genre || !theme) {
      toast.error('Please enter a title and select a genre & theme');
      return;
    }

    const storyLength = isShortStory ? 'Short' : 'Long';

    if (isGuest) {
      navigate('/story', { state: { loading: true, isGuest: true } });
      axios
        .post('http://localhost:5000/generate-custom-story', { title, genre, theme, storyLength })
        .then((response) => {
          const story_id = response.data.story_id;
          const generatedStory = response.data.story;

          // Save the story in sessionStorage for guest users
          const storyData = {
            story_id,
            title,
            genre,
            theme,
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
          toast.error('There was an error generating your story. Please try again.');
        });
    } else {
      navigate('/story', { state: { loading: true } });
      axios
        .post('http://localhost:5000/generate-custom-story', 
          { title, genre, theme, storyLength}, 
          {
            headers: {
              'Authorization': `Bearer ${authToken}`,
            }
          }
        )
        .then((response) => {
          const story_id = response.data.story_id;
          const generatedStory = response.data.story;
          navigate(`/story/${story_id}`, { state: { title, genre, theme, story: generatedStory } });
          closeModal();
        })
        .catch((error) => {
          console.error('Error generating the story!', error);
          toast.error('There was an error generating your story. Please try again.');
        });
    }
  }, [title, genre, theme, isShortStory, isGuest, navigate, closeModal]);


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
            <span className={`toggle-option ${isShortStory ? 'active' : ''}`} onClick={() => toggleStoryLength('short')}>Short Story</span>
            <span className={`toggle-option ${!isShortStory ? 'active' : ''}`}  onClick={() => toggleStoryLength('long')}>Long Story</span>
          </div>

          {/* Genre Dropdown  */}
          <div className="genre-dropdown">
            <div className="genre-selected" onClick={() => {
              setShowGenreOptions((prev) => !prev);
              setShowThemeOptions(false);
            }}>
              {genre || '- select genre -'}
              <span className="genre-arrow">▼</span>
            </div>
            {showGenreOptions && (
              <ul className="genre-options">
                {['Alamat', 'Kwentong Bayan', 'Pabula'].map((option) => (
                  <li
                    key={option}
                    className={`genre-option ${genre === option ? 'selected' : ''}`}
                    onClick={() => {
                      setGenre(option);
                      setShowGenreOptions(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

        {/* Theme Dropdown  */}
          <div className="theme-dropdown">
            <div className="theme-selected" onClick={() => {
              setShowThemeOptions((prev) => !prev);
              setShowGenreOptions(false); 
            }}>
              {theme || '- select theme -'}
              <span className="theme-arrow">▼</span>
            </div>

            {showThemeOptions && (
              <ul className="theme-options">
                {['Kasipagan', 'Matulungin', 'Pagkakaibigan', 'Katapatan', 'Kabayanihan'].map((option) => (
                  <li
                    key={option}
                    className={`theme-option ${theme === option ? 'selected' : ''}`}
                    onClick={() => {
                      setTheme(option);
                      setShowThemeOptions(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
