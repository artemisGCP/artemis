import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Body from './router';
import Head from './head';

const App = () => {
  return (
    <Router>
      <Head />
      <Body />
    </Router>
  );
};

export default App;
