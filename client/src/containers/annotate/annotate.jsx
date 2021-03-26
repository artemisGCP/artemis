import React, { useState, useEffect } from 'react';
import './annotate.css';
import { BsFillQuestionCircleFill, BsFillTrashFill } from 'react-icons/bs';
import resting from '../../assets/resting.jpg';
import eating from '../../assets/eating.jpg';
import eathand from '../../assets/eathand.jpg';
import sniffing from '../../assets/sniffing.jpg';
import grooming from '../../assets/grooming.jpg';
import hanging from '../../assets/hanging.jpg';
import walking from '../../assets/walking.jpg';
import drinking from '../../assets/drinking.jpg';
import rearing from '../../assets/rearing.jpg';

import ReactPlayer from 'react-player';
import useKeyPress from './useKeyPress.jsx'
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Annotate = () => {

  const [behaviors, setBehaviors] = useState([
      { "text": "resting", "color": "purple", "img": resting, "key": "1" },
      { "text": "eating", "color": "red", "img": eating, "key": "2" },
      { "text": "ETH", "color": "yellow", "img": eathand, "key": "3" },
      { "text": "sniffing", "color": "green", "img": sniffing, "key": "4" },
      { "text": "grooming", "color": "blue", "img": grooming, "key": "5" },
      { "text": "hanging", "color": "orange", "img": hanging, "key": "6" },
      { "text": "walking", "color": "pink", "img": walking, "key": "7" },
      { "text": "drinking", "color": "maroon", "img": drinking, "key": "8" },
      { "text": "rearing", "color": "violet", "img": rearing, "key": "9" }
  ]);

  const initBehaviors = [
      { "text": "resting", "color": "purple", "img": resting, "key": "1" },
      { "text": "eating", "color": "red", "img": eating, "key": "2" },
      { "text": "ETH", "color": "yellow", "img": eathand, "key": "3" },
      { "text": "sniffing", "color": "green", "img": sniffing, "key": "4" },
      { "text": "grooming", "color": "blue", "img": grooming, "key": "5" },
      { "text": "hanging", "color": "orange", "img": hanging, "key": "6" },
      { "text": "walking", "color": "pink", "img": walking, "key": "7" },
      { "text": "drinking", "color": "maroon", "img": drinking, "key": "8" },
      { "text": "rearing", "color": "violet", "img": rearing, "key": "9" }
  ];

  const [annotations, setAnnotations] = useState([
      { "text": "resting", "data": [[[0.6, 6.0], [0.7, 7.0]], [[0.2, 2.0], [0.4, 4.0]]] },
      { "text": "eating", "data": [[[0.4, 4.0], [0.6, 6.0]]] },
      { "text": "ETH", "data": [[[0.0, 0.0], [0.2, 2.0]], [[0.7, 7.0], [1.0, 10.0]]] },
      { "text": "sniffing", "data": [] },
      { "text": "grooming", "data": [] },
      { "text": "hanging", "data": [] },
      { "text": "walking", "data": [] },
      { "text": "drinking", "data": [] },
      { "text": "rearing", "data": [] }
  ])

  const [bList, setBList] = useState(false);

  const [hover, setHover] = useState(false);
  const [imgSource, setImgSource] = useState('');
  const displayImage = (behavior) => (event) => {
      console.log("display image");
      setHover(!hover);
      setImgSource(behavior.img);
  }

  const [videoFilePath, setVideoPath] = useState(null);

  const handleVideoUpload = (event) => {
      setVideoPath(URL.createObjectURL(event.target.files[0]));

  };

  const [videoPlayed, setVideoPlayed] = useState(0);
  const [videoPlayedSeconds, setVideoPlayedSeconds] = useState(0);
  const handleVideoPlayed = (value) => {
      setVideoPlayed(value.played);
      setVideoPlayedSeconds(value.playedSeconds);
      console.log(value);
      console.log(videoPlayed, videoPlayedSeconds)
  };

  const allKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "a", "s", "d"]

  const deleteBehavior = (behavior) => async (event) => {
      console.log("delete behavior");
      // console.log(behavior);
      var index = await behaviors.indexOf(behavior);
      // console.log(index);
      await behaviors.splice(index, 1)
      await annotations.splice(index, 1)
      // console.log(behaviors)
      for (const i in behaviors) {
          behaviors[i].key = allKeys[i];
      }
      await setAnnotations(annotations);
      await setBehaviors(behaviors);
      await setBList(true);
      await setBList(false);

  }

  const [newBehavior, setNewBehavior] = useState(false);
  const [addNB, setAddNB] = useState('');

  const addNewBehavior = async () => {
      // console.log(addNB);
      if (addNB) {
          let inB = false;
          if (behaviors.length > 0) {
              for (const b in behaviors) {
                  if (behaviors[b].text.toLowerCase() === addNB.toLowerCase()) {
                      inB = true;
                  }
              }
          }

          if (inB) {
              setAddNB('');
              console.log('already exist');
          }
          else {
              for (const b in initBehaviors) {
                  if (initBehaviors[b].text.toLowerCase() === addNB.toLowerCase()) {
                      await behaviors.push(initBehaviors[b]);
                      await annotations.push({
                          "text": initBehaviors[b].text, "data": []
                      });
                      inB = true;
                  }
              }
              if (!inB) {
                  await behaviors.push({
                      "text": addNB, "color": "grey", "img": ''
                  });
                  await annotations.push({
                      "text": addNB, "data": []
                  });
              }
              for (const i in behaviors) {
                  behaviors[i].key = allKeys[i];
              }
              await setAnnotations(annotations);
              await setBehaviors(behaviors);
              await setBList(true);
              await setBList(false);
              setAddNB('');
          }
      }
      setNewBehavior(false);
  }

  const pressOne = useKeyPress('a');
  const [videoLength, setVideoLength] = useState(0);

  const [currKey, setCurrKey] = useState(null);
  const [currKeyState, setCurrKeyState] = useState(false);
  const [startTime, setStartTime] = useState([0, 0]);
  // const [endTime, setEndTime] = useState([0, 0]);

  const getIndex = (a) => {
      for (const i in annotations) {
          if (annotations[i].text === a) {
              return i;
          }
      }
  }

  const handleVideoEnd = async (a) => {
      if (currKeyState === true) {
          // await setEndTime([videoPlayed, videoPlayedSeconds]);
          await annotations[getIndex(currKey)].data.push([startTime, [1, videoLength]]);
          axios.post('/annotation', {
              behavior: annotations[getIndex(currKey)].text,
              start: startTime[1],
              end: videoLength
          }).then(res => {
              console.log(res);
          })
          setAnnotations(annotations);
          setCurrKeyState(false);
          setCurrKey(null);
          // console.log(annotations);
          // console.log("video end")
      }
  }
  useEffect(() => {
      console.log('annotation updated');
  }, [annotations])

  const [focusedBehavior, setFocusedBehavior] = useState(null);

  const handleBehaviors = (d) => {
      // console.log(d.key);
      setFocusedBehavior({ behavior: d.behavior, key: d.key })
  }

  const processKeyDown = (e) => {
      // console.log(useKeyPress('a'))
      // console.log(e.key)
      let checked = false;
      if (e.key === "Delete" || e.key === "Backspace") {
          // console.log(e.key);
          if (focusedBehavior) {
              for (let annotation of annotations) {
                  if (annotation.text === focusedBehavior.behavior) {
                      annotation.data = annotation.data.sort(function (a, b) {
                          return a[0][0] - b[0][0];
                      });
                      const index = (focusedBehavior.key - 1) / 2
                      console.log(index);
                      console.log(Number.isInteger(index))

                      if (Number.isInteger(index)) {
                          // console.log(annotation.text)
                          // console.log(annotation.data[index])
                          axios.delete('/annotation', { data: {
                              behavior: annotation.text,
                              start: annotation.data[index][0][1],
                              end: annotation.data[index][1][1]
                          }}).then(res => {
                              console.log(res);
                              
                          })
                          annotation.data.splice(index, 1);
                      }
                  }
              }
              setAnnotations(annotations);
              setFocusedBehavior(null);
          }
      }
      else if (!videoFilePath) {
          console.log("no video upload");
      }
      else {
          for (const i in behaviors) {
              if (behaviors[i].key === e.key) {
                  // console.log(behaviors[i].text)
                  // console.log(videoPlayed)
                  // console.log(annotations)

                  if (currKeyState === false) {
                      // Initial key press
                      console.log("initial press")
                      console.log(videoPlayedSeconds);
                      setStartTime([videoPlayed, videoPlayedSeconds]);
                      // setEndTime([videoPlayed, videoPlayedSeconds]);
                      setCurrKey(behaviors[i].text);
                      setCurrKeyState(true);
                      // console.log(`current key is ${currKey}`);
                      // console.log(`current key is ${e.key}`);

                  }
                  else {
                      // if currKeyState is true, press the same key to stop, 
                      if (behaviors[i].text === currKey) {
                          console.log("same key press")
                          console.log(`${videoPlayedSeconds}`);

                          // setEndTime([videoPlayed, videoPlayedSeconds]);
                          setCurrKeyState(false);
                          setCurrKey(null);
                          annotations[i].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                          axios.post('/annotation', {
                              behavior: annotations[i].text,
                              start: startTime[1],
                              end: videoPlayedSeconds
                          }).then(res => {
                              console.log(res);
                          })
                          // setAnnotations(annotations);

                          setAnnotations(annotations);
                          console.log(annotations);
                      }
                      else {
                          // or press another assigned key to start a new one
                          console.log("not same key press")
                          // console.log(currKey);
                          // console.log(getIndex(currKey));
                          console.log(videoPlayedSeconds);
                          // setEndTime([videoPlayed, videoPlayedSeconds]);

                          // console.log(currKey);
                          // console.log(getIndex(currKey));
                          annotations[getIndex(currKey)].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                          axios.post('/annotation', {
                              behavior: annotations[getIndex(currKey)].text,
                              start: startTime[1],
                              end: videoPlayedSeconds
                          }).then(res => {
                              console.log(res);
                          })
                          setAnnotations(annotations);
                          setCurrKey(behaviors[i].text);
                          setStartTime([videoPlayed, videoPlayedSeconds]);
                          console.log(annotations);
                      }
                      checked = true;
                      break;
                  }

              }
          }
          if (checked === false) {
              // if currKeyState is true, press any key to stop
              if (currKeyState === true) {
                  console.log(videoPlayedSeconds);
                  // setEndTime([videoPlayed, videoPlayedSeconds]);
                  annotations[getIndex(currKey)].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                  axios.post('/annotation', {
                      behavior: annotations[getIndex(currKey)].text,
                      start: startTime[1],
                      end: videoPlayedSeconds
                  }).then(res => {
                      console.log(res);
                  })
                  setAnnotations(annotations);
                  setCurrKeyState(false);
                  setCurrKey(null);
                  console.log(annotations);
              }
          }
      }

  }

  useEffect(() => {
      document.addEventListener("keydown", processKeyDown);
      return () => document.removeEventListener("keydown", processKeyDown);
  }, [processKeyDown]);
  // const [behaviors, setBehaviors] = useState([]);

  const [summary, setSummary] = useState(false);
  // const [totalAnnotation, setTotalAnnotation] = useState(0)

  const calculateSummary = (annotation) => {
      let totalTime = 0;
      for (const a of annotation.data) {
          totalTime = totalTime + a[1][0] - a[0][0];
      }
      // let a = totalAnnotation + totalTime;
      // setTotalAnnotation(a);
      return Math.round(totalTime * 100)
  }

  const totalAnnotation = () => {
      let totalTime = 0;
      for (const annotation of annotations) {
          for (const a of annotation.data) {
              totalTime = totalTime + a[1][0] - a[0][0];
          }
      }
      return Math.round(totalTime * 100);
  }

  const handleAnnotation = (behavior) => {
      for (const annotation of annotations) {
          if (behavior.text === annotation.text) {
              let d = [0]
              let e = []
              let c = annotation.data.sort(function (a, b) {
                  return a[0][0] - b[0][0];
              });
              // console.log(c);
              for (const a of c) {
                  d.push(a[0][0])
                  d.push(a[1][0])
                  e.push(a[0][0])
              }
              // console.log(d);
              // console.log(e);
              d.push(1);

              let f = false;
              let g = [];
              for (let i = 0; i < d.length - 1; i++) {
                  let color = 'danger';
                  if (!f) {
                      color = 'info';
                  }
                  g.push({ behavior: behavior.text, key: i, seg: Math.round((d[i + 1] - d[i]) * 100), show: color });
                  f = !f;
              }
              return g;

              // console.log(g)
          }
      }
  }




  return (
      <div>
          {/* {onkeydown && processKeyDown} */}
          <div className="annotate">
              {/* <div className="m"></div> */}
              <div className="annotate1">

                  <div className="fileuploads">
                      <button onClick={() => setSummary(!summary)}>Summary</button>
                      {summary && <div>
                          {annotations.map((annotation) => (
                              <div>{annotation.text} : {calculateSummary(annotation)} %</div>
                          ))}
                          <div>total annotated: {totalAnnotation()} %</div>
                      </div>}
                      <input type="file" onChange={handleVideoUpload} />
                      {!newBehavior && <button onClick={() => setNewBehavior(!newBehavior)}>Add behavior</button>}
                      {newBehavior &&
                          <div>
                              <input type="text" size="12" onInput={e => setAddNB(e.target.value)} />
                              <button onClick={addNewBehavior}>Submit</button>
                          </div>
                      }
                  </div>
                  <div className="annotations">
                      {behaviors.map((behavior) => (
                          <div className="annotation" key={behavior.text}>
                              <BsFillTrashFill size={20} onClick={deleteBehavior(behavior)} />
                              <button>{behavior.key}</button>
                              <button className="annotation-button" style={{ background: behavior.color }}>{behavior.text}</button>
                              <BsFillQuestionCircleFill size={20} onMouseOver={displayImage(behavior)} onMouseOut={displayImage(behavior)} />

                          </div>
                      ))}
                  </div>
              </div>

              <div className="annotate3">
                  <div className="video">

                      <ReactPlayer
                          // ref={(e) => console.log(e.getDuration())}
                          url={videoFilePath}
                          width="100%"
                          height="100%"
                          controls={true}
                          // onProgress={(value) => setVideoPlayed(value['played'])}
                          onProgress={(value) => handleVideoPlayed(value)}
                          onEnded={handleVideoEnd}
                          onDuration={(e) => setVideoLength(e)}
                      />

                  </div>
                  <div className="annotations1">
                      {behaviors.map((behavior) => (
                          <div className="annotation1" key={behavior.text}>
                              {/* {handleAnnotation(behavior).map((d) => (
                                  <input type="range" min={d[0][0]} max={d[1][0]} step="any"/>
                              ))} */}
                              <ProgressBar>
                                  {handleAnnotation(behavior).map((d) => (
                                      <ProgressBar tabIndex="0" onFocus={() => handleBehaviors(d)} variant={d.show} now={d.seg} key={d.key} />

                                  ))}
                              </ProgressBar>
                          </div>
                      ))}
                  </div>

                  <div className="displayimage">
                      {hover && <img src={imgSource} className="hoverImage"></img>}

                  </div>


              </div>
              {/* <div className="m"></div> */}
          </div>

      </div>

  );
}

export default Annotate;
