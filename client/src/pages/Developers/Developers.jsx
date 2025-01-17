import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import dev1 from '../../assets/dev1.jpg'; 
import dev2 from '../../assets/dev2.jpg';
import dev3 from '../../assets/dev3.jpg';
import dev4 from '../../assets/dev4.jpg';
import dev5 from '../../assets/dev5.jpg';
import Navbar from '../../components/Navbar/Navbar';
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import './Developers.css';

const Developers = () => { 

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);

    const developers = [
        { 
            id: 1, 
            name: 'Ernest Sean Aguilar', 
            description: 'Project Manager', 
            image: dev1,
            socials: {
                facebook: 'https://www.facebook.com/Ilongftw97',
                linkedin: 'https://www.linkedin.com/in/ernest-sean-aguilar-809224324/',
                github: 'https://github.com/Minek1129',
            }
        },
        { 
            id: 2, 
            name: 'Ericka Joy Formanes', 
            description: 'Full-Stack Developer', 
            image: dev2,
            socials: {
                facebook: 'https://facebook.com/EriiSsi',
                linkedin: 'https://www.linkedin.com/in/erickaformanes',
                github: 'https://github.com/erckafrmns',
            },
        },
        { 
            id: 3, 
            name: 'Grace Anne Garchitorena', 
            description: 'Front-End Developer, UI/UX Designer', 
            image: dev3,
            socials: {
                facebook: 'https://www.facebook.com/graceanne.garchitorena',
                linkedin: 'https://www.linkedin.com/in/grace-anne-garchitorena-28811b2b0/',
                github: 'https://github.com/graciaanna032203',
            },
        },
        { 
            id: 4, 
            name: 'Niño Angelo Manzanero', 
            description: 'UI/UX Designer', 
            image: dev4,
            socials: {
                facebook: 'https://www.facebook.com/manzerella',
                linkedin: 'https://www.linkedin.com/in/angelo-manzanero-300437169/',
                github: 'https://github.com/manzerella',
            },
        },
        { 
            id: 5, 
            name: 'Paolo Santos', 
            description: 'AI Engineer', 
            image: dev5,
            socials: {
                facebook: 'https://www.facebook.com/paolowithsantos',
                linkedin: 'https://www.linkedin.com/in/paolo-santos-66ab51323/',
                github: 'https://github.com/paolosantos3233',
            },
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitionDirection, setTransitionDirection] = useState('');


    
    const handlePrevClick = () => {
        setTransitionDirection('prev');
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? developers.length - 1 : prevIndex - 1));
        setTimeout(() => setTransitionDirection(''), 300);
    };

    const handleNextClick = () => {
        setTransitionDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex === developers.length - 1 ? 0 : prevIndex + 1));
        setTimeout(() => setTransitionDirection(''), 300);
    };

    const getVisibleDevelopers = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(developers[(currentIndex + i) % developers.length]);
        }
        return visible;
    };

    const visibleDevelopers = getVisibleDevelopers();

    return (
        <> 
        <Navbar/>
            <div className='developersPage'> 
            <div className='dev-top'>
                    <h1>Meet the team</h1>
                </div>
                <div className='dev-slider-container'>
                    <button className="prev-btn" onClick={handlePrevClick}>❮</button>
                    <div className={`dev-card-slider ${transitionDirection}`}>
                        {visibleDevelopers.map((dev, index) => (
                            <div 
                                key={dev.id} 
                                className={`dev-card ${index === 1 ? 'active' : 'inactive'}`}
                                onClick={index === 0 ? handlePrevClick : index === 2 ? handleNextClick : null}
                            >
                                <div className='dev-card-top'>
                                    <img src={dev.image} alt={dev.name} className="card-img" />
                                </div>
                                <div className='dev-card-bot'>
                                    <h3>{dev.name}</h3>
                                    <p>{dev.description}</p>
                                    <div className='dev-socials'>
                                        <a href={dev.socials.facebook} target="_blank" rel="noopener noreferrer" className='dev-socials-item fb'>
                                            <FaFacebook />
                                        </a>
                                        <a href={dev.socials.linkedin} target="_blank" rel="noopener noreferrer" className='dev-socials-item li'>
                                            <FaLinkedin />
                                        </a>
                                        <a href={dev.socials.github} target="_blank" rel="noopener noreferrer" className='dev-socials-item gh'>
                                            <FaGithub />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="next-btn" onClick={handleNextClick}>❯</button>
                </div>
            </div>

            <Footer isAlternative={true} />
        </>
    );
};

export default Developers;
