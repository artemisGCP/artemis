import React, { useState } from 'react';
import './annotate.css';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import resting from '../../assets/resting.jpg';
import logo from '../../assets/logo.png';


const Annotate = () => {
    const [hover, setHover] = useState(false);
    const [imgSource, setImgSource] = useState('');
    const annotations = [
        { "text": "resting", "color": "purple", "img": resting },
        { "text": "eating", "color": "red", "img": logo },
        { "text": "ETH", "color": "yellow" },
        { "text": "sniffing", "color": "green" },
        { "text": "grooming", "color": "blue" },
        { "text": "hanging", "color": "orange" },
        { "text": "walking", "color": "pink" },
        { "text": "drinking", "color": "maroon" },
        { "text": "rearing", "color": "violet" }
    ];

    const displayImage = (annotation) => (event) => {
        console.log("display image");
        setHover(!hover);
        setImgSource(annotation.img);
    }

    return (
        <div>
            <div className="annotate">
                <div className="m"></div>
                <div className="annotate1">
                    <div className="blank">
                        {hover && <img src={imgSource} className="hoverImage"></img>}
                    </div>
                    <div className="annotations">
                        {annotations.map((annotation) => (
                            <div className="annotation" key={annotation.text}>
                                <BsFillQuestionCircleFill size={20} onMouseOver={displayImage(annotation)} onMouseOut={displayImage(annotation)} />
                                <button className="annotation-button">{annotation.text}</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="annotate3">
                    <div className="video">
                        <button id="video-upload">File Upload</button>
                    </div>
                    <div className="annotations1">
                        {annotations.map((annotation) => (
                            <div className="annotation1" key={annotation.text}>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="m"></div>
            </div>

            {/* { hover && <img src={imgSource} className="hoverImage"></img>} */}
        </div>

    );
}

export default Annotate;