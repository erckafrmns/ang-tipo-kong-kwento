import React from 'react'
import './Footer.css'; 
import logo from '../../assets/logo.png';
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom'; 


const Footer = () => {
  return (
    <>
        <footer>
            <div className='footerInfo'>
                <div className='leftPart'>
                    <h1>Ang tipo kong Kwento</h1>
                    <p>Discover a new world of story writing with us, where AI transforms your ideas into captivating Tagalog tales for young readers.</p>
                    <div className='socialMedia'>
                        <FaFacebook className='socialMedia-item'/>
                        <FaInstagram className='socialMedia-item'/>
                        <FaLinkedin className='socialMedia-item'/>
                        <FaGithub className='socialMedia-item'/>
                        <FaYoutube className='socialMedia-item'/>
                    </div>
                </div>
                
                <div className='rightPart'>
                    <img src={logo} alt="" />
                </div>
            </div>

            <div className='termsPolicy'>
                <Link to="/terms-of-use" className="termsPolicy-item">Terms of Use</Link>
                <Link to="/privacy-policy" className="termsPolicy-item">Privacy Policy</Link>
                <Link to="/guidelines" className="termsPolicy-item">Guidelines</Link>
                <Link to="/other-policies" className="termsPolicy-item">Other Policies</Link>
                <Link to="/contact-us" className="termsPolicy-item">Contact Us</Link>
            </div>

            <div className='copyright'>
                <h4>Copyright &#169; 2024 All Rights Reserved</h4>
            </div>
        </footer>
    </>
  )
}

export default Footer