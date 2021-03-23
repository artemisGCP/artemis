import { useEffect, useState } from 'react';
import { Menu, Dropdown, message } from 'antd';
import axios from 'axios';

let isSignedIn, setIsSignedIn, name, setName;
const Login = () => {
  [isSignedIn, setIsSignedIn] = useState(false);
  [name, setName] = useState('');

  useEffect(() => {
    axios.get('/api/info').then((e) => {
      if (e.data.ok) {
        setName(e.data.name);
        setIsSignedIn(true);
      }
    });
  }, []);

  return isSignedIn ? (
    <Dropdown overlay={Logout}>
      <div style={{ paddingRight: 20, cursor: 'pointer' }}>Welcome, {name}</div>
    </Dropdown>
  ) : (
    <Menu.Item key="login">Login</Menu.Item>
  );
};

const Logout = () => {
  const logout = () => {
    axios.get('/api/logout').finally(() => {
      document.cookie = '';
      message.success('Logout success.');
      window.location.reload();
    });
  };

  return (
    <Menu>
      <Menu.Item onClick={logout}>Logout</Menu.Item>
    </Menu>
  );
};

export { Login, setIsSignedIn, setName };
