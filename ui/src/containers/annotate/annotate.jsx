import React, { useState } from 'react';
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

import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import { Prompt } from 'react-router'
import { message } from 'antd';


const Annotate = () => {
    const [hover, setHover] = useState(false);
    const [imgSource, setImgSource] = useState('');
    const [behaviors, setBehaviors] = useState([
        { "text": "resting", "color": "purple", "img": resting },
        { "text": "eating", "color": "red", "img": eating },
        { "text": "ETH", "color": "yellow", "img": eathand },
        { "text": "sniffing", "color": "green", "img": sniffing },
        { "text": "grooming", "color": "blue", "img": grooming },
        { "text": "hanging", "color": "orange", "img": hanging },
        { "text": "walking", "color": "pink", "img": walking },
        { "text": "drinking", "color": "maroon", "img": drinking },
        { "text": "rearing", "color": "violet", "img": rearing }
    ]);

    const initBehaviors = [
        { "text": "resting", "color": "purple", "img": resting },
        { "text": "eating", "color": "red", "img": eating },
        { "text": "ETH", "color": "yellow", "img": eathand },
        { "text": "sniffing", "color": "green", "img": sniffing },
        { "text": "grooming", "color": "blue", "img": grooming },
        { "text": "hanging", "color": "orange", "img": hanging },
        { "text": "walking", "color": "pink", "img": walking },
        { "text": "drinking", "color": "maroon", "img": drinking },
        { "text": "rearing", "color": "violet", "img": rearing }
    ];

    const [bList, setBList] = useState(false);

    const displayImage = (behavior) => (event) => {
        console.log("display image");
        setHover(!hover);
        setImgSource(behavior.img);
    }

    // const { register, handleSubmit } = useForm()

    // const onSubmit = async (data) => {
    //     const formData = new formData()
    //     formData.append("picture", data.picture[0])

    //     const res = await fetch("http://localhost:9000/annotate/picture", {
    //         method: "POST",
    //         body: formData
    //     }).then(res => res.json())
    //     alert(JSON.stringify(res))
    // }

    const [videoFilePath, setVideoPath] = useState(null);

    const handleVideoUpload = (event) => {
        setVideoPath(URL.createObjectURL(event.target.files[0]));

    };

    const [videoPlayed, setVideoPlayed] = useState(0);
    const handleVideoPlayed = (value) => {
        setVideoPlayed(value.played);
    };

    const deleteBehavior = (behavior) => async (event) => {
        console.log("delete behavior");
        // console.log(behavior);
        var index = await behaviors.indexOf(behavior);
        console.log(index);
        await behaviors.splice(index, 1)
        console.log(behaviors)
        await setBehaviors(behaviors);
        await setBList(true);
        await setBList(false);

    }

    const [newBehavior, setNewBehavior] = useState(false);
    const [addNB, setAddNB] = useState('');

    const addNewBehavior = async () => {
        console.log(addNB);
        if (addNB) {
            let inB = false;
            if (behaviors.length > 0){
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
                        inB = true;
                    }
                }
                if (!inB) {
                    await behaviors.push({
                        "text": addNB, "color": "black", "img": ''
                    });
                }
    
                await setBehaviors(behaviors);
                await setBList(true);
                await setBList(false);
                setAddNB('');
            }
        }
        setNewBehavior(false);
    }

    // const [behaviors, setBehaviors] = useState([]);


    return (
        <div>
            <div className="annotate">
                <div className="m"></div>
                <div className="annotate1">

                    <div className="fileuploads">
                        <button>Summary</button>
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
                                <button className="annotation-button" >{behavior.text}</button>
                                <BsFillQuestionCircleFill size={20} onMouseOver={displayImage(behavior)} onMouseOut={displayImage(behavior)} />

                            </div>
                        ))}
                    </div>
                </div>

                <div className="annotate3">
                    <div className="video">

                        <ReactPlayer
                            url={videoFilePath}
                            width="100%"
                            height="100%"
                            controls={true}
                            onProgress={(value) => setVideoPlayed(value['played'])}
                        />
                        {/* <form onSubmit={handleSubmit(onSubmit)}>
                            <input ref={register} type="file" name="picture" /> */}
                        {/* <button id="video-upload">File Upload</button> */}
                        {/* <button>Submit</button>
                        </form> */}

                    </div>
                    <div className="annotations1">
                        {behaviors.map((behavior) => (
                            <div className="annotation1" key={behavior.text}>
                                {/* <progress max={1} value={videoPlayed} /> */}
                            </div>
                        ))}
                    </div>

                    <div className="displayimage">
                        {hover && <img src={imgSource} className="hoverImage"></img>}

                    </div>

                </div>
                <div className="m"></div>
            </div>

        </div>

    );
}

export default Annotate;