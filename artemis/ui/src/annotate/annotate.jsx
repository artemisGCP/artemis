import React, { useEffect, useState } from 'react';
import './annotate.css';
import resting from '../assets/resting.jpg';
import eating from '../assets/eating.jpg';
import eathand from '../assets/eathand.jpg';
import sniffing from '../assets/sniffing.jpg';
import grooming from '../assets/grooming.jpg';
import hanging from '../assets/hanging.jpg';
import walking from '../assets/walking.jpg';
import drinking from '../assets/drinking.jpg';
import rearing from '../assets/rearing.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css';
import 'reactjs-popup/dist/index.css';

import VideoUpload from './helpers/uploadvideo';
import DeleteBehavior from './helpers/deletebehavior';
import EditAnnotation from './helpers/editannotation';
import AddBehavior from './helpers/addbehavior';
import SaveAnnotation from './helpers/saveannotation';
import VideoPlayer from './dummy/videoplayer';
import ShowInfo from './helpers/showbehaviorinfo';
import Summary from './helpers/summary';
import Progress from './dummy/progressbar';
import SetFps from './helpers/setfps';
import UploadAnnotations from './helpers/uploadannotations';
import { v4 } from 'uuid';

const allKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "a", "s", "d"]

const ann = [
    {behavior: "rest",
start: 4,
end: "6"},
    { behavior: "eat",
    start: 2,
    end: "3"},
    { behavior: "eat",
    start: 10,
    end: "3"},
    { behavior: "eat",
    start: 12,
    end: "3"},
    
]

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
 }

