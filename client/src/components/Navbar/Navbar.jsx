import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.svg';
import './Navbar.css';

const Navbar = ({ hideInsideNavbar = false }) => { // Add a prop to control visibility
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
    };

    const handleFeaturesClick = (event) => {
        event.preventDefault();

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => scrollToSection("features"), 100); 
        } else {
            scrollToSection("features");
        }
    };

    const handleAboutClick = (event) => {
        event.preventDefault();

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => scrollToSection("about"), 100); 
        } else {
            scrollToSection("about");
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
                {!hideInsideNavbar && ( // Conditionally render inside-navbar
                    <div className="inside-navbar">
                        <ul>
                            <li>
                                <a href="/" className="nav-left" onClick={handleFeaturesClick}>
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="/" className="nav-left nav-space" onClick={handleAboutClick}>
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
                )}
            </div>
        </>
    );
};

export default Navbar;
