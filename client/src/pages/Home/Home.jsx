import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import heroBG from '../../assets/hero-bg.png';
import aboutBG from '../../assets/about-bg.png';
import aboutIMG from '../../assets/about-img.png';
import serviceCard from '../../assets/service-card.png';
import bottomBanner from '../../assets/bottomBanner.png';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
        <Navbar/>

        <section className='hero'>
          <h1>Ang tipo kong Kwento</h1>
          <img className="heroBG" src={heroBG} alt="" />
          <div className='container'>
            <Link to="/losi" className='loginBTN'>LOGIN</Link>
            <Link to="/LoSi" className='signupBTN'>SIGN UP</Link>
            <a href="/#" className='guestBTN'>Continue as Guest</a>
          </div>
        </section>

        <section className='services'>
          <h1>Our Services</h1>
          <div className='servicesContainer'>
            <div className='service-card'>
              <h2>Quick Story Generation</h2>
              <p>Instantly generate engaging stories with a few clicks.</p>
              <img src={serviceCard} alt="" />
            </div>
            <div className='service-card'>
              <h2>Customized Story Generation</h2>
              <p>Personalize stories by choosing themes, characters, and morals.</p>
              <img src={serviceCard} alt="" />
            </div>
            <div className='service-card'>
              <h2>Story Archive</h2>
              <p>Save and revisit generated stories for future reading.</p>
              <img src={serviceCard} alt="" />
            </div>
          </div>
          <img src={bottomBanner} className="bottomBanner" alt="" />
        </section>

        <section className='aboutUs'>
          <img src={aboutBG} className='aboutBG' alt="" />
          <div className='aboutContainer'>
            <h1>About Us</h1>
            <p>Ang Tipo Kong Kwento is an AI-based Tagalog story writer designed to create engaging and culturally relevant narratives for Filipino children. This innovative platform leverages advanced language models to generate personalized stories that foster creativity, language skills, and moral values. By making quality literature accessible, the application aims to enrich early childhood education in the Philippines and promote a lifelong love for reading.</p>
            <Link to="/developers" className='developersBTN'>Developers</Link>
          </div>
          <img src={aboutIMG} className='aboutIMG' alt="" />
        </section>

    </>
  )
}

export default Home