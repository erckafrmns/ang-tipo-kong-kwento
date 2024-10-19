import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.svg';
import './Navbar.css'; 

const Navbar = ({ scrollToFeatures, scrollToAbout }) => {  
        
    return (    
		<>		 
		<img src={banner} className="banner" alt="Banner" />
        <div id='navbar'>   		
            <div className="logo">
                <Link to="/">
                    <img src={logo} className="logo-image" alt="Logo" />
                </Link>
            </div>
            <div className="inside-navbar">
                <ul>
                    <li>
                        <a href="#features" className="nav-left" onClick={scrollToFeatures}>Features</a>
                    </li>
                    <li>
                        <a href="#about" className="nav-left nav-space" onClick={scrollToAbout}>About Us</a>
                    </li>
                    <li>
                        <Link to="/contact-us" className="nav-right">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/login-signup" className="nav-right">Sign Up/Login</Link>
                    </li>
                </ul>
            </div> 
        </div> 
		</>

    );
}

export default Navbar;
