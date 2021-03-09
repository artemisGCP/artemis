import { useState } from 'react';
import { Button, message, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import train from '../../assets/train.jpg';
import './train.css';
import { useHistory } from 'react-router';

const Train = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  let fileList1 = [];
  let fileList2 = [];

  const uploadFile = (e) => {
    e.onSuccess();
  };
  const setList1 = (e) => {
    fileList1 = e.fileList;
  };

  const setList2 = (e) => {
    fileList2 = e.fileList;
  };

  const trainModel = () => {
    if (fileList2.length === 0 && fileList1.length === 0) {
      message.warn('Please upload one video at a time.');
      return;
    }

    if (fileList2.length > 0 && fileList1.length > 0) {
      message.warn('Please upload one video at a time.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/results');
    }, 3500);
  };

  return (
    <div className="train">
      <div className="train_bg">
        <img src={train} alt="img" />
      </div>

      <Spin spinning={loading}>
        <div className="train_uplaod">
          <Upload customRequest={uploadFile} onChange={setList1} multiple={true}>
            <Button icon={<UploadOutlined />}>Video Selection</Button>
          </Upload>

          <Upload customRequest={uploadFile} onChange={setList2} multiple={true}>
            <Button icon={<UploadOutlined />}>Annotation File Selection</Button>
          </Upload>
        </div>
      </Spin>

      <div className="train_model">
        <Button size="large" type="primary" onClick={trainModel} disabled={loading}>
          Train Model
        </Button>
      </div>
    </div>
  );
};

export default Train;
