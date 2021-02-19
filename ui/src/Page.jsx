import React from 'react';
import NavBarComponent from './components/navbar/navbar.component.jsx';
import FooterContainer from './containers/footer/footer.container.jsx';
import LandingPage from './containers/landing/landingPage.jsx';

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
        <LandingPage />
        <FooterContainer />
      </div>
    )
  }
};

export default Page;