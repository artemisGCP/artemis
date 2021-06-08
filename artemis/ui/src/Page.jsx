import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Body from './router.js';
import Head from './navbar/head';
import Home from './home/home.jsx';

import './global.css';

function Page () {
    
      return (
        <>
          <Head />
          <Body />
        </>
      )
    }



export default withRouter(Page);