const sorted = ann.sort(sortByProperty("start"));


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

    const [annot, setAnnot] = useState(JSON.parse(localStorage.getItem('annot')) || []);
    const [videoIds, setVideoIds] = useState([]);
    const [prevAnnotations, setPrevAnnotations] = useState([]);
    const [prevBehaviors, setPrevBehaviors] = useState([]);
    const [hover, setHover] = useState(false);
    const [imgSource, setImgSource] = useState('');
    const [videoFilePath, setVideoPath] = useState(JSON.parse(localStorage.getItem('videoUrl')));
    const [videoID, setVideoID] = useState(null);
    const [videoPlayed, setVideoPlayed] = useState(0);
    const [videoPlayedSeconds, setVideoPlayedSeconds] = useState(0);
    const [videoLength, setVideoLength] = useState(0);
    const [currKey, setCurrKey] = useState(null);
    const [currKeyState, setCurrKeyState] = useState(false);
    const [startTime, setStartTime] = useState([0, 0, 0]);
    const [endTime, setEndTime] = useState([0,0,0]);
    const [refresh, setRefresh] = useState();
    const [focusedBehavior, setFocusedBehavior] = useState(null);
    const [saveAnnotate, setSaveAnnotate] = useState('');
    const [currTime, getCurrTime] = useState(-1);
    const [fps, setFps] = useState(null);
    const [fpsSet, fpsIsSet] = useState(false);
    const [videoFrame, setVideoFrame] = useState(null);
    const [play, setPlay] = useState(false);
    const [annotating, setAnnotating] = useState(false);

    useEffect(() => {
        localStorage.setItem("annot", JSON.stringify(annot))
    }, [annot]);

    const processKeyDown = (e) => {
        let checked = false;
        if (e.key === "Delete" || e.key === "Backspace") {
            console.log(e.key);
        }
        else if (!videoFilePath) {
            console.log("no video upload");
        }
        else {
            for (const i in behaviors) {
                if (behaviors[i].key === e.key) {
                    if (currKeyState === false) {
                        // Initial key press
                        console.log('first key"');
                        setStartTime([videoPlayed, videoPlayedSeconds, videoFrame]);
                        setCurrKey(behaviors[i].text);
                        setCurrKeyState(true);
                    }
                    else {
                        // if currKeyState is true, press the same key to stop, 
                        if (behaviors[i].text === currKey) {   
                            console.log("second key, sme key!");
                            setCurrKeyState(false);
                            setCurrKey(null);
                            
                            const newAnnot = {
                                displayName: behaviors[i].text,
                                startTime: startTime[1],
                                endTime: videoPlayedSeconds,
                                training: true,
                                id: v4(),
                            }
                            
                            if (startTime[0] < videoPlayed) {     
                                setAnnot([...annot, newAnnot])
                                console.log(videoPlayedSeconds);
                            }
                            else {
                                setAnnot([...annot, newAnnot])
                                console.log(videoPlayedSeconds);
                               
                            }
                            setRefresh({});
                        }
                        else {
                            // or press another assigned key to start a new one
                            console.log("second key, diff key");
                            setStartTime([videoPlayed, videoPlayedSeconds, videoFrame]);
                            setCurrKeyState(true);
                            setCurrKey(behaviors[i].text);
                            setRefresh({});
                        }
                        checked = true;
                        break;
                    }

                }
            }
        }

    }

    const getMargin = () => {
        let k = 600 * startTime[0] + 15
        return `${k}px`;
    }

    return (
        <div>
            <div className="annotate-container">
                    <div className="upper-container" onClick={() => setFocusedBehavior(null)} onKeyDown={play ? processKeyDown : null}>
                      <div className="helper-container">
                        <div className={currTime > 0 ? "current-time-visible" : "current-time-hidden"}>
                          {`Current Time: ${currTime.toFixed(2)} secs`}
                        </div>
                        <div className="summary">
                        <Summary
                          annot={annot}
                          behaviors={behaviors}
                          
                        />
                        </div>
                        <div className="video-upload" onClick={() => setFocusedBehavior(null)}>
                        <VideoUpload
                          setSaveAnnotate={setSaveAnnotate}
                          setPrevAnnotations={setPrevAnnotations}
                          setPrevBehaviors={setPrevBehaviors}
                          setVideoPath={setVideoPath}
                          setVideoID={setVideoID}
                          setAnnot={setAnnot}
                          setBehaviors={setBehaviors}
                          setVideoIds={setVideoIds}
                          videoIds={videoIds}
                        />
                        </div>
                        <div className="annotation-upload">
                            <UploadAnnotations
                                setAnnot={setAnnot}
                            />
                        </div>
                        <div className="add-behavior">
                        <AddBehavior
                          behaviors={behaviors}
                          initBehaviors={initBehaviors}
                          setBehaviors={setBehaviors}
                          allKeys={allKeys}
                        />
                        </div>
                        <div className="set-fps">
                          <SetFps
                            fps={fps}
                            setFps={setFps}
                            fpsIsSet={fpsIsSet}
                            fpsSet={fpsSet}
                           />
                        </div>
                      </div>
                      <div className="behaviors-container" onClick={() => setFocusedBehavior(null)}>
                      <h4>Active Behaviors</h4>
                    {behaviors.map((behavior) => (
                            <div className="sidebar-container">
                            <div className="delete-button" key={behavior.text}>
                                <DeleteBehavior
                                  behaviors={behaviors}
                                  allKeys={allKeys}
                                  setBehaviors={setBehaviors}
                                  behavior={behavior}
                                  setRefresh={setRefresh}
                                />
                            </div>
                            <div className="dummy-button">
                                <button>{behavior.key}</button>
                            </div>
                            <div className="dummy-button">
                                <button className="annotation-button">{behavior.text}</button>
                            </div> 
                            <div className="show-info">
                                <ShowInfo
                                  setHover={setHover}
                                  hover={hover}
                                  setImgSource={setImgSource}
                                  behavior={behavior}
                                  imgSource={imgSource}
                                />
                            </div>
                            </div>
                        ))}
                    </div>
                    <div className="displayimage">
                        {hover && <img src={imgSource} className="hoverImage"></img>}
                    </div>
                      <div className="video-container">
                         <VideoPlayer
                      setVideoPlayed={setVideoPlayed}
                      setVideoPlayedSeconds={setVideoPlayedSeconds}
                      getCurrTime={getCurrTime}
                      currKeyState={currKeyState}
                      currKey={currKey}
                      startTime={startTime}
                      videoLength={videoLength}
                      setCurrKeyState={setCurrKeyState}
                      setCurrKey={setCurrKey}
                      setFocusedBehavior={setFocusedBehavior}
                      videoFilePath={videoFilePath}
                      setVideoLength={setVideoLength}
                      fps={fps}
                      videoPlayedSeconds={videoPlayedSeconds}
                      setVideoFrame={setVideoFrame}
                      setPlay={setPlay}
                      videoFrame={videoFrame}
                      setAnnot={setAnnot}
                    />
                    </div>
                    </div>
                    <div className="bottom-container" onClick={() => setFocusedBehavior(null)}>
                        
                        <div className="annotations" >
                        <div id="annotations-container" className={annot.length > 0 ? "edit-annotation": "edit-annotation-hidden"}>
                        <EditAnnotation
                          setRefresh={setRefresh}
                          setCurrKeyState={setCurrKeyState}
                          setCurrKey={setCurrKey}
                          annot={annot}
                          setAnnot={setAnnot}
                        />
                        </div>
                        <div className="save-warning">
                        <p>Make sure you save your progress as you go! </p>
                        </div>
                        <div className="save-annotation">
                        <SaveAnnotation
                          setSaveAnnotate={setSaveAnnotate}
                          annot={annot}
                          videoID={videoID}
                          saveAnnotate={saveAnnotate}  
                        />
                        </div>
                        <div className="currently-annotating">
                        <p><b>Currently annotating: {currKey}</b></p>
                        </div>
                    </div>
                        
                    
        
                    </div>
            </div>
                
                    
        </div>
        
    );
}

export default Annotate;

//Disable and visibile collapsed html elements

//TODO: 
/*
Button to do intial predictions, so user can correct
Integrate training button into annotation page
*/





