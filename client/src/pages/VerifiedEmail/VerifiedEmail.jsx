import React, { useEffect, useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import verifiedBanner from '../../assets/verified-banner.gif'; 
import errorBanner from '../../assets/error-banner.gif';
import Navbar from '../../components/Navbar/Navbar'; 
import './VerifiedEmail.css';

const VerifiedEmail = () => {  
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('Verifying...');
    const [isVerified, setIsVerified] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');

    useEffect(() => {
        if (status === 'success') {
            setIsVerified(true);
            setMessage('Congratulations, your account has been successfully created.');
        } else {
            setIsVerified(false);
            setMessage('Verification failed. Please check the link or try again.');
        }
    }, [status]);

    const handleGoToHome = () => {
        navigate('/', { state: { openModal: 'login' } });
    };

    return (  
        <> 
            <Navbar hideInsideNavbar={true} />
            <div className="verified-email">
                <div className="verified-email-container">
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
