import { useRef } from "react";
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.png';
import './Navbar.css'; 
import { Link } from 'react-router-dom'; 


const Navbar = ({ scrollToFeatures, scrollToAbout }) => {

	return (
        <>
		<header>
			<img src={banner} className="banner" alt="" />


			<a href="#features" className="nav-left" onClick={scrollToFeatures}>Features</a> 
        	<a href="#about" className="nav-left" onClick={scrollToAbout}>About Us</a>
			
			<Link to="/"><img src={logo} className="logo" alt="Logo"/></Link>
			
			<Link to="/contact-us" className="nav-right">Contact Us</Link>
			<Link to="/login-signup" className="nav-right">Sign Up/Login</Link>
			
		</header>
        </>
	);
}

export default Navbar;