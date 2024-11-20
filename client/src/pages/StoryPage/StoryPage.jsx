import React, { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { useLocation } from "react-router-dom"; 
import InsideNavbar from '../../components/Navbar/InsideNavbar';  
import Footer from "../../components/Footer/Footer"; 
import "./StoryPage.css";
 
import Ball from "../../assets/logo-2.svg";
import FrontCover from "../../assets/book-front-cover.png";
import BackCover from "../../assets/book-back-cover.png";
import BackCover1 from "../../assets/book-back-cover1.png";
import LeftPageImg from "../../assets/book-left-page.png";
import RightPageImg from "../../assets/book-right-page.png";

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
        const totalPages = storyPages.length + 4;
        const progressValue = e.data / (totalPages - 1);

        const progressWidth = progressValue === 0 ? 0 : Math.max(3, Math.min(97, progressValue * 100));
        progressBar.style.setProperty("--progress-width", `${progressWidth}%`);
    };

    const handleProgressBarChange = (event) => {
        const totalPages = storyPages.length + 4;
        const progressValue = parseFloat(event.target.value) / 100;

        const progressValueAdjusted = Math.max(0.10, Math.min(0.90, progressValue));
        const newPage = Math.round(progressValueAdjusted * (totalPages - 1));

        bookRef.current.pageFlip().turnToPage(newPage);

        const progressWidth = progressValueAdjusted * 100;
        event.target.style.setProperty("--progress-width", `${progressWidth}%`);
    };

    return (
        <>
            {loading && (
                <div className="preloader">
                    <h1>Loading your story...</h1>
                    <div className="spinner"></div>
                </div>
            )}
            <div className="storyContainer">
                <InsideNavbar />
                <section className="story-page-container">
                    {!loading && (
                        <>
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

