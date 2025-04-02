import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Add useState and useEffect
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.svg';
import './Navbar.css';

const Navbar = ({ hideInsideNavbar = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Check if mobile view on component mount and resize
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false); // Close menu after clicking a link
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
     
    const handleLoginSignupClick = (modalType) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { openModal: modalType } });
        } else {
            navigate(location.pathname, { state: { openModal: modalType } });
        }
        setMenuOpen(false); // Close menu after clicking
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                
                {!hideInsideNavbar && (
                    <>
                        {/* Regular navbar for desktop */}
                        {!isMobile && (
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
                                        <Link to="/contact-us" className={`nav-right ${location.pathname === "/contact-us" ? "active" : ""}`}>
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-right" onClick={(e) => { e.preventDefault(); handleLoginSignupClick("signup");}}>
                                            Sign Up/Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        
                        {/* Hamburger menu for mobile */}
                        {isMobile && (
                            <>
                                <button className="hamburger-menu" onClick={toggleMenu}>
                                    <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
                                    <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
                                    <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
                                </button>
                                
                                {/* Mobile menu overlay */}
                                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                                    <ul>
                                    <h1> Ang Tipo kong Kwento</h1>
                                        <li>
                                            <a href="/" className="nav-link" onClick={handleFeaturesClick}>
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/" className="nav-link" onClick={handleAboutClick}>
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="/contact-us" className={`nav-link ${location.pathname === "/contact-us" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); handleLoginSignupClick("signup");}}>
                                                Sign Up/Login
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;