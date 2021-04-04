import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Login } from './login.jsx';
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
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="guide">User Guide</Menu.Item>
          <Menu.Item key="annotate">Annotate</Menu.Item>
          <Menu.Item key="train">Train</Menu.Item>
          <Menu.Item key="predict">Predict</Menu.Item>
          <Menu.Item key="results">Results</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
        </Menu>
      </div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        {Login()}
      </Menu>
    </div>
  );
};
export default Head;
