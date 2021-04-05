import React from 'react';
import { Input, Form, Button, message } from 'antd';
import { InstagramFilled, LinkedinFilled, FacebookFilled, GooglePlusSquareFilled, TwitterSquareFilled, HeartOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './contact.css';

const Contact = () => {

  const sendthru = () => {
    if (document.getElementById('name').value === '' || document.getElementById('email').value === '' || document.getElementById('msg').value === '') {
      message.warning('Please fill in all the fields.');
    } else {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('msg').value = '';
      message.success('Your message has been sent!');
    }
  };

  return (
    <div className="contact">
      <div className="page-title">Contact</div>
      <div className="title">
        We’d <HeartOutlined /> to help!
      </div>
      <div className="sub-title">Please fill out and submit the form below if you have any questions! </div>
      <div className="box">
        <div className="left">
          <Form>
            <Form.Item>
              <Input.TextArea id="name" placeholder="Your Name" />
            </Form.Item>
            <Form.Item>
              <Input.TextArea id="email" placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Input.TextArea id="msg" style={{ height: 80 }} placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button block onClick={sendthru}>Send</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="right">
          <div>
            <div className="a1">
              <EnvironmentOutlined className="icon" />
              <span className="info">
                <span className="t">AutoPlanet</span>
                <span className="sub-t">Providence, RI</span>
              </span>
            </div>
            <div className="a">
              <PhoneOutlined rotate={90} />
              <span className="info">(401) 863-1000</span>
            </div>
            <div className="a">
              <MailOutlined />
              <span className="info">contact@autoplanet.com</span>
            </div>
          </div>
          <div className="hr"></div>
          <div className="media">
            <FacebookFilled />
            <InstagramFilled />
            <TwitterSquareFilled />
            <GooglePlusSquareFilled />
            <LinkedinFilled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
