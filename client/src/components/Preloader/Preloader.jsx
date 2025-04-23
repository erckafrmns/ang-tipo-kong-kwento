import React, { useState, useEffect } from "react"; 
import '../Preloader/Preloader.css';  
import '../Preloader/Preloader-vv.css';  
import logo from '../../assets/logo.png'; // Update path to logo if necessary

const Preloader = ({ message }) => { 
    const [randomMessage, setRandomMessage] = useState(""); 
    const [fadeClass, setFadeClass] = useState("fade-in");


    const messages = [
        "Hinahabi ang kuwento ng iyong pangarap",
        "Nililikha ang isang mahiwagang paglalakbay",
        "Isinusulat ang iyong kuwento, isang salita sa bawat saglit",
        "Binubuksan ang mundo ng walang-hanggang imahinasyon",
        "Inaanyaya ang mga tauhang puno ng misteryo",
        "Isinasatitik ang mahika ng bagong daigdig",
        "Binubuhay ang bawat pahina ng iyong kuwento",
        "Ginagapang ang mga salita tungo sa iyong mundo",
        "Dinadala ka sa kaharian ng mga pangarap",
        "Ikinukulay ang mga sinulid ng iyong guni-guni",
        "Pinagbubuo ang iyong salaysay, unti-unting lumalawak",
        "Nilalagom ang mahika sa bawat taludtod",
        "Iginiguhit ang mga ideya bilang engkantadong kuwento",
        "Ipinapanganak ang iyong imahinasyon",
        "Iginagapang ang balangkas ng iyong pantasya",
        "Hinuhubog ang mga mundo mula sa malikhaing diwa",
        "Isinusulat ang simula ng iyong pakikipagsapalaran",
        "Hinuhugot ang inspirasyong nagmumula sa puso",
        "Tinitimpla ang masiglang pampukaw ng damdamin",
        "Nililikha ang kuwentong ikaw lamang ang makakapagsabi",
        "Ibinubunyag ang iyong dakilang obra",
        "Binibigkas ang mga salitang nag-aanyaya ng mahika",
        "Ipinipinta ang mga pangarap gamit ang tinta",
        "Isinasalin ang iyong ideya sa walang-kamatayang kuwento",
        "Tumutuklas sa mga lupain ng di-pa-natutuklas",
        "Nagtatayo ng tulay patungo sa mga mundo ng hiwaga",
        "Lumulubog sa karagatan ng malikhaing pag-iisip"
    ];

    useEffect(() => {
        if (!message) {
            // Set the initial message
            setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);

            const interval = setInterval(() => {
                setFadeClass("fade-out");

                setTimeout(() => {
                    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                    setRandomMessage(randomMessage);

                    // Switch back to fade-in class
                    setFadeClass("fade-in");
                }, 1000); // Match with fade-out animation duration
            }, 10000);

            return () => clearInterval(interval);
        }
    }, [message]);

    return (
        <div className="preloader">
            <p className={`messages ${fadeClass}`}>{message || randomMessage}</p>
            <div className="magic-loader">
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
                <div className="sparkle1"></div>
            </div>
        </div>
    );
};

const DefaultPreloader = () => {
    return (
        <div className="DefaultPreloader">
            <img src={logo} alt="Loading..." className="preloaderLogo" />
        </div>
    );
};

export { Preloader, DefaultPreloader };
