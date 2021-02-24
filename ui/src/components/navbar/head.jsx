import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './head.css';

const Head = () => {
  const [current, setCurrent] = useState('');

  const history = useHistory();
  const handleClick = (e) => {
    setCurrent(e.key);
    history.push(e.key);
  };

  useEffect(() => {
    let init = history.location.pathname;
    if (init === '/') {
      setCurrent('home');
    } else {
      setCurrent(init.substr(1));
    }
  }, [history]);

  return (
    <div className="head">
      <div className="left">
        <img src={logo} height="46px" alt="logo" />
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="annotate">Annotate</Menu.Item>
          <Menu.Item key="train">Train</Menu.Item>
          <Menu.Item key="predict">Predict</Menu.Item>
          <Menu.Item key="results">Results</Menu.Item>
          <Menu.Item key="contact">Contact</Menu.Item>
        </Menu>
      </div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="login">Login</Menu.Item>
      </Menu>
    </div>
  );
};
export default Head;