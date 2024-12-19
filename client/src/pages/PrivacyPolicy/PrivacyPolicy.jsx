import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar';  
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';   
import Footer from '../../components/Footer/Footer';
import '../TermsOfUse/TermsOfUse.css'

const PrivacyPolicy = () => { 
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []); 

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
        useEffect(() => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        }, []);
  return (
    <> 
      {isLoggedIn ? <InsideNavbar /> : <Navbar />}
      <div className='termsandpolicies'>

            <div className='container-bot'>
                <h1>Privacy policy</h1>
                <p className='effectivity'><strong>Effective Date:</strong> October 17, 2024</p>
                <p>At Ang Tipo Kong Kwento, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our platform. By using the platform, you agree to the terms described below. If you do not agree with this policy, please discontinue the use of our services.</p>
                
                <div className='bot-item'>
                    <h4>Information We Collect</h4>
                    <p>We collect information to enhance your experience with Ang Tipo Kong Kwento and to provide our story generation services.</p>

                    <ul className='secondP'>
                      <li><p><strong>Personal Information:</strong> We may collect information such as your name, email address, and other contact details when you create an account or contact us for support. If you are a parent or guardian, this information is collected to help manage your child’s experience on the platform.</p></li>
                      <li><p><strong>Non-Personal Information:</strong> We also collect non-personal data like browser type, device information, and usage data to improve the functionality of our platform.</p></li>
                      <li><p><strong>Generated Content:</strong> As part of our services, we store the stories created through user inputs, which are saved to user accounts for future access.</p></li>
                    </ul>
                
                </div>
                
                <div className='bot-item'>
                    <h4>Parental Consent and Children's Privacy</h4>
                    <p>Our platform is designed for children, but we require that all users under 18 access the platform under the supervision of a parent or legal guardian. For children under 13, we require parental consent before collecting any personal information. We do not knowingly collect personal information from children without such consent.</p>
                
                    <p className='secondP'>Parents or guardians are responsible for creating accounts for minors and supervising their use of the platform. They may review or request the deletion of their child’s information at any time by contacting us.</p>
                </div>

                <div className='bot-item'>
                    <h4>How We Use Your Information</h4>
                    <p>We use the information we collect for the following purposes:</p>

                    <ul className='secondP'>
                      <li><p><strong>Service Delivery:</strong> To provide access to our AI-powered story generation services and allow you to customize and save stories.</p></li>
                      <li><p><strong>Platform Improvement:</strong> To analyze usage patterns and improve the platform’s performance and user experience.</p></li>
                      <li><p><strong>Communication:</strong> To respond to inquiries, send updates, and notify you of important platform changes.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>Data Security</h4>
                    <p>We are dedicated to ensuring that your information is secure. We use a combination of physical, technical, and administrative measures to protect your data against unauthorized access, disclosure, or misuse. However, please note that no data transmission over the internet is entirely secure, and we cannot guarantee absolute security.</p>
                </div>

                <div className='bot-item'>
                    <h4>Sharing of Information</h4>
                    <p>We do not sell or rent your personal information to third parties. Your data is only shared under the following circumstances:</p>

                    <ul className='secondP'>
                      <li><p><strong>With your consent:</strong> We may share your information with third parties when you have given us permission to do so.</p></li>
                      <li><p><strong>Service Providers:</strong> We may work with third-party providers who assist us in operating the platform. These providers are contractually bound to protect your data.</p></li>
                      <li><p><strong>Legal Requirements:</strong> We may disclose your personal information if required to comply with legal obligations or protect our rights and those of our users.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>Your Rights</h4>
                    <p>You have the right to access, modify, or delete your personal information at any time. If you wish to make changes to your data, or request its deletion, please contact us, and we will process your request in a timely manner.</p>
                </div>

                <div className='bot-item'>
                    <h4>Data Retention</h4>
                    <p>We retain personal information for as long as necessary to fulfill the purposes outlined in this policy or as required to meet legal obligations. Once the information is no longer needed, it will be securely deleted.</p>
                </div>

                <div className='bot-item'>
                    <h4>Cookies and Tracking</h4>
                    <p>We use cookies and similar technologies to enhance your experience on our platform. Cookies help us remember your preferences and track how you use the platform. You can control cookie settings through your browser, but disabling cookies may affect the functionality of certain features.</p>
                </div>


                <div className='bot-item'>
                    <h4>Changes to This Privacy Policy</h4>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and we will notify you of significant changes through email or other communication methods.</p>
                </div>


                <div className='bot-item'>
                    <h4>Contact Us</h4>
                    <p>If you have any questions or concerns about this Privacy Policy, or if you would like to exercise any of your rights regarding your data, please reach out to us at <a href="mailto:angtipokongkwento@gmail.com"><u>angtipokongkwento@gmail.com</u></a> or through our  <Link to="/contact-us"><u>website</u></Link>.</p>
                </div>
        
            </div>
        </div>
        <ScrollToTop isAlternative={true} />
        <Footer isAlternative={true} />
    </>
  )
}

export default PrivacyPolicy