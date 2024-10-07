import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import heroBG from '../../assets/hero-bg.png';
import './Home.css'

const Home = () => {
  return (
    <>
        <Navbar/>
        <section className='hero'>
            <img src={heroBG} alt="" />
            <div className='container'>
              <h1>Ang Tipo Kong Kwento</h1>
              <button className='signupBTN'>Sign Up</button>
              <button className='loginBTN'>Log In</button>
              <a href="/#" className='guestBTN'>Continue as Guest</a>
            </div>
        </section>
    </>
  )
}

export default Home