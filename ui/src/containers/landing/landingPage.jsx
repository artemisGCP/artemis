import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './landingPage.css';
import {Carousel} from 'react-responsive-carousel';
import image1 from '../../assets/sample_image.jpg';
import image2 from '../../assets/sample_image2.jpg';
import image3 from '../../assets/sample_image3.jpg';

const ImageCarousel = () => {
        return (
            <Carousel>
                <div className="carousel-container">
                    <img className="carousel-image" src={image1} />
                    <p className="legend">Automated Behavioral Analysis</p>
                </div>
                <div>
                    <img className="carousel-image" src={image2} />
                    <p className="legend">Web application to annotate your videos</p>
                </div>
                <div> 
                    <img className="carousel-image" src={image3} />
                    <p className="legend">Train your Machine Learning model</p>
                </div>
            </Carousel>
        )
    };


const LandingPage = () => {
    return (
        <>
          <div className="header-wrapper">
          <h1 className='header-title'>Automated Animal Behavioral Analysis</h1>
          <button className="launch-app-button">Launch App</button>
        </div>
        <h3>Web application for researchers</h3>
        <div className="image-carousel-div">
        <ImageCarousel />
        </div>
        <div className="info-page">
            <h2 className="info-page-header">Background</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>

            <h2 className="info-page-header">Motivation</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>

            <h2 className="info-page-header">Use Cases</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
        </div>
        <br/>
        <br/>
        </>
    )
};

export default LandingPage;

