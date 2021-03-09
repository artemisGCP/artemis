import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Head from './components/navbar/head.jsx';
import Body from './components/router/router.jsx';
import './global.css';

const App = () => {
  return (
    <Router>
      <Head />
      <Body />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('contents'));
