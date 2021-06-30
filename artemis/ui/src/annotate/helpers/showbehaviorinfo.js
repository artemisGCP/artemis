import { BsFillQuestionCircleFill } from 'react-icons/bs';

function ShowInfo(props) {
    
    const displayImage = (behavior) => (event) => {      
        props.setHover(true);
        props.setImgSource(behavior.img);
    }

    return (
        <div className="show-button">
        <BsFillQuestionCircleFill size={20} onMouseOver={displayImage(props.behavior)} onMouseOut={() => props.setHover(false)} />
        </div>
    )
}

export default ShowInfo