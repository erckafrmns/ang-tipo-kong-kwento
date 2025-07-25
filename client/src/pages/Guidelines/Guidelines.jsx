import React, {useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar';  
import InsideNavbar from '../../components/Navbar/InsideNavbar';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';  
import Footer from '../../components/Footer/Footer';
import '../TermsOfUse/TermsOfUse.css'

const Guidelines = () => { 
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []); 

  const isLoggedIn = localStorage.getItem('authToken'); 
  
  return (
    <> 
      {isLoggedIn ? <InsideNavbar /> : <Navbar />}
      <div className='termsandpolicies'>

            <div className='container-bot'>
                <h1>Guidelines for using 'Ang tipo kong Kwento'</h1>

                <div className='bot-item'>
                    <h4>About</h4>
                    <p>Ang Tipo Kong Kwento is an AI-based story generation platform designed for Filipino children. We aim to provide a creative, educational, and safe environment for young readers, parents, and educators. To ensure a positive experience for all users, we ask that you follow these guidelines when using our platform.</p>
                </div>
                
                <div className='bot-item'>
                    <h4>1. Respectful and Positive Engagement</h4>
                    <p>Our platform is designed to foster creativity and a love for reading through AI-generated stories. We expect all users, including children and parents, to engage respectfully with the platform and other users. This means:</p>
                  
                    <ul className='secondP'>
                      <li><p>Using the platform for its intended purpose of story generation.</p></li>
                      <li><p>Refraining from submitting inappropriate, offensive, or harmful content for customization.</p></li>
                      <li><p>Promoting a positive and supportive environment for all users.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>2. Parental Supervision and Responsibility</h4>
                    <p>As our platform is designed for minors, parental supervision is required for children under the age of 18. Parents or guardians are responsible for:</p>
                
                    <ul className='secondP'>
                      <li><p>Creating accounts for their children and managing their child’s interaction with the platform.</p></li>
                      <li><p>Monitoring the content generated by the AI to ensure that it aligns with their values and expectations.</p></li>
                      <li><p>Assisting their children in understanding the stories and engaging with the moral lessons presented.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>3. Safe Use of Personal Information</h4>
                    <p>We prioritize user privacy, particularly for children. To ensure the safety of your personal information:</p>
                
                    <ul className='secondP'> 
                      <li><p>Do not share any personal information, such as full names, addresses, or contact details in public forums or within story content.</p></li>
                      <li><p>Parents should ensure that their children understand the importance of keeping personal information private when using any online platform, including Ang Tipo Kong Kwento.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>4. Appropriate Use of Story Customization</h4>
                    <p>Ang Tipo Kong Kwento offers a variety of customization options for generating personalized stories. When customizing stories, users should:</p>
                
                    <ul className='secondP'>
                      <li><p>Select themes, characters, and moral lessons that are appropriate for young readers.</p></li>
                      <li><p>Avoid inputs that promote violence, discrimination, or any harmful behavior.</p></li>
                      <li><p>Use the platform’s tools to explore Filipino culture, values, and educational content in a respectful manner.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>5. Content Moderation</h4>
                    <p>While our AI strives to generate child-friendly and appropriate content, there may be instances where the content does not meet user expectations. In such cases:</p>
                
                    <ul className='secondP'>
                      <li><p>Report any story that contains inappropriate or culturally insensitive material by contacting our <Link to="/contact-us"><u>support team</u></Link></p></li>
                      <li><p>Parents are encouraged to review all generated stories and engage with their children to discuss any content that may require further explanation.</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>6. Usage Limits</h4>
                    <p>Our platform is designed to offer unlimited creativity, but for optimal performance:</p>
                
                    <ul className='secondP'>
                      <li><p>Avoid overloading the system with excessive story generation requests in a short time.</p></li>
                      <li><p>Give the platform time to generate high-quality stories and refrain from refreshing or repeatedly submitting the same request</p></li>
                    </ul>
                </div>

                <div className='bot-item'>
                    <h4>7. Reporting Issues</h4>
                    <p>If you encounter any technical issues, inappropriate content, or concerns regarding privacy, please report them immediately. You can reach us at <a href="mailto:angtipokongkwento@gmail.com"><u>angtipokongkwento@gmail.com</u></a> or through the platform’s  <Link to="/contact-us"><u>contact page</u></Link>.</p>
                
                    <ul className='secondP'>
                      <li><p>Our team is committed to ensuring a safe and enjoyable experience for all users and will respond to issues in a timely manner.</p></li>
                    </ul>
                </div>


                <div className='bot-item'>
                    <h4>8. Educational Use</h4>
                    <p>Ang Tipo Kong Kwento is not only a story writing tool but also an educational resource. Educators and parents can use the platform to:</p>
                
                    <ul className='secondP'>
                      <li><p>Encourage language learning and literacy in Tagalog.</p></li>
                      <li><p>Teach moral lessons through culturally relevant stories.</p></li>
                      <li><p>Support classroom discussions and reading exercises based on the stories generated by the AI.</p></li>
                    </ul>
                </div>


                <div className='bot-item'>
                    <h4>9. Account Security</h4>
                    <p>To maintain the security of your account:</p>

                    <ul className='secondP'>
                      <li><p>Choose a strong password and keep it confidential.</p></li>
                      <li><p>Parents should manage their child’s account settings and ensure they log out after each session, especially when using shared devices.</p></li>
                      <li><p>Report any suspicious activity or unauthorized access to our <Link to="/contact-us"><u>support team</u></Link> immediately</p></li>
                    </ul>
                </div>


                <div className='bot-item'>
                    <h4>10. Respect for Intellectual Property</h4>
                    <p>All content generated by Ang Tipo Kong Kwento is protected under intellectual property laws. Users may:</p>

                    <ul className='secondP'>
                      <li><p>Share stories generated for personal or educational use.</p></li>
                      <li><p>Refrain from reproducing, distributing, or selling the content for commercial purposes without prior permission from Ang Tipo Kong Kwento.</p></li>
                    </ul>
                </div>


                <div className='bot-item'>
                    <h4>11. Positive Use of the Platforms</h4>
                    <p>The main goal of Ang Tipo Kong Kwento is to encourage a love for reading and creative writing in Filipino children. Please use the platform responsibly and creatively, ensuring that the generated stories enrich your child's reading experience.</p>

                    <p className='secondP'>By adhering to these guidelines, you help create a safe, respectful, and enjoyable platform for everyone. We hope you and your child enjoy using Ang Tipo Kong Kwento and foster a lifelong love for reading.</p>
                
                    <p className='secondP'>If you have any questions or need further assistance, please contact us at <a href="mailto:angtipokongkwento@gmail.com"><u>angtipokongkwento@gmail.com</u></a>.</p>
                </div>
        
            </div>
      </div> 
      <ScrollToTop isAlternative={true} />
      <Footer isAlternative={true} />
    </>
  )
}

export default Guidelines