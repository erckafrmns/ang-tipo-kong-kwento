import React, {useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from '../../components/Navbar/Navbar'; 
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';  
import Footer from '../../components/Footer/Footer';
import './TermsOfUse.css'

const TermsOfUse = () => {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);
  
  return (
    <> 
    <Navbar/>
        <div className='termsandpolicies'>

            <div className='container-bot'>
                <h1>Terms of use</h1>
                <p className='effectivity'><strong>Effective Date:</strong> October 17, 2024</p>
                <p>Welcome to Ang Tipo Kong Kwento, an AI-based platform designed to generate Tagalog stories for children. By accessing or using this platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, as well as any other applicable laws and regulations. If you do not agree to these terms, please discontinue the use of our services.</p>
                
                <div className='bot-item'>
                    <h4>General Conditions</h4>
                    <p>Your use of Ang Tipo Kong Kwento is subject to the terms and conditions set forth herein. These Terms of Use apply to all users of the platform, including visitors, registered users, educators, and parents. We reserve the right to update or modify these terms at any time without prior notice. Continued use of the platform following any changes to the terms will constitute your acceptance of such changes.</p>
                </div>
                
                <div className='bot-item'>
                    <h4>User Eligibility</h4>
                    <p>This platform is intended for individuals who are at least 18 years old. By accessing the services, you represent that you are of legal age to form a binding contract under the laws of the Republic of the Philippines. Minors under 18 years old may only use the platform under the supervision of a parent or legal guardian who agrees to be bound by these Terms of Use.</p>
                </div>

                <div className='bot-item'>
                    <h4>Account Responsibilities</h4>
                    <p>To access certain features, you may be required to create an account and provide accurate, complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. Ang Tipo Kong Kwento shall not be liable for any loss or damage arising from your failure to safeguard your account information.</p>
                </div>

                <div className='bot-item'>
                    <h4>Services Provided</h4>
                    <p>Ang Tipo Kong Kwento offers AI-based story generation services that allow users to create and customize Tagalog stories for children. This includes personalized story generation based on user inputs such as themes, characters, and moral lessons. The platform also provides a feature for saving generated stories for future reading. While every effort is made to ensure that the stories are child-friendly and culturally appropriate, Ang Tipo Kong Kwento makes no guarantees regarding the appropriateness, accuracy, or reliability of the generated content.</p>
                </div>

                <div className='bot-item'>
                    <h4>Intellectual Property Rights</h4>
                    <p>All content provided by Ang Tipo Kong Kwento, including but not limited to the AI-generated stories, platform design, logos, and all related intellectual property, is the exclusive property of Ang Tipo Kong Kwento or its licensors. Users are granted a limited, non-exclusive, and non-transferable right to use the generated stories for personal, non-commercial purposes. Reproduction, distribution, modification, or exploitation of any part of the platform, including the stories, without prior written consent is strictly prohibited.</p>
                </div>

                <div className='bot-item'>
                    <h4>Use of the Platform</h4>
                    <p>By using the platform, you agree to use the services in a lawful manner and refrain from engaging in activities that could harm the platform, its users, or its content. Prohibited activities include, but are not limited to, using the platform for any illegal or unauthorized purpose, attempting to interfere with the platform’s security or functionality, and submitting content that promotes harm, hate, or discrimination.</p>
                
                    <p className='secondP'>You agree that your use of the platform is at your own risk and that Ang Tipo Kong Kwento does not guarantee uninterrupted or error-free operation of the services. Any technical issues that arise will be addressed, but the platform may experience downtime for maintenance or other purposes.</p>
                </div>

                <div className='bot-item'>
                    <h4>Limitation of Liability</h4>
                    <p>Ang Tipo Kong Kwento provides its services on an “as is” basis without any warranties or representations, either express or implied. While we strive to ensure the accuracy and appropriateness of the generated stories, Ang Tipo Kong Kwento disclaims all liability for any errors, omissions, or inaccuracies in the content generated by the platform. Users assume full responsibility for their use of the platform and any reliance on the content provided.</p>
                
                    <p className='secondP'>In no event shall Ang Tipo Kong Kwento, its affiliates, or its licensors be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to damages for loss of data, loss of revenue, or interruption of services, even if we have been advised of the possibility of such damages.</p>
                </div>

                <div className='bot-item'>
                    <h4>Privacy and Data Protection</h4>
                    <p>Your privacy is of utmost importance to us. By using the platform, you agree to our collection and use of personal data as described in our <Link to="/privacy-policy"><u>Privacy Policy</u></Link>. We are committed to protecting the privacy and security of all users in compliance with the Data Privacy Act of 2012 (Republic Act No. 10173). Please review our <Link to="/privacy-policy"><u>Privacy Policy</u></Link> for detailed information on how your personal data is handled.</p>
                </div>


                <div className='bot-item'>
                    <h4>Third-Party Links and Services</h4>
                    <p>The platform may contain links to third-party websites, services, or resources. These third-party services are provided for your convenience and Ang Tipo Kong Kwento does not endorse, control, or assume responsibility for the content or availability of these services. You access third-party links at your own risk and should review the terms and privacy policies applicable to those services.</p>
                </div>


                <div className='bot-item'>
                    <h4>Termination of Use</h4>
                    <p>Ang Tipo Kong Kwento reserves the right to suspend or terminate your access to the platform at any time and for any reason, including but not limited to a violation of these Terms of Use. Upon termination, you will no longer have access to your account or any content saved on the platform. The platform reserves the right to take legal action if necessary to protect its intellectual property, users, and services.</p>
                </div>


                <div className='bot-item'>
                    <h4>Governing Law</h4>
                    <p>These Terms of Use shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising out of or relating to these terms or your use of the platform will be subject to the exclusive jurisdiction of the courts in Metro Manila, Philippines.</p>
                </div>


                <div className='bot-item'>
                    <h4>Contact Information</h4>
                    <p>For any questions, concerns, or inquiries regarding these Terms of Use or the platform, you may contact us at <a href="mailto:angtipokongkwento@gmail.com"><u>angtipokongkwento@gmail.com</u></a> or through our  <Link to="/contact-us"><u>website</u></Link>.</p>
                </div> 
            </div> 
        </div> 

        <ScrollToTop isAlternative={true} />

        <Footer isAlternative={true} />
        </>
  )
}

export default TermsOfUse