import { useRef } from "react";
import logo from '../../assets/logo.png';
import banner from '../../assets/banner.png';
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css'; 
import { Link } from 'react-router-dom'; 


const Navbar = () => {
	// const navRef = useRef();

	// const showNavbar = () => {
	// 	navRef.current.classList.toggle(
	// 		"responsive_nav"
	// 	);
	// };

	return (
        <>
		<header>
			<img src={banner} className="banner" alt="" />

			<a href="/#" className="nav-left">Services</a>
			<a href="/#" className="nav-left">About Us</a>
			
			<Link to="/"><img src={logo} className="logo" alt="Logo"/></Link>
			
			<a href="/#" className="nav-right">Contact</a>
			<Link to="/LoSi" className="nav-right">Sign Up/Login</Link>

			{/* <nav ref={navRef}>
				<a href="/#">Services</a>
				<a href="/#">About Us</a>
				<a href="/#">Contact</a>
				<Link to="/LoSi">Sign Up/Login</Link>
				<button className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}><FaBars /></button> */}
		</header>
        </>
	);
}

export default Navbar;