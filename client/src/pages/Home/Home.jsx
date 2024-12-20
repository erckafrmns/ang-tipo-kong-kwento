import React, { useRef, useState, useEffect } from 'react';
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";   
import Navbar from '../../components/Navbar/Navbar'; 
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'; 
import Footer from '../../components/Footer/Footer';
import heroBG from '../../assets/hero-bg.png';
import aboutBG from '../../assets/about-books.gif';
import aboutIMG from '../../assets/about-img.png';
import featuresCard from '../../assets/features-card.png';
import bottomBanner from '../../assets/bottomBanner.svg'; 
import {Link, useLocation } from "react-router-dom";
import './Home.css'; 

import LoginSignup from '../LoginSignup/LoginSignup';   

const Home = () => { 
  const location = useLocation(); // Access state passed via navigation
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const navbarRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login'); 

  useEffect(() => {
    // Check if state indicates to open a modal
    if (location.state?.openModal) {
      setModalType(location.state.openModal);
      setShowModal(true);
    }
  }, [location.state]);

  const toggleModal = (type) => {
    setModalType(type);
    setShowModal(!showModal);
  };

  const features = [
    { title: "Quick Story Generation", description: "Instantly generate engaging stories with a few clicks." },
    { title: "Customized Story Generation", description: "Personalize stories by choosing themes, characters, and morals." },
    { title: "Story Archive", description: "Save and revisit generated stories for future reading." },
    { title: "Story Archive 2", description: "Save and revisit generated stories for future reading." },
    { title: "Story Archive 3", description: "Save and revisit generated stories for future reading." }
  ];

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  return (
    <>
      <div ref={navbarRef}>
        <Navbar scrollToFeatures={scrollToFeatures} scrollToAbout={scrollToAbout} />
      </div>

      <section className='hero'>
        <h1>Ang tipo kong Kwento</h1>
        <img className="heroBG" src={heroBG} alt="" />
        <div className='heroContainer'>
          <button className="loginBTN" onClick={() => toggleModal('login')}>LOGIN</button>
          <button className="signupBTN" onClick={() => toggleModal('signup')}>SIGN UP</button>
          <a href="/#" className='guestBTN'>Continue as Guest</a>
        </div>
      </section>

      <section ref={featuresRef} id="features" className='features'>
        <h1>Our Features</h1>
        <div className='featuresContainer'> 
          <div className='leftArrow' onClick={handlePrev}><FiArrowLeftCircle className="nav-icon" /></div>
          <div className='features-slider'>
            {Array.from({ length: 3 }).map((_, index) => {
              const featureIndex = (currentIndex + index) % features.length; 
              const feature = features[featureIndex]; 
              const isMiddleCard = index === 1; 

              return (
                <div
                  className={`features-card ${isMiddleCard ? 'active' : 'inactive'}`}
                  key={featureIndex}
                  style={{
                    transform: isMiddleCard ? 'scale(1.1)' : 'scale(0.8)',
                    opacity: isMiddleCard ? 1 : 0.5,
                  }}
                >
                  {isMiddleCard && (
                    <>
                      <h2>{feature.title}</h2>
                      <p>{feature.description}</p>
                    </>
                  )}
                  <img src={featuresCard} alt={feature.title} />
                </div>
              );
            })}
          </div> 
          <div className='rightArrow' onClick={handleNext}><FiArrowRightCircle className="nav-icon" /> </div>
        </div>

        <img src={bottomBanner} className="bottomBanner" alt="" />
      </section>

      <section ref={aboutRef} id="about" className='aboutUs'>
        <img src={aboutBG} className='aboutBG' alt="" />
        <div className='aboutContainer'>
          <h1>About Us</h1>
          <p>Ang Tipo Kong Kwento is an AI-based Tagalog story writer designed to create engaging and culturally relevant narratives for Filipino children. This innovative platform leverages advanced language models to generate personalized stories that foster creativity, language skills, and moral values. By making quality literature accessible, the application aims to enrich early childhood education in the Philippines and promote a lifelong love for reading.</p>
          <Link to="/developers" className='developersBTN'>Developers</Link>
        </div>
        <img src={aboutIMG} className='aboutIMG' alt="" />  
      </section> 
      <ScrollToTop/>
      <Footer />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <LoginSignup closeModal={() => toggleModal('')} formType={modalType} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
