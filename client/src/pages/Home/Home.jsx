import React, { useRef, useState, useEffect } from 'react';
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";   
import Navbar from '../../components/Navbar/Navbar'; 
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'; 
import Footer from '../../components/Footer/Footer'; 
import {Link, useLocation, useNavigate} from "react-router-dom";
import './Home.css';  

import heroBG from '../../assets/hero-bg.png';
import aboutBG from '../../assets/about-books.gif';
import aboutIMG from '../../assets/about-img.png';
import featCustom from '../../assets/feat-custom.png'; 
import featBook from '../../assets/feat-book.png'; 
import featPaperBook from '../../assets/feat-paper-book.png'; 
import featSave from '../../assets/feat-save.png'; 
import featDownload from '../../assets/feat-download.png'; 

import bottomBanner from '../../assets/bottomBanner.svg';  

import LoginSignup from '../LoginSignup/LoginSignup';   
import ForgotPassword from '../ForgotPassword/ForgotPassword';     
import { DefaultPreloader } from '../../components/Preloader/Preloader';


const Home = () => { 
  const location = useLocation(); // Access state passed via navigation
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const navbarRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login'); 

  const navigate = useNavigate();

  const handleGuestAccess = () => {
    navigate('/main', { state: { isGuest: true } });
  };

  useEffect(() => {
    // Clear sessionStorage when the Home component renders
    sessionStorage.clear();

    // Check if state indicates to open a modal
    if (location.state?.openModal) {
      setModalType(location.state.openModal);
      setShowModal(true);
    }
  }, [location.state]);

  const toggleModal = (type) => {
    if (!type) {
      setShowModal(false); 
      setModalType('');   
    } else if (type === modalType) {
      setShowModal(!showModal); 
    } else {
      setModalType(type);
      setShowModal(true);
    }
  };

  const features = [
    { title: "Quick Story Generation", description: "Instantly generate engaging stories with a few clicks.", image: featBook},
    { title: "Customized Your Story", description: "Personalize stories by selecting the length, genre, and title.", image: featCustom},
    { title: "Save & Revisit", description: "Save and revisit generated stories for future reading.", image: featSave},
    { title: "View in Book or Paper Mode", description: "Save and revisit generated stories for future reading.", image: featPaperBook},
    { title: "Download Your Story", description: "Download your stories for offline reading and access them anytime, anywhere.", image: featDownload }
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

  const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 3000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <> 
      <div ref={navbarRef}> 
        <Navbar scrollToFeatures={scrollToFeatures} scrollToAbout={scrollToAbout} />
      </div>
      {isLoading ? <DefaultPreloader /> : null}

      <section className='hero'>
        <h1>Ang tipo kong Kwento</h1>
        <img className="heroBG" src={heroBG} alt="" />
        <div className='heroContainer'>
          <button className="loginBTN" onClick={() => toggleModal('login')}>LOGIN</button>
          <button className="signupBTN" onClick={() => toggleModal('signup')}>SIGN UP</button>
          <button className="guestBTN" onClick={handleGuestAccess}>Continue as Guest</button>
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
                  <img src={feature.image} alt={feature.title} />
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
            {modalType === 'login' || modalType === 'signup' ? (
              <LoginSignup closeModal={() => toggleModal('')} formType={modalType} toggleModal={toggleModal}/>
            ) : modalType === 'forgotpassword' ? (
              <ForgotPassword closeModal={() => toggleModal('')} toggleModal={toggleModal}/>
            ) : null}
          </div>
        </div>
      )}

    </>
  );
};

export default Home;
