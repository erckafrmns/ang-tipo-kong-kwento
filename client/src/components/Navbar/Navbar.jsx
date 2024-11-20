import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.svg';
import './Navbar.css';

const Navbar = ({ scrollToFeatures, scrollToAbout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Handle "Features" link click
    const handleFeaturesClick = (event) => {
        event.preventDefault();

        if (location.pathname !== "/") {
            // Navigate to "/" if not already there, then scroll to the features section
            navigate("/");
            setTimeout(() => {
                // Ensure the page has loaded before scrolling
                scrollToFeatures(event);  // Call the passed function
            }, 100); // Slight delay to ensure navigation completes
        } else {
            // If already on "/", just scroll to features
            scrollToFeatures(event);  // Call the passed function
        }
    };

    return (
        <>		 
        <img src={banner} className="banner" alt="Banner" />
        <div id="navbar">   		
            <div className="logo">
                <Link to="/">
                    <img src={logo} className="logo-image" alt="Logo" />
                </Link>
            </div>
            <div className="inside-navbar">
                <ul>
                    <li>
                        <a href="/" className="nav-left" onClick={handleFeaturesClick}>
                            Features
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="nav-left nav-space" onClick={scrollToAbout}>
                            About Us
                        </a>
                    </li>
                    <li>
                        <Link to="/contact-us" className="nav-right">
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link to="/login-signup" className="nav-right">
                            Sign Up/Login
                        </Link>
                    </li>
                </ul>
            </div> 
        </div> 
        </>
    );
};

export default Navbar;
