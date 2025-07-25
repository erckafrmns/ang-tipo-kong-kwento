import React, {useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar';  
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';    
import Footer from '../../components/Footer/Footer';
import '../TermsOfUse/TermsOfUse.css'

const OtherPolicies = () => { 
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); 

  const isLoggedIn = localStorage.getItem('authToken'); 
  
  return (
    <> 
      {isLoggedIn ? <InsideNavbar /> : <Navbar />}
      <div className='termsandpolicies'>
            <div className='container-bot'>
                <h1>Terms and policies</h1>
                
                <div className='bot-item'>
                  <p>We are committed to providing a safe and enriching environment for all users. Below, you will find a summary of our key policies, including the <Link to="/terms-of-use"><u>Terms of Use</u></Link>, <Link to="/privacy-policy"><u>Privacy Policy</u></Link>, and <Link to="/guidelines"><u>Guidelines</u></Link>. These documents ensure that your experience with our platform is both enjoyable and secure.</p>
                </div>
                
                <div className='bot-item'>
                    <h4>1. Terms of Use</h4>
                    <p>Our Terms of Use outline the rules and responsibilities that govern your access to and use of Ang Tipo Kong Kwento. By using our platform, you agree to these terms, which cover:</p>
                
                    <ul className='secondP'>
                      <li><p><strong>Eligibility:</strong> Our platform is designed for children, but use must be supervised by a parent or guardian for users under 18.</p></li>
                      <li><p><strong>Account Management:</strong> Users are responsible for maintaining the confidentiality of their accounts and ensuring appropriate use of the platform.</p></li>
                      <li><p><strong>Content Generation:</strong> Ang Tipo Kong Kwento allows users to create and customize stories; however, users must ensure the content remains appropriate and follows our guidelines.</p></li>
                      <li><p><strong>Liability:</strong> We are not responsible for any damages resulting from the use or inability to use the platform.</p></li>
                    </ul>
                
                    <p className='secondP'>For more details, please review our full <Link to="/terms-of-use"><u>Terms of Use</u></Link>.</p>
                </div>
                
                <div className='bot-item'>
                    <h4>2. Privacy Policy</h4>
                    <p>Your privacy is important to us, and our Privacy Policy outlines how we collect, use, and protect your personal information. Key elements of our policy include:</p>
                  
                    <ul className='secondP'>
                      <li><p><strong>Data Collection:</strong> We collect personal information such as names and email addresses for account creation, as well as non-personal data to improve user experience.</p></li>
                      <li><p><strong>Parental Consent:</strong> For children under 13, we require verifiable parental consent before collecting personal data.</p></li>
                      <li><p><strong>Security:</strong> We take measures to protect your data, but you are responsible for safeguarding your account credentials.</p></li>
                      <li><p><strong>Data Rights:</strong> You have the right to access, correct, or delete your personal data at any time.</p></li>
                    </ul>
                
                    <p className='secondP'>For more information, please see our complete <Link to="/privacy-policy"><u>Privacy Policy</u></Link>.</p>
                </div>

                <div className='bot-item'>
                    <h4>3. Guidelines</h4>
                    <p>Our platform is designed to foster creativity, cultural learning, and a love for reading in a positive and safe environment. To ensure that everyone has a great experience, we ask users to follow these key guidelines:</p>
                
                    <ul className='secondP'>
                      <li><p><strong>Respectful Use:</strong> Treat the platform and other users with respect, and avoid submitting inappropriate content.</p></li>
                      <li><p><strong>Parental Supervision:</strong> Parents or guardians must supervise and manage the use of the platform by minors.</p></li>
                      <li><p><strong>Positive Engagement:</strong> Use the customization features responsibly and ensure that stories are appropriate for young readers.</p></li>
                    </ul>
                
                    <p className='secondP'>For a detailed look, please refer to our <Link to="/guidelines"><u>Guidelines</u></Link></p>
                </div>

                <div className='bot-item'>
                    <h4>4. Content and Intellectual Property</h4>
                    <p>All stories generated by Ang Tipo Kong Kwento are subject to intellectual property protection. Users are granted personal, non-commercial use of the generated content. Commercial use, reproduction, or redistribution of the content without permission is prohibited. By using the platform, you agree not to infringe on our intellectual property rights.</p>
                
                    <p className='secondP'>For additional details, please refer to the <Link to="/terms-of-use"><u>Terms of Use</u></Link>.</p>
                </div>

                <div className='bot-item'>
                    <h4>5. Data Protection and Security</h4>
                    <p>We take the security of your data seriously. Our platform employs industry-standard encryption and security measures to ensure that your personal information is protected. However, users are encouraged to:</p>
                
                    <ul className='secondP'>
                      <li><p>Keep account credentials secure and private.</p></li>
                      <li><p>Report any suspicious activity or unauthorized access immediately.</p></li>
                    </ul>
                
                    <p className='secondP'>You can read more in our <Link to="/privacy-policy"><u>Privacy Policy</u></Link> about how we manage data protection and security.</p>
                </div>

                <div className='bot-item'>
                    <h4>6. Modifications and Updates</h4>
                    <p>We may update our Terms of Use, Privacy Policy, or Guidelines from time to time to reflect changes in our services or to comply with new legal requirements. We will notify you of significant changes via email or platform notifications. Continued use of the platform indicates your acceptance of these changes.</p>
                
                    <ul className='secondP'>
                      <li><p><Link to="/terms-of-use"><u>Terms of Use</u></Link></p></li>
                      <li><p><Link to="/privacy-policy"><u>Privacy Policy</u></Link></p></li>
                      <li><p><Link to="/guidelines"><u>Guidelines</u></Link></p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>Contact Us</h4>
                    <p>If you have any questions or concerns regarding our policies or how we handle your data, please feel free to reach out to us at <a href="mailto:angtipokongkwento@gmail.com"><u>angtipokongkwento@gmail.com</u></a> or through our <Link to="/contact-us"><u>contact page</u></Link>.</p>
                
                    <p className='secondP'>We are committed to maintaining a transparent and secure environment for our users, and we welcome any feedback to help improve your experience with Ang Tipo Kong Kwento.</p>
                </div>
        
            </div>
      </div>

      <ScrollToTop isAlternative={true} />
      <Footer isAlternative={true} />
    </>
  )
}

export default OtherPolicies