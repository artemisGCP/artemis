import React from 'react';
import { withRouter } from 'react-router-dom';
import Body from './router.js';
import Head from '../src/components/navbar/head.jsx';

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