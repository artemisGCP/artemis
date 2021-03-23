import { useState } from 'react';
import { Button, message, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import img1 from '../../assets/guide-1.png';
import img2 from '../../assets/guide-2.png';
import './guide.css';

const Guide = () => {
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
      message.warn('Please select one type of local files / database file');
      return;
    }

    if (fileList2.length > 0 && fileList1.length > 0) {
      message.warn('Please select video(s) for prediction');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      history.push('/annotate');
    }, 3500);
  };

  return (
    <div className="guide">
      <div className="page-title">User Guide</div>
      <div className="text-div">This document provides a step-by-step user guide of using this web app.</div>

      <div className="page-title">Use of machine learning in behavior estimation</div>
      <div className="text-div">Machine learning (ML) is a subfield of artificial intelligence (AI). The goal of ML is to make computers learn from the given data. Instead of writing code that describes the action the computer should take, ML provides an algorithm that adapts based on examples of annotated behavior. The trained model, consisting of the algorithm and associated learned parameters, is then used for behavior estimation.</div>
      
      <div className="page-title">Overall web app workflow</div>
      <div className="img">
        <img src={img1} height="300px" />
      </div>

      <div className="page-title">Step 1: Login with a Google account</div>
      <div className="text-div">Click “Login” on upper-right corner of the Home page and sign in with your Google account.</div>
      
      <div className="page-title">Step 2: Upload video &#38; behavior annotation</div>
      <div className="text-div">
        Go to Annotate page, upload a video and indicate behaviors of mice within select timeframe of video by <br />
        1. Utilize the Add Behavior tab to add a custom mice behavior. <br />
        2. Utilize the Summary tab to see the annotations already made. Only a small amount of annotations are needed to train the model. <br />
        3. Utilize the Load new file tab to upload a new video.
      </div>
      <div className="img">
        <img src={img2} height="300px" />
      </div>

      <div className="page-title">Step 3: Model training</div>
      <div className="text-div">
      When training the model, upload annotated video for which you already know the value for your target data attribute (behavior). Run the model to predict those target values for your training data, so that the model can adjust its settings to better fit the data and thus to predict the target value more accurately.
      </div>

      <div className="page-title">Step 4: Behavior prediction</div>
      <div className="text-div">
      When evaluating the trained model, upload video that includes the target data attribute. A downloadable comma-separated values (CSV) file containing the model’s predictions will be generated, which can be used to compare with the actual behavior data and analyzed using appropriate statistical techniques.
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      {/* <h4>Upload a video for annotation to get started!</h4>
      <Spin spinning={loading}>
        <div className="upload">
          <div className="left">
            <p>Option 1. Upload a video from your local files</p>
            <Upload customRequest={uploadFile} onChange={setList1} multiple={true}>
              <Button icon={<UploadOutlined />}>Video Selection</Button>
            </Upload>
          </div>
          <div className="right">
            <p>Option 2. Upload a video from the database</p>
            <Upload customRequest={uploadFile} onChange={setList2} multiple={true}>
              <Button icon={<UploadOutlined />}>Video Selection</Button>
            </Upload>
          </div>
        </div>
        <p className="annotate-video">
          <Button onClick={trainModel} disabled={loading}>
            Annotate Video
          </Button>
        </p>
      </Spin> */}
    </div>
  );
};

export default Guide;
