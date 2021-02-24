import React from 'react';

import { Button, message } from 'antd';
import Slider from 'react-slick';
import slider1 from '../../assets/slider-1.jpg';
import slider2 from '../../assets/slider-2.jpg';
import slider3 from '../../assets/slider-3.jpg';
import slider4 from '../../assets/slider-4.jpg';
import body1 from '../../assets/body-1.jpg';
import body2 from '../../assets/body-2.jpg';
import body3 from '../../assets/body-3.jpg';

import './home.css';

const Home = () => {
  const settings = {
    dots: false,
    adaptiveHeight: true,
  };

  const launch = () => {
    message.success('launch app !');
  };
  return (
    <div className="home">
      <div className="part-1">
        <div>
          <div className="title">AutoPlanet</div>
          <div className="sub-title">A web application for automated animal behavioral analysis</div>
        </div>
        <Button shape="round" className="button" onClick={launch}>
          Launch App
        </Button>
      </div>
      <div className="part-2">
        <Slider {...settings}>
          <img src={slider1} alt="slider1" />
          <img src={slider2} alt="slider2" />
          <img src={slider3} alt="slider3" />
          <img src={slider4} alt="slider4" />
        </Slider>
      </div>
      <div className="part-3">
        <div>
          <span>
            <i>Background</i>
            <p>AutoPlanet provides an efficient next-generation mouse tracker that utilizes machine learning and neural networks to achieve high performance under dynamic and complex environmental conditions with minimal training data. The versatility of this method is demonstrated by analyzing different mouse body parts across various behaviors.</p>
          </span>
          <span>
            <img src={body1} alt="body1" />
          </span>
        </div>
        <div>
          <span>
            <img src={body2} alt="body2" />
          </span>
          <span>
            <i>Motivation</i>
            <p>
              Animal behavior is shaped by natural selection, including all the ways animals interact with other organisms and physical environment. It is hierarchical, dynamic, and high-dimensional. Neural networks are computational models containing multiple spatial processing layers that learn representations of abstracted data. These methods will significantly improve the state-of-the-art behavior recognition, visual object recognition, object detection, and other domains such as drug
              discovery and genomics.
            </p>
          </span>
        </div>
        <div>
          <span>
            <i>Use Cases</i>
            <p>This application is designed for researchers who study mice behavior and want to utilize machine learning techniques, but don't have the skills to code and deploy their own models. By easily recording mice activity and uploading the video to our website, they can get an automated report to facilitate their study.</p>
          </span>
          <span>
            <img src={body3} alt="body3" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
