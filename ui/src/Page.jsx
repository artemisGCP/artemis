import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Body from './router.js';
import Head from '../src/components/navbar/head.jsx';
import Home from '../src/containers/home/home.jsx';

import './global.css';

class Page extends React.Component {
    constructor() {
      super();
      this.state = {
        signedUp: false,
        email: '',
        role: '',
      };
    }
  
  
    render() {
      console.log(this.state);
      return (
        <>
          <Head />
          <Body />
        </>
      )
    }
  };


export default withRouter(Page);