import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Login } from '../helpers/login';
import './head.css';

const Head = () => {
  const history = useHistory();
  const [current, setCurrent] = useState('');

  const handleClick = (e) => {
    setCurrent(e.key);
    history.push(e.key);
  };

  const setPath = () => {
    const path = history.location.pathname;
    if (path === '/') {
      setCurrent('home');
    } else {
      setCurrent(path.substr(1));
    }
  };

  useEffect(() => {
    history.listen(() => {
      setPath();
    });
    setPath(); // eslint-disable-next-line
  }, []);

  return (
    <div className="head">
      <div className="left">
        <img src={logo} height="46px" alt="logo" />
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home" tabIndex="0">Home</Menu.Item>
          <Menu.Item key="guide" tabIndex="0">User Guide</Menu.Item>
          <Menu.Item key="annotate" tabIndex="0">Annotate</Menu.Item>
          <Menu.Item key="train" tabIndex="0">Train</Menu.Item>
          <Menu.Item key="predict" tabIndex="0">Predict</Menu.Item>
          <Menu.Item key="results" tabIndex="0">Results</Menu.Item>
          <Menu.Item key="contact" tabIndex="0">Contact</Menu.Item>
          <Menu.Item key="privacy" tabIndex="0">Privacy</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
export default Head;
