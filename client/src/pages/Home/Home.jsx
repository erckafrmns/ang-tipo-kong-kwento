import React, { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import heroBG from '../../assets/hero-bg.png';
import aboutBG from '../../assets/about-bg.png';
import aboutIMG from '../../assets/about-img.png';
import featuresCard from '../../assets/features-card.png';
import bottomBanner from '../../assets/bottomBanner.png';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

  const featuresRef = useRef(null); 
  const aboutRef = useRef(null);    

  // Scroll functions
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
        <Navbar scrollToFeatures={scrollToFeatures} scrollToAbout={scrollToAbout} /> 

        <section className='hero'>
          <h1>Ang tipo kong Kwento</h1>
          <img className="heroBG" src={heroBG} alt="" />
          <div className='heroContainer'>
            <Link to="/login-signup" className='loginBTN'>LOGIN</Link>
            <Link to="/login-signup" className='signupBTN'>SIGN UP</Link>
            <a href="/#" className='guestBTN'>Continue as Guest</a>
          </div>
        </section>

        <section ref={featuresRef} className='features'>
          <h1>Our Features</h1>
          <div className='featuresContainer'>
            <div className='features-card'>
              <h2>Quick Story Generation</h2>
              <p>Instantly generate engaging stories with a few clicks.</p>
              <img src={featuresCard} alt="" />
            </div>
            <div className='features-card'>
              <h2>Customized Story Generation</h2>
              <p>Personalize stories by choosing themes, characters, and morals.</p>
              <img src={featuresCard} alt="" />
            </div>
            <div className='features-card'>
              <h2>Story Archive</h2>
              <p>Save and revisit generated stories for future reading.</p>
              <img src={featuresCard} alt="" />
            </div>
          </div>
          <img src={bottomBanner} className="bottomBanner" alt="" />
        </section>

        <section ref={aboutRef} className='aboutUs'>
          <img src={aboutBG} className='aboutBG' alt="" />
          <div className='aboutContainer'>
            <h1>About Us</h1>
            <p>Ang Tipo Kong Kwento is an AI-based Tagalog story writer designed to create engaging and culturally relevant narratives for Filipino children. This innovative platform leverages advanced language models to generate personalized stories that foster creativity, language skills, and moral values. By making quality literature accessible, the application aims to enrich early childhood education in the Philippines and promote a lifelong love for reading.</p>
            <Link to="/developers" className='developersBTN'>Developers</Link>
          </div>
          <img src={aboutIMG} className='aboutIMG' alt="" />
        </section>

        <Footer/>
    </>
  )
}

export default Home