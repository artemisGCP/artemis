import { useCallback, useState } from "react"

function SetFps(props) {
    const [showFps, setShowFps] = useState(false);
    const [fps, setFPS] = useState(null);

    const handleSubmit = () => {
        try {
            props.setFps(fps);
            setShowFps(false);
            props.fpsIsSet(true);
        } catch (e) {
            console.log("Could not set FPS. Please Refresh and try again");
        }
        


    }


    return (
        <>
            {!showFps && !props.fpsSet ? <button onClick={() => setShowFps(true)}>Set Video FPS</button>: ""}
            {showFps ?
                <div>
                    <input type="text" size="12" aria-label='add new fps' onChange={e => setFPS(e.target.value)} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            : ""}
        </>
    )
}

export default SetFps