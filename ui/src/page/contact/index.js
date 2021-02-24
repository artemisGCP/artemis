import { Input, Form, Button } from 'antd';
import { InstagramFilled, LinkedinFilled, FacebookFilled, GooglePlusSquareFilled, TwitterSquareFilled, HeartOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './index.css';

const Contact = () => {
  return (
    <div className="contact">
      <div className="page-title ">Contact</div>
      <hr />
      <div className="title">
        We’d <HeartOutlined /> to help!
      </div>
      <div className="sub-title">Please fill out and submit the form below if you have any questions! </div>
      <div className="box">
        <div className="left">
          <Form>
            <Form.Item>
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <Input.TextArea style={{ height: 80 }} placeholder="Message" />
            </Form.Item>
            <Form.Item>
              <Button block>Send</Button>
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
