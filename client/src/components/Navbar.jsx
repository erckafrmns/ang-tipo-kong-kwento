import { useRef } from "react";
import logo from '../assets/logo.png';
import rightVine from '../assets/right-vine.png';
import leftVine from '../assets/left-vine.png';
import { FaBars, FaTimes } from "react-icons/fa";
import "./css/Navbar.css";


const Navbar = () => {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
        <>
		<header>
			<img src={leftVine} className="leftVine" alt="" />
			<img src={logo} className="logo" alt="Logo" />
			<nav ref={navRef}>
				<a href="/#">Services</a>
				<a href="/#">About Us</a>
				<a href="/#">Contact</a>
				<a href="/#">Sign Up/Login</a>
				<button className="nav-btn nav-close-btn" onClick={showNavbar}><FaTimes /></button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}><FaBars /></button>
			<img src={rightVine} className="rightVine" alt="" />
		</header>
        </>
	);
}

export default Navbar;