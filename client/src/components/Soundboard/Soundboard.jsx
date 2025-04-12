import React, { useState, useRef } from "react";
import "./Soundboard.css";
import { MdOutlineLibraryMusic } from "react-icons/md";

const Soundboard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeGenre, setActiveGenre] = useState(null);
  const audioRef = useRef(null); 

  const toggleSoundboard = () => {
    setIsExpanded((prev) => !prev);
    setActiveGenre(null);
    if (audioRef.current) {
      audioRef.current.pause(); 
      audioRef.current.currentTime = 0;
    }
  };

  const toggleGenre = (index) => {
    setActiveGenre((prev) => (prev === index ? null : index));
    if (audioRef.current) {
      audioRef.current.pause(); 
      audioRef.current.currentTime = 0; 
    }
  };

  const playSound = (genre, squareIndex) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  
    const cleanGenre = genre.toLowerCase().replace(/\s+/g, "-");
    const wavPath = `/sounds/${cleanGenre}/${squareIndex + 1}.wav`;
    const mp3Path = `/sounds/${cleanGenre}/${squareIndex + 1}.mp3`;
  
    const wavAudio = new Audio(wavPath);
    audioRef.current = wavAudio;
  
    wavAudio.play().catch(() => {
      const mp3Audio = new Audio(mp3Path);
      audioRef.current = mp3Audio;
      mp3Audio.play().catch(err => console.warn("Sound playback failed:", err));
    });
  };
  

  const genres = [
    { name: "Tunog ng Hayop", sounds: ["Aso", "Pusa", "Leon", "Baka", "Palaka", "Baboy", "Manok", "Pato", "Kabayo", "Ibon", "Unggoy", "Elepante"] },
    { name: "Tunog ng Kalikasan", sounds: ["Ulan", "Hangin", "Kidlat", "Alon", "Mga Ibon", "Ilog", "Apoy", "Dahon", "Talon ng Talon", "Kriket", "Sikada", "Bundok"] },
    { name: "Tunog sa Loob ng Bahay", sounds: ["Doorbell", "Telepono", "Vacuum", "Toster", "Orasan", "Dishwasher", "Pridyeder", "Microwave", "Shower", "Telebisyon", "Washing Machine", "Oven"] },
    { name: "Tunog ng Musika", sounds: ["Gitara", "Piyano", "Tambol", "Byolin", "Plawta", "Trumpeta", "Saksofono", "Klarinete", "Harmonika", "Selo", "Baso", "Tamburin"] },
    { name: "Tunog ng Transportasyon", sounds: ["Kotse", "Bus", "Tren", "Eroplano", "Motorsiklo", "Bisikleta", "Trak", "Bapor", "Helikopter", "Subway", "Iskuter", "Ambulansya"] },
    { name: "Tunog ng Tauhan", sounds: ["Tawa", "Iyak", "Sigaw", "Pagbahing", "Ungol", "Ubo", "Bulong", "Hiyaw", "Huni", "Hilik", "Gulat", "Ungal"] },
    { name: "Tunog ng Mahika", sounds: ["Orasyon", "Diwata", "Wand", "Witch", "Dragon", "Mago", "Unikorn", "Potion", "Multo", "Bula", "Kampana", "Kulog"] }    
  ];

  return (
    <>
      {!isExpanded && (
        <div className="soundboard-btn" onClick={toggleSoundboard}>
            <MdOutlineLibraryMusic />
        </div>
        )}

      {isExpanded && (
        <div className="soundboard-panel">
          <div className="soundboard-header">
            <h3>Soundboard</h3>
            <button onClick={toggleSoundboard} className="soundboardClose-btn">
              <MdOutlineLibraryMusic />
            </button>
          </div>

          <div className="soundboard-scrollable">
            <div className="soundboard-content">
              <div className="genre-menu">
                {genres.map((genre, genreIndex) => (
                  <React.Fragment key={genreIndex}>
                    <div
                      className={`genre-item ${genreIndex === 0 ? "genre-top-thick" : ""} ${activeGenre === genreIndex ? "active" : ""}`}
                      onClick={() => toggleGenre(genreIndex)}
                    >
                      {genre.name}
                    </div>
                    {activeGenre === genreIndex && (
                      <div className="genre-grid">
                        {genre.sounds.map((sound, squareIndex) => (
                          <div
                            key={squareIndex}
                            className="genre-square"
                            onClick={() => playSound(genre.name, squareIndex)}
                          >
                            {sound}
                          </div>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Soundboard;
