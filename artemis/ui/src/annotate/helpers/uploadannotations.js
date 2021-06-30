import { v4 } from "uuid";

function UploadAnnotations(props) {

    const handleVideoUpload = (event) => {
        console.log(event.target.files[0])
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = e => {
            const data = JSON.parse(e.target.result);
            let annots = [];
            for (const annot of data.timeSegmentAnnotations) {
                const startTime = annot.startTime.slice(0,-1)
                const endTime = annot.endTime.slice(0,-1)
                annots.push({
                    displayName: annot.displayName,
                    startTime: startTime,
                    endTime: endTime,
                    training: true,
                    id: v4()
                })
            }
            props.setAnnot(annots)
           
        }
    };

    return (
        <>
        <input for="upload annotation" type="file" name="videoUpload" onChange={handleVideoUpload} /><span>Upload Annotations</span>
        </>
    )
}

export default UploadAnnotations;