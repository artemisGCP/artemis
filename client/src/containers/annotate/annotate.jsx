import React, { useState } from 'react';
import { Button, Tooltip, Upload } from 'antd';
import { QuestionCircleOutlined, CloseSquareOutlined } from '@ant-design/icons';
import './annotate.css';

const Detail = ({ title, img, description }) => {
  const [show, setShow] = useState(false);
  const tip = () => {
    return (
      <div className="annotate_tip">
        <div className="annotate_tip_img">
          <img src={img} alt="img" />
        </div>
        <div className="annotate_tip_description" title={description}>
          {description}
        </div>
        <div
          className="annotate_tip_x"
          onClick={() => {
            setShow(false);
          }}
        >
          <CloseSquareOutlined />
        </div>
      </div>
    );
  };

  const onVisibleChange = (e) => {
    setShow(e);
  };
  return (
    <div className="annotate_detail">
      <div>{title}</div>
      <Tooltip placement="topRight" title={tip} trigger={['click']} visible={show} onVisibleChange={onVisibleChange}>
        <QuestionCircleOutlined />
      </Tooltip>
    </div>
  );
};

const titleList = ['resting', 'eating', 'ETH', 'sniffing', 'grooming', 'hanging', 'walking', 'drinking', 'rearing'];
const description = [
  'the most common posture that mice use to sleep is twisting themselves into a circle.',
  'mice grab food using their forepaws or pointed teeth, and eat by chewing or swallowing in whole.',
  'mice eat their hands for a wide variety of reasons, such as allergies, boredom and parasite infestation.',
  'rhythmic inhalation and exhalation of air through the nose.',
  'usually in a sitting position, mice lick their fur, groom with the forepaws, or scratch with any limb.',
  'an event where mice climb onto the lid and suspend themselves off the floor.',
  'when walking, a mouse’s body is supported at all times by three feet on the ground, which form a triangle.',
  'drinking is when mice lap or take up the water with their tongues to digest food and stay hydrated.',
  'mice put their weight on hind legs, raise forelimbs from the ground and extend their head upwards.',
];
const img = ['resting.png', 'eating.jpg', 'ETH.png', 'sniffing.png', 'grooming.jpg', 'hanging.png', 'walking.png', 'drinking.jpg', 'rearing.jpg'];
const Annotate = () => {
  const [list, setList] = useState([]);

  useState(() => {
    let e = [];
    for (let i = 0; i < 9; i += 1) {
      e.push(<Detail key={i} img={'../assets/annotate/' + img[i]} title={titleList[i]} description={description[i]} />);
    }

    setList(e);
  }, []);

  return (
    <div className="annotate">
      <div className="annotate_play">
        <Upload>
          <Button size="small">File Upload</Button>
        </Upload>
      </div>
      <div className="annotate_list">{list}</div>
    </div>
  );
};

export default Annotate;
