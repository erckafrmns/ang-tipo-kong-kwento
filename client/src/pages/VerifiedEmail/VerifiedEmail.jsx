import React, { useEffect, useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import verifiedBanner from '../../assets/verified-banner.gif'; 
import errorBanner from '../../assets/error-banner.gif'; // Import the error banner
import Navbar from '../../components/Navbar/Navbar'; 
import './VerifiedEmail.css';

const VerifiedEmail = () => {  
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('Verifying...');
    const [isVerified, setIsVerified] = useState(false); // Track if the email is verified
    const queryParams = new URLSearchParams(location.search); // Get the query parameters from the URL
    const token = queryParams.get('token'); // Retrieve the token from the query string

    useEffect(() => {
        if (token) {
            const verifyEmail = async () => {
                try {
                    // Send a request to the backend to verify the token
                    const response = await fetch(`http://localhost:5000/verify-email/${token}`, {
                        method: 'GET',
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setIsVerified(true);
                        setMessage('Congratulations, your account has been successfully created.');
                    } else {
                        setMessage(data.message || 'Verification failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Error during verification:', error);
                    setMessage('Something went wrong. Please try again later.');
                }
            };

            verifyEmail();
        } else {
            setMessage('Invalid verification link. Please check your email and try again.');
        }
    }, [token]); // This effect will run whenever the token changes (when the component mounts)

    const handleGoToHome = () => {
        // Navigate to "/" and pass state to open the login modal
        navigate('/');
    };

    return (  
        <> 
            <Navbar hideInsideNavbar={true} />
            <div className="verified-email">
                <div className="verified-email-container">
                    {/* Conditionally render the image based on verification status */}
                    <img 
                        src={isVerified ? verifiedBanner : errorBanner} 
                        alt={isVerified ? 'Verified' : 'Error'} 
                        className="verified-image" 
                    />
                    <h1>{isVerified ? 'Success!' : 'Error'}</h1>
                    <p>{message}</p>
                    <button className="continueButton" onClick={handleGoToHome}>Continue</button>
                </div>
            </div>  
        </>
    );
};

export default VerifiedEmail;
