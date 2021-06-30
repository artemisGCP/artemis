import resting from '../../assets/resting.jpg';
import eating from '../../assets/eating.jpg';
import eathand from '../../assets/eathand.jpg';
import sniffing from '../../assets/sniffing.jpg';
import grooming from '../../assets/grooming.jpg';
import hanging from '../../assets/hanging.jpg';
import walking from '../../assets/walking.jpg';
import drinking from '../../assets/drinking.jpg';
import rearing from '../../assets/rearing.jpg';

function VideoUpload(props) {

    const handleVideoUpload = (event) => {
        props.setSaveAnnotate('');
        props.setPrevAnnotations(props.annot);
        props.setPrevBehaviors(props.behaviors);
        props.setVideoPath(URL.createObjectURL(event.target.files[0]));
        props.setVideoID(event.target.files[0].name);

        props.setBehaviors([{ "text": "resting", "color": "purple", "img": resting, "key": "1" },
        { "text": "eating", "color": "red", "img": eating, "key": "2" },
        { "text": "ETH", "color": "yellow", "img": eathand, "key": "3" },
        { "text": "sniffing", "color": "green", "img": sniffing, "key": "4" },
        { "text": "grooming", "color": "blue", "img": grooming, "key": "5" },
        { "text": "hanging", "color": "orange", "img": hanging, "key": "6" },
        { "text": "walking", "color": "pink", "img": walking, "key": "7" },
        { "text": "drinking", "color": "maroon", "img": drinking, "key": "8" },
        { "text": "rearing", "color": "violet", "img": rearing, "key": "9" }]);
    };

    return (
        <>
        <input type="file" name="videoUpload" onChange={handleVideoUpload} /><span>Upload Video</span>
        </>
    )
}

export default VideoUpload