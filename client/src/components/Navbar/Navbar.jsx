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
     
    const handleLoginSignupClick = (modalType) => {
        if (location.pathname !== "/") {
            navigate("/", { state: { openModal: modalType } });
        } else {
            navigate(location.pathname, { state: { openModal: modalType } });
        }
    };

    return (
        <>
            <img
                src={banner}
                className="banner"
                srcSet={`${banner} 600w, ${banner} 1024w, ${banner} 1440w`}
                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 100vw, 1440px"
                alt=""
            />
            <div id="navbar">
                <div className="logo">
                    <Link to="/">
                    <img
                        src={logo}
                        className="logo-image"
                        srcSet={`${logo} 100w, ${logo} 200w, ${logo} 300w`}
                        sizes="(max-width: 480px) 80px, (max-width: 768px) 100px, 150px"
                        alt=""
                    />
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
            </div>
        </>
    );
};

export default Navbar;
