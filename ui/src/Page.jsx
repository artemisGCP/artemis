import React from 'react';
import NavBarComponent from './components/navbar/navbar.component.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';
import ImageCarousel from './containers/carousel/carousel.container.jsx';

import './global.css';
import { withRouter } from 'react-router-dom';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }


  render() {
    console.log(this.state);
    return (
      <div>
        <NavBarComponent />
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
        <FooterContainer />
      </div>
    )
  }
};

export default Page;