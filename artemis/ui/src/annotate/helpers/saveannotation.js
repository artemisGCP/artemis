import { useState } from 'react';
import { v4 } from 'uuid';

function SaveAnnotation(props) {

    const [trainFileUrl, setTrainFileUrl] = useState("");
    const [trainFileName, setTrainFileName] = useState("");

    const getAnnotationLength = () => {
        let i = 0;
        for (const a of props.annot) {
            i += 1;
        }
        return i;
    }

    

    const downloadAnnotations = async () => {
        const annotations = [...props.annot];
        

        let trainAnnot = [];
        let testAnnot = [];

        for (const annot of annotations) {
            if (annot.training === true) {
                trainAnnot.push({
                    displayName: annot.displayName,
                    startTime: `${annot.startTime}s`,
                    endTime: `${annot.endTime}s`,
                });
            } else if (annot.training === false) {
                testAnnot.push({
                    displayName: annot.displayName,
                    startTime: annot.startTime,
                    endTime: annot.endTime,
                });
            } 
        }

        const trainOutput = JSON.stringify({
            videoGcsUri: "",
            timeSegmentAnnotations: trainAnnot,
        dataItemResourceLabels: {
            "aiplatform.googleapis.com/ml_use": "train"
        }});

        console.log(trainOutput);

        const trainBlob = new Blob([trainOutput]);
        const trainFileDownloadUrl = URL.createObjectURL(trainBlob);
        setTrainFileName(`${props.videoID}_training_annotations.json`)
        await setTrainFileUrl(trainFileDownloadUrl)
        document.getElementById("train-download").click();
        URL.revokeObjectURL(trainFileDownloadUrl);
        localStorage.removeItem('annot');
        setTrainFileUrl("");
        setTrainFileName("");

        
        
    }

    return (
        <>
        {getAnnotationLength() >= 0 &&
            <div className="save-button" key={v4()}>

                <button onClick={downloadAnnotations}>Download Annotations</button>
                {props.saveAnnotate && <p>{props.saveAnnotate}</p>}
                <a id="train-download" style={{display: "none"}}
                download={trainFileName}
                href={trainFileUrl}
                >download it</a>
            </div>

        }
        </>
    )
}

export default SaveAnnotation