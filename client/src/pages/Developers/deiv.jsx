import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import logo from '../../assets/logo.png';
import dev1 from '../../assets/dev1.png'; // Pretend these exist in the assets folder
import dev2 from '../../assets/dev2.png';
import dev3 from '../../assets/dev3.png';
import dev4 from '../../assets/dev4.png';
import dev5 from '../../assets/dev5.png';
import { GiCrossedBones } from "react-icons/gi";
import { Link } from 'react-router-dom';
import './Developers.css';

const Developers = () => {
  const developers = [
    {
      id: 1,
      name: 'John Morgan',
      description: 'Full Stack Developer',
      image: dev1,
    },
    {
      id: 2,
      name: 'Ellie Anderson',
      description: 'Frontend Developer',
      image: dev2,
    },
    {
      id: 3,
      name: 'Nia Adebayo',
      description: 'Backend Developer',
      image: dev3,
    },
    {
      id: 4,
      name: 'Liam Roberts',
      description: 'UI/UX Designer',
      image: dev4,
    },
    {
      id: 5,
      name: 'Sophia Clark',
      description: 'Project Manager',
      image: dev5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? developers.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === developers.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className='developersPage'>
        <div className='dev-top'>
          <Link to="/" className='logoIMG'><img src={logo} alt="Logo" /></Link>
          <Link to="/" className='exIcon'><GiCrossedBones/></Link>
        </div>

        <div className='slider-container'>
          <button className="prev-btn" onClick={handlePrevClick}>❮</button>
          <div className='card-slider'>
            {developers.map((dev, index) => (
              <div
                key={dev.id}
                className={`card ${index >= currentIndex && index < currentIndex + 3 ? 'active' : 'hidden'}`}
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                <img src={dev.image} alt={dev.name} className="card-img" />
                <h3>{dev.name}</h3>
                <p>{dev.description}</p>
              </div>
            ))}
          </div>
          <button className="next-btn" onClick={handleNextClick}>❯</button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Developers;
