import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf"; // Import jsPDF
import InsideNavbar from '../../components/Navbar/InsideNavbar';  
import GuestNavbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer"; 
import "./StoryPage.css";

import Paper from "../../assets/paper-mode.svg";
import FrontCover from "../../assets/book-front-cover.png";
import BackCover from "../../assets/book-back-cover.png";
import BackCover1 from "../../assets/book-back-cover1.png";
import LeftPageImg from "../../assets/book-left-page.png";
import RightPageImg from "../../assets/book-right-page.png"; 

import { TiDocumentText } from "react-icons/ti"; 
import { IoMdDownload } from "react-icons/io"; 
import { VscBook } from "react-icons/vsc";

const Page = React.forwardRef((props, ref) => (
    <div className="page" ref={ref}>
        <div className="page-content">
            <img className="PageImage" src={props.image} alt="Page" />
            {props.content && <div className="page-text">{props.content}</div>}
        </div>
    </div>
));

const StoryPage = () => {
    const location = useLocation();
    const { title = "Generated Story", story = "", loading = false } = location.state || {};
    const [storyPages, setStoryPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaperMode, setIsPaperMode] = useState(false);
    const bookRef = useRef();

    const width = window.innerWidth;
    const flipbookWidth = width >= 640 ? 350 : width / 2 - 5;
    const flipbookHeight = width >= 640 ? 490 : width * 1.3;

    useEffect(() => {
        if (loading) return;

        const cleanTitle = title.includes("[SEP]") ? title.split("[SEP]")[1].trim() : title;
        const cleanStory = story.includes("[SEP]") ? story.split("[SEP]")[1].trim() : story;

        const words = cleanStory.split(" ");
        const wordsPerPage = 50;
        const pages = [];

        for (let i = 0; i < words.length; i += wordsPerPage) {
            pages.push(words.slice(i, i + wordsPerPage).join(" "));
        }

        setStoryPages(pages);
    }, [title, story, loading]);

    const handlePageChange = (e) => {
        setCurrentPage(e.data);

        const progressBar = document.querySelector(".progress-bar");
        const totalPages = storyPages.length + 4; // Including covers
        const progressValue = e.data / (totalPages - 1);

        const progressWidth = progressValue === 0 ? 0 : Math.max(3, Math.min(97, progressValue * 100));
        progressBar.style.setProperty("--progress-width", `${progressWidth}%`);
    };

    const handleProgressBarChange = (event) => {
        const totalPages = storyPages.length + 4; // Including covers
        const progressValue = parseFloat(event.target.value) / 100;

        const progressValueAdjusted = Math.max(0.10, Math.min(0.90, progressValue));
        const newPage = Math.round(progressValueAdjusted * (totalPages - 1));

        bookRef.current.pageFlip().turnToPage(newPage);

        const progressWidth = progressValueAdjusted * 100;
        event.target.style.setProperty("--progress-width", `${progressWidth}%`);
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const cleanTitle = title.includes("[SEP]") ? title.split("[SEP]")[1].trim() : title;
    
        // Set the title
        doc.setFontSize(18);
        doc.setFont("Helvetica", "bold");
        const pageWidth = doc.internal.pageSize.width;
        const titleWidth = doc.getTextWidth(cleanTitle);
        doc.text(cleanTitle, (pageWidth - titleWidth) / 2, 20); // Centered title
    
        // Add the story content
        doc.setFontSize(12);
        doc.setFont("Helvetica", "normal");
        const storyText = story.includes("[SEP]") ? story.split("[SEP]")[1].trim() : story;
    
        const marginLeft = 20; 
        const marginRight = 20; 
        const usableWidth = pageWidth - marginLeft - marginRight;
    
        // Split text into lines with justification
        const lines = doc.splitTextToSize(storyText, usableWidth);
        let yPosition = 40; 
        const smallerLineHeight = doc.getLineHeight() * 0.5; 
    
        lines.forEach((line, index) => {
            const isLastLine = index === lines.length - 1;
    
            if (isLastLine || line.trim().length < usableWidth / 3) {
                // For the last line or short lines, left-align to prevent awkward spacing
                doc.text(line, marginLeft, yPosition);
            } else {
                // Justify the line
                const words = line.split(" ");
                const spaceCount = words.length - 1;
                const textWidth = doc.getTextWidth(line);
                const extraSpace = (usableWidth - textWidth) / spaceCount;
    
                let xPosition = marginLeft;
                words.forEach((word, wordIndex) => {
                    doc.text(word, xPosition, yPosition);
                    if (wordIndex < spaceCount) {
                        xPosition += doc.getTextWidth(word) + extraSpace;
                    }
                });
            }
    
            yPosition += smallerLineHeight;
            if (yPosition > doc.internal.pageSize.height - 20) {
                // Add new page if content exceeds page height
                doc.addPage();
                yPosition = 20;
            }
        });
    
        doc.save(`${cleanTitle}.pdf`);
    };
    
    const isGuest = location.state?.isGuest || false;
    
    return (
        <>
            {loading && (
                <div className="preloader">
                    <h1>Loading your story...</h1>
                    <div className="spinner"></div>
                </div>
            )}
            <div className="storyContainer">
                {isGuest ? <GuestNavbar /> : <InsideNavbar />}
                <section className="story-page-container">
                    {!loading && (
                        <>
                            {!isPaperMode && (
                                <HTMLFlipBook
                                    width={flipbookWidth}
                                    height={flipbookHeight}
                                    maxShadowOpacity={0.2}
                                    showCover={true}
                                    ref={bookRef}
                                    onFlip={handlePageChange}
                                >
                                    <Page image={FrontCover} />
                                    <Page image={BackCover} />
                                    <Page
                                        image={RightPageImg}
                                        content={
                                            <>
                                                <p className="story-subtitle">Ang tipo kong Kwento</p>
                                                <h1 className="story-title">"{title.includes("[SEP]") ? title.split("[SEP]")[1].trim() : title}"</h1>
                                            </>
                                        }
                                    />
                                    <Page image={LeftPageImg} content={storyPages[0]} />
                                    {storyPages.slice(1).map((content, index) => (
                                        <Page
                                            key={index}
                                            image={index % 2 === 0 ? RightPageImg : LeftPageImg}
                                            content={content}
                                        />
                                    ))}
                                    <Page image={BackCover1} />
                                    <Page image={BackCover} />
                                </HTMLFlipBook>
                            )}
                            {isPaperMode && (
                                <div className="paper-mode">
                                    <img src={Paper} alt="Paper Background" className="paper-image" />
                                    <div className="paper-content">
                                        <p className="story-subtitle">Ang tipo kong Kwento</p>
                                        <h1 className="story-title">"{title.includes("[SEP]") ? title.split("[SEP]")[1].trim() : title}"</h1>
                                        <div className="story-text">
                                            {(story.includes("[SEP]") ? story.split("[SEP]")[1].trim() : story)
                                                .split(/(?<=[.!?])\s+/) // Split by sentence boundaries
                                                .map((paragraph, index) => (
                                                    <p key={index} style={{ textIndent: "1.5em", marginBottom: "1em" }}>
                                                        {paragraph}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="progress-bar-container">
                                <input
                                    type="range"
                                    className="progress-bar"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    value={(currentPage / (storyPages.length + 4 - 1)) * 100}
                                    onInput={handleProgressBarChange}
                                    onChange={handleProgressBarChange}
                                />
                                <div className="paper-icon" onClick={() => setIsPaperMode(!isPaperMode)}>
                                    {isPaperMode ? <VscBook /> : <TiDocumentText />}
                                </div>

                                <div className="download-btn" onClick={handleDownloadPDF}>
                                    <IoMdDownload /> 
                                </div>
                            </div>
                        </>
                    )}
                </section>
                <Footer isAlternative={true} />
            </div>
        </>
    );
};

export default StoryPage;
