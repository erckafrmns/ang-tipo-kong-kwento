import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import Sidebar from '../Sidebar/Sidebar';  
import { TbLayoutSidebarInactive } from "react-icons/tb";  
import { FaBars } from "react-icons/fa";
import { MdOutlineHistoryEdu } from "react-icons/md";
import './Navbar.css';  
import '../Sidebar/Sidebar.css';

const InsideNavbar = () => {
	const navRef = useRef();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();

	const showNavbar = () => {
	  navRef.current.classList.toggle("responsive_nav");
	};

	const toggleSidebar = () => {
	  setIsSidebarOpen(!isSidebarOpen);
	};

	const handleOutsideNewClick = () => {
	  navigate('/main'); // Redirect to Main page
	};

	return (
        <>
            <header>
                <img src={logo} className="logo" alt="Logo" />
                <nav ref={navRef}><a href="/#">Logout</a></nav> 
                <button className="nav-btn" onClick={showNavbar}><FaBars /></button>
                {/* whats this for? i removed the vines */}
            </header> 

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />  

            {/* Button container for open and outside new buttons */}
            <div className={`button-container ${isSidebarOpen ? 'hidden' : ''}`}>
                {/* Container for the open button */}
                <div className="open-btn-container">
					<button
						className={`open-btn ${isSidebarOpen ? 'hidden' : ''}`}
						onClick={toggleSidebar}
					>
						<TbLayoutSidebarInactive />
					</button>
				</div>

                {/* Text in between the buttons */}
                <span className="between-text">Ang Ibong Adarna</span>

                {/* Container for the outside new button */}
                <div className="outside-btn-container">
                    <button className="outside-new-btn" onClick={handleOutsideNewClick}>
                        <MdOutlineHistoryEdu />
                    </button>
                </div>
            </div>
        </>
    );
};
  
export default InsideNavbar;
