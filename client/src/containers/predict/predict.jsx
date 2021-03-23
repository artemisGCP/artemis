import { useState } from 'react';
import Predict1 from '../../assets/predict.png';
import Predict2 from '../../assets/predict.svg';
import { Button, message, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import './predict.css';

const Predict = () => {
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
      message.warn('Please select video(s) for prediction');
      return;
    }

    if (fileList2.length > 0 && fileList1.length > 0) {
      message.warn('Please select video(s) for prediction');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/results');
    }, 3500);
  };

  return (
    <div className="predict">
      <img src={Predict1} alt="predict1" />
      <img src={Predict2} alt="predict2" className="predict_img2" />

      <div className="predict_btn">
        <Spin spinning={loading}>
          <div className="predict_upload">
            <Upload customRequest={uploadFile} onChange={setList1} multiple={true}>
              <Button icon={<UploadOutlined />}>Video Selection</Button>
            </Upload>

            <Upload customRequest={uploadFile} onChange={setList2} multiple={true}>
              <Button icon={<UploadOutlined />}>Annotation File Selection</Button>
            </Upload>
          </div>
        </Spin>
        <div className="predict_model">
          <Button size="large" type="primary" onClick={trainModel} disabled={loading}>
            Predict
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Predict;
