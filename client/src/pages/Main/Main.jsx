import React from 'react';
import { Link } from 'react-router-dom'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';  
import Footer from '../../components/Footer/Footer';
import frame from '../../assets/frame.svg';
import '../CustomGenerate/Main-Custom.css';   

const Main = () => {
    return (
        <div className="main-container"> 
            <InsideNavbar />

            <section className="customization-container">
                <div className="custom"> 
                    <img src={frame} className="custom-frame" alt="Background" />
                    <Link to="/custom" className="custom-text"><span>Customize Your</span><span>Story</span></Link>
                </div>
                <div className="without-custom"> 
                    <img src={frame} className="without-custom-frame" alt="Background" />
                    <div className="without-custom-text">Generate Without Customization</div>
                </div>
            </section>  

            <Footer isAlternative={true} />
        </div>
    )
}

export default Main;
