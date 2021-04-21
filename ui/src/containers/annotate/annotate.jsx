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

import ReactPlayer from 'react-player'
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';

import 'react-input-range/lib/css/index.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { v4 } from 'uuid';

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
        { "text": "resting", "data": [] },
        { "text": "eating", "data": [] },
        { "text": "ETH", "data": [] },
        { "text": "sniffing", "data": [] },
        { "text": "grooming", "data": [] },
        { "text": "hanging", "data": [] },
        { "text": "walking", "data": [] },
        { "text": "drinking", "data": [] },
        { "text": "rearing", "data": [] }
    ])

    const [videoIds, setVideoIds] = useState([]);

    const [bList, setBList] = useState(false);
    const [prevAnnotations, setPrevAnnotations] = useState([]);
    const [prevBehaviors, setPrevBehaviors] = useState([]);

    const [hover, setHover] = useState(false);
    const [imgSource, setImgSource] = useState('');
    const displayImage = (behavior) => (event) => {
        console.log("display image");
        setHover(!hover);
        setImgSource(behavior.img);
    }

    const [videoFilePath, setVideoPath] = useState(null);
    const [videoID, setVideoID] = useState(null);
    const handleVideoUpload = (event) => {
        setSaveAnnotate('');
        setPrevAnnotations(annotations);
        setPrevBehaviors(behaviors);
        setVideoPath(URL.createObjectURL(event.target.files[0]));
        // console.log(event.target.files[0].name);
        console.log("videoFilePath: ", videoFilePath);
        setVideoID(event.target.files[0].name);
        const name = event.target.files[0].name;
        console.log("target files: ", event.target.files);
        console.log("setvideo id: ", event.target.files[0].name);
        console.log("video id is: ", videoID);
        console.log("videoIDSSSSS:", videoIds);

        setAnnotations([
            { "text": "resting", "data": [] },
            { "text": "eating", "data": [] },
            { "text": "ETH", "data": [] },
            { "text": "sniffing", "data": [] },
            { "text": "grooming", "data": [] },
            { "text": "hanging", "data": [] },
            { "text": "walking", "data": [] },
            { "text": "drinking", "data": [] },
            { "text": "rearing", "data": [] }
        ]);
        setBehaviors([{ "text": "resting", "color": "purple", "img": resting, "key": "1" },
        { "text": "eating", "color": "red", "img": eating, "key": "2" },
        { "text": "ETH", "color": "yellow", "img": eathand, "key": "3" },
        { "text": "sniffing", "color": "green", "img": sniffing, "key": "4" },
        { "text": "grooming", "color": "blue", "img": grooming, "key": "5" },
        { "text": "hanging", "color": "orange", "img": hanging, "key": "6" },
        { "text": "walking", "color": "pink", "img": walking, "key": "7" },
        { "text": "drinking", "color": "maroon", "img": drinking, "key": "8" },
        { "text": "rearing", "color": "violet", "img": rearing, "key": "9" }]);

        if (videoIds.includes(event.target.files[0].name)) {
            if (confirm("This video has already been loaded. Want to re-load your annotations?")) {
                console.log("Video re-loaded");
                setAnnotations(prevAnnotations);
                setBehaviors(prevBehaviors);
            }
            else {
                console.log("new video loaded");
            }
        }

    };

    const [videoPlayed, setVideoPlayed] = useState(0);
    const [videoPlayedSeconds, setVideoPlayedSeconds] = useState(0);
    const handleVideoPlayed = (value) => {
        setVideoPlayed(value.played);
        setVideoPlayedSeconds(value.playedSeconds);

        getCurrTime(value.playedSeconds);
        console.log(value);
        console.log(videoPlayed, videoPlayedSeconds)
    };

    const allKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "q", "w", "e", "r", "a", "s", "d"]

    const deleteBehavior = (behavior) => async (event) => {
        console.log("delete behavior");
        // console.log(behavior);
        if (confirm('Are you sure you want to delete this behavior?')) {
            // Save it!
            console.log('Thing was deleted from the behavior list.');


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
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }

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

    // const pressOne = useKeyPress('a');
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
    const [refresh, setRefresh] = useState();
    const handleVideoEnd = async (a) => {
        if (currKeyState === true) {
            // await setEndTime([videoPlayed, videoPlayedSeconds]);
            await annotations[getIndex(currKey)].data.push([startTime, [1, videoLength]]);
            // axios.post('/annotation', {
            //     videoID: videoID,
            //     behavior: annotations[getIndex(currKey)].text,
            //     start: startTime[1],
            //     end: videoLength
            // }).then(res => {
            //     console.log(res);
            // })
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
                        console.log("initial press")
                        console.log(videoPlayedSeconds);
                        setStartTime([videoPlayed, videoPlayedSeconds]);
                        // setEndTime([videoPlayed, videoPlayedSeconds]);
                        setCurrKey(behaviors[i].text);
                        setCurrKeyState(true);
                    }
                    else {
                        // if currKeyState is true, press the same key to stop, 
                        if (behaviors[i].text === currKey) {
                            console.log("same key press")
                            console.log(`${videoPlayedSeconds}`);

                            // setEndTime([videoPlayed, videoPlayedSeconds]);
                            setCurrKeyState(false);
                            setCurrKey(null);
                            if (startTime[0] < videoPlayed) {
                                annotations[i].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                            }
                            else {
                                annotations[i].data.push([[videoPlayed, videoPlayedSeconds], startTime]);
                            }


                            setAnnotations(annotations);
                            console.log(annotations);
                            setRefresh({});
                        }
                        else {
                            // or press another assigned key to start a new one
                            console.log("not same key press")
                            console.log(videoPlayedSeconds);

                            if (startTime[0] < videoPlayed) {
                                annotations[getIndex(currKey)].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                            }
                            else {
                                annotations[getIndex(currKey)].data.push([[videoPlayed, videoPlayedSeconds], startTime]);
                            }

                            setAnnotations(annotations);
                            setCurrKey(behaviors[i].text);
                            setStartTime([videoPlayed, videoPlayedSeconds]);
                            console.log(annotations);
                            setRefresh({});
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
                    if (startTime[0] < videoPlayed) {
                        annotations[getIndex(currKey)].data.push([startTime, [videoPlayed, videoPlayedSeconds]]);
                    }
                    else {
                        annotations[getIndex(currKey)].data.push([[videoPlayed, videoPlayedSeconds], startTime]);
                    }
                    setAnnotations(annotations);
                    setCurrKeyState(false);
                    setCurrKey(null);
                    console.log(annotations);
                    setRefresh({});
                }
            }
        }

    }

    const [summary, setSummary] = useState(false);
    const calculateSummary = (annotation) => {
        let totalTime = 0;
        for (const a of annotation.data) {
            totalTime = totalTime + a[1][0] - a[0][0];
        }
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
                d.push(1);

                let f = false;
                let g = [];
                let totalSeg = 0;
                for (let i = 0; i < d.length - 1; i++) {
                    let color = 'danger';
                    if (!f) {
                        color = 'info';
                    }
                    if (i == d.length - 2) {
                        g.push({ behavior: behavior.text, key: i, seg: 100 - totalSeg, show: color });

                    }
                    else {
                        g.push({ behavior: behavior.text, key: i, seg: Math.round((d[i + 1] - d[i]) * 100), show: color });
                        totalSeg += Math.round((d[i + 1] - d[i]) * 100);
                    }
                    f = !f;
                }
                return g;

                // console.log(g)
            }
        }
    }

    const handleAnnotationUpdate = (annotation, d, a, e) => {
        console.log(annotation.text)
        console.log(d)
        console.log(a)
        console.log(e.target.value)
        if (!e.target.value) {
            console.log('empty')
        }
        else {

            for (const anno of annotations) {
                if (anno.text === annotation.text) {
                    for (let b of anno.data) {
                        if (b === d) {
                            console.log("good");
                            let f = parseFloat(e.target.value) / b[1][1] * b[1][0];
                            b[a][1] = parseFloat(e.target.value);
                            b[a][0] = f;
                            console.log(annotation);
                        }
                    }
                    // console.log(g)
                }
            }
            setAnnotations(annotations);
            setRefresh({});
            console.log(currKey);
            console.log(currKeyState);
            setCurrKeyState(false);
            setCurrKey(null);
        }
    }

    const deleteAnnotation = (annotation, d) => {
        console.log(annotation)
        console.log(d)
        // let index = 0
        for (const anno of annotations) {
            if (anno.text === annotation.text) {
                for (const i in anno.data) {
                    if (anno.data[i] == d) {
                        console.log(i);
                        anno.data.splice(i, 1);
                        console.log(anno)
                        break;
                    }
                }
                break;
            }

        }
        console.log(annotations);
        setAnnotations(annotations);
        setRefresh({});
    }

    const [saveAnnotate, setSaveAnnotate] = useState('');

    // axios.defaults.baseURL = "http://localhost:8080"

    const saveAnnotations = () => {
        setSaveAnnotate('saved');
        console.log("saving", saveAnnotate);

        const url = "http://localhost:8080/annotate";
        const config = {
            // method: 'POST',
            // url,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Content-Type': 'application/json'
            },
            params: {
                videoID: videoID,
                annotations: annotations
            }
        }

        axios.post(url, {}, config).then(res => {
            console.log('done');
            console.log("##################: ", res);
            setSaveAnnotate('saved');
        })

    }

    const [currTime, getCurrTime] = useState(-1);

    const getAnnotationLength = () => {
        let i = 0;
        for (const a of annotations) {
            i += a.data.length;
        }
        console.log(i);
        return i;
    }

    const getMargin = () => {
        let k = 600 * startTime[0] + 15
        return `${k}px`;
    }

    return (
        <div>
            <div className="annotate">
                <div className="fill" onClick={() => setFocusedBehavior(null)}></div>
                <div className="annotate1">

                    <div className="fileuploads" onClick={() => setFocusedBehavior(null)}>
                        <Popup trigger={<button>Summary</button>} position="left center">
                            {annotations.map((annotation) => (
                                <div key={v4()}>{annotation.text} : {calculateSummary(annotation)} %</div>
                            ))}
                            <div>total annotated: {totalAnnotation()} %</div>
                        </Popup>
                        <input type="file" name="videoUpload" onChange={handleVideoUpload} onClick={(e) => setVideoIds(videoIds.concat(e.target.files[0].name))} />

                        {!newBehavior && <button onClick={() => setNewBehavior(!newBehavior)}>Add behavior</button>}
                        {newBehavior &&
                            <div>
                                <input type="text" size="12" aria-label='add new behavior' onInput={e => setAddNB(e.target.value)} />
                                <button onClick={addNewBehavior}>Submit</button>
                            </div>
                        }
                    </div>
                    <div className="annotations" onClick={() => setFocusedBehavior(null)}>
                        {behaviors.map((behavior) => (
                            <div className="annotation" key={behavior.text}>
                                <BsFillTrashFill size={20} onClick={deleteBehavior(behavior)} />
                                <button>{behavior.key}</button>
                                {/* <button className="annotation-button" style={{ background: behavior.color }}>{behavior.text}</button> */}
                                <button className="annotation-button">{behavior.text}</button>
                                <BsFillQuestionCircleFill size={20} onMouseOver={displayImage(behavior)} onMouseOut={displayImage(behavior)} />

                            </div>
                        ))}

                    </div>
                    <p><b>Currently annotating: {currKey}</b></p>
                </div>


                <div className="annotate3" onKeyDown={processKeyDown}>
                    <div className="video" onClick={() => setFocusedBehavior(null)}>

                        <ReactPlayer
                            url={videoFilePath}
                            width="100%"
                            height="100%"
                            controls={true}
                            onProgress={(value) => handleVideoPlayed(value)}
                            onEnded={handleVideoEnd}
                            onDuration={(e) => setVideoLength(e)}
                            onPause={(e) => console.log(e)}
                        />

                    </div>
                    <div className="annotations1">
                        {annotations.map((behavior) => (
                            <div className="annotation4">
                                <div className="annotation1" key={behavior.text}>
                                    {/* {currKey==behavior.text && <div style={{ display: "relative", margin: "5px", height: "10px", width: "10px", color: "yellow", zIndex: "100"}}></div>} */}
                                    <ProgressBar>
                                        {handleAnnotation(behavior).map((d) => (
                                            <ProgressBar tabIndex="0" onFocus={() => handleBehaviors(d)} variant={d.show} now={d.seg} key={d.key} onChange={value => console.log(value)} />

                                        ))}
                                    </ProgressBar>
                                </div>
                                
                                    <div style={{ margin: "0", height: "4px", width: "600px", padding: "0" }}>
                                    {currKey == behavior.text && <p style={{ marginLeft: getMargin(), height: "4px", width: "5px", background: "red", padding: "0" }}></p>}
                                </div>
                            </div>

                        ))}

                    </div>
                    <p >.</p>
                    <div className="displayimage">
                        {hover && <img src={imgSource} className="hoverImage"></img>}

                    </div>


                </div>

                <div className="fill" onClick={() => setFocusedBehavior(null)}>

                    <div id="progress">
                        {currTime > 0 && <div className="curr-time">Current Time: {currTime}</div>}
                        {annotations.map((annotation) => (
                            <div id="form-value" key={v4()}>
                                <div >
                                    {annotation.data.map((d) => (
                                        <div key={v4()}>
                                            {/* <form> */}
                                            <label> {annotation.text}: </label>
                                            <input type="number" step="0.1" className="form-input" aria-label='annotation start time' style={{ width: "60px" }} defaultValue={Math.round(d[0][1] * 100) / 100} onChange={(e) => handleAnnotationUpdate(annotation, d, 0, e)} />
                                            <input type="number" step="0.1" className="form-input" aria-label='annotation end time' style={{ width: "60px" }} defaultValue={Math.round(d[1][1] * 100) / 100} onChange={(e) => handleAnnotationUpdate(annotation, d, 1, e)} />
                                            <BsFillTrashFill size={20} onClick={() => deleteAnnotation(annotation, d)} />
                                            {/* </form> */}
                                        </div>
                                    ))}
                                </div>
                            </div>


                        ))}



                        <p>Make sure you save your progress as you go! </p>

                        {getAnnotationLength() > 0 &&
                            <div className="save-button" key={v4()}>

                                <button onClick={() => saveAnnotations()}>save</button>
                                {saveAnnotate && <p>{saveAnnotate}</p>}
                            </div>

                        }

                    </div>
                </div>

            </div>
        </div>

    );
}

export default Annotate;