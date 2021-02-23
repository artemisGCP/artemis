import { Button, message } from 'antd';
import Slider from 'react-slick';
import slider1 from '../../static/slider-1.png';
import './index.css';

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
          <img src={slider1} alt="1" />
          <img src={slider1} alt="2" />
        </Slider>
      </div>
      <div className="part-3">
        <div>
          <span>
            <i>Background</i>
            AutoPlanet provides an efficient next-generation mouse tracker that utilizes machine learning and neural networks to achieve high performance under dynamic and complex environmental conditions with minimal training data.
            <br />
            The versatility of this method is demonstrated by analyzing different mouse body parts across various behaviors.
          </span>
          <span>pic 1</span>
        </div>
        <div>
          <span>pic 2</span>
          <span>
            <i>Motivation</i>
            Animal behavior is shaped by natural selection, including all the ways animals interact with other organisms and physical environment. <br />
            It is hierarchical, dynamic, and high-dimensional. <br />
            Neural networks are computational models containing multiple spatial processing layers that learn representations of abstracted data. <br />
            These methods will significantly improve the state-of-the-art behavior recognition, visual object recognition, object detection, and other domains such as drug discovery and genomics.
          </span>
        </div>
        <div>
          <span>
            <i>Use Cases</i>This application is designed for researchers who study mice behavior and want to utilize machine learning techniques, but don't have the skills to code and deploy their own models.
            <br />
            By easily recording mice activity and uploading the video to our website, they can get an automated report to facilitate their study.
          </span>
          <span>pic-3</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
