import React from 'react';
import { Link } from 'react-router-dom'; 
import InsideNavbar from '../../components/Navbar/InsideNavbar'; 
import frame from '../../assets/frame.svg';
import '../CustomGenerate/Main-Custom.css';  

const Main = () => {
    return (
        <div>
            <InsideNavbar />

            {/*             <img src={frame} className="frame" alt="Background" />*/}
            <div className="customization-container">
                <div className="custom"> 
                    <img src={frame} className="custom-frame" alt="Background" />
                    <Link to="/custom" className="custom-text"><span>Customize Your</span><span>Story</span></Link>
                </div>
                <div className="without-custom"> 
                    <img src={frame} className="without-custom-frame" alt="Background" />
                    <div className="without-custom-text">Generate Without Customization</div>
                </div>
            </div>
        </div>
    );
};

export default Main;
