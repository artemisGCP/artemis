import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css';
import {Carousel} from 'react-responsive-carousel';
import image1 from '../../../public/images/sample_image.jpg';
import image2 from '../../../public/images/sample_image2.jpg';
import image3 from '../../../public/images/sample_image3.jpg';

export default class ImageCarousel extends React.Component {
    render() {
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
    }
};  