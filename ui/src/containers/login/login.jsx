import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { googleLogin } from '../../components/auth/googleLogin.js';
import './login.css';

const Login = () => {
  // const history = useHistory();
  // const toLogin = () => {
  //   history.push('/annotate');
  // };
  const goToLogin = () => {
    const res = () => {
      history.push('/');
    };
    const rej = (e) => {
      message.error(e);
    };
    googleLogin(res, rej);
  };

  return (
    <div className="login">
      <div>Welcome back</div>
      <div className="login-title">Login to your Account</div>
      <div>
        <Form layout="vertical">
          {/* <Form.Item name="email" label="Email">
            <Input placeholder="Please enter your email address"></Input>
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="Please enter your password"></Input.Password>
          </Form.Item>
          <Form.Item name="remember">
            <Remember />
          </Form.Item>
          <Form.Item name="login">
            <Button type="primary" block onClick={toLogin}>
              Login now
            </Button>
          </Form.Item>
          <Form.Item name="register">
            <Button type="primary" block>
              Register
            </Button>
          </Form.Item> */}
          <Form.Item name="goToLogin">
            <Button block onClick={goToLogin}>
              <GoogleOutlined />
              Sign-in with google
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// const Remember = ({ value = { checked: true }, onChange }) => {
//   const change = (e) => {
//     onChange({ checked: e.target.checked });
//   };
//   return (
//     <div className="login-remember">
//       <Checkbox checked={value.checked} onChange={change}>
//         Remember me
//       </Checkbox>
//       <a href="/forget">Forgot password?</a>
//     </div>
//   );
// };
export default Login;
