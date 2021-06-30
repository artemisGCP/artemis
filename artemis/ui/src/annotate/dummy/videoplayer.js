import ReactPlayer from 'react-player'
import { scroller } from "react-scroll";

function VideoPlayer(props) {

    const handleVideoPlayed = (value) => {
        props.setVideoPlayed(value.played);
        props.setVideoPlayedSeconds(value.playedSeconds);
        props.setVideoFrame(Math.round(value.playedSeconds.toFixed(2) * props.fps));
        props.getCurrTime(value.playedSeconds);

        const timePlay = Math.round(value.playedSeconds.toFixed(2));

        const docScroll = document.getElementById(timePlay.toString());

        if (docScroll) {
            const leftPos = docScroll.offsetLeft;
            document.getElementById("annotations-container").scrollLeft = leftPos-10;
        }

    };

    const handleVideoEnd = async (a) => {
        if (props.currKeyState === true) {  
            const newAnnot = {
                behavior: props.currKey,
                startTime: props.startTime[1],
                endTime: props.videoPlayedSeconds,
                training: true,
            } 
            
            props.setAnnot([...props.annot, newAnnot]);
            props.setCurrKeyState(false);
            props.setCurrKey(null);   
        }
    }

    return(
        <div className="video" onClick={() => props.setFocusedBehavior(null)}>

                        <ReactPlayer
                            url={props.videoFilePath}
                            width="640px"
                            height="100%"
                            controls={true}
                            onProgress={(value) => handleVideoPlayed(value)}
                            onEnded={handleVideoEnd}
                            onDuration={(e) => props.setVideoLength(e)}
                            onPlay={() => props.setPlay(true)}
                            onPause={() => props.setPlay(false)}
                            
                        />

                    </div>

    )
}

export default VideoPlayer