import React, { useState, useEffect } from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import './ContactUs.css' 
import Navbar from '../../components/Navbar/Navbar'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import Footer from '../../components/Footer/Footer';
import { toast } from 'react-hot-toast';

const ContactUs = () => { 
    const isLoggedIn = localStorage.getItem('authToken'); 
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
      }, []);

    // State to manage form data
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        message: ''
    });

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsLoading(false);
                toast.success('Message sent successfully!')
                setFormData({ fullname: '', email: '', message: '' }); 
            } else {
                setIsLoading(false);
                const errorData = await response.json();
                toast.error(`Failed to send message: ${errorData.error}`)
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error sending message:', error);
            toast.error('An error occurred while sending your message.')
        }
    }; 

  return ( 
    <> 
      {isLoggedIn ? <InsideNavbar /> : <Navbar />}
      <div className='contactUs'>
            
            <div className='contactUs-bot'>
                <h1>Contact Us</h1>
                <p style={{ color: "#29412d" }}>Have any questions or need assistance?</p>
                
                <div className='contactUs-container'>
                    <div className='contacts'>
                    <div className='contact-items'>
                        <FaPhoneAlt  className='contact-icons'/>
                        <p>(+63) 9153095156</p>
                    </div>
                    <div className='contact-items'>
                        <MdEmail className='contact-icons'/>
                        <p>angtipokongkwento@gmail.com</p>
                    </div>
                    <div className='contact-items'>
                        <FaLocationDot className='contact-icons'/>
                        <p>Metro Manila, NCR, Philippines</p>
                    </div>
                    </div>

                    <div className="vertical-line"></div>

                    <form className='contactForm' onSubmit={handleSubmit}>
                    <div>
                        <input type="text" id="fullname" name="fullname" placeholder="name" value={formData.fullname} onChange={handleChange} required/>
                    </div>

                    <div>
                        <input type="email" id="email" name="email" placeholder='email' value={formData.email} onChange={handleChange} required/>
                    </div>

                    <div>
                        <textarea id="message" name="message" placeholder='message' rows="5" value={formData.message} onChange={handleChange} required></textarea>
                    </div>

                    {/* <button type="submit">send</button> */}
                    <button className="form-btn" type="submit" disabled={isLoading}>
                      {isLoading ?
                        <div className="spinner-wrapper">
                          <div className="button-spinner"></div>
                        </div>
                        : 'send'}
                    </button>
                    </form>
                </div>

            </div>

        </div>
        <Footer isAlternative={true} />
    </>
  )
}

export default ContactUs