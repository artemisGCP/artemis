import React from 'react'
import { v4 } from 'uuid';
import Popup from 'reactjs-popup';



function Summary(props) {

    const calculateSummary = (behavior) => {
        let totalTime = 0;
        for (const annot of props.annot) {
            if (annot.behavior === behavior) {
                totalTime = totalTime + annot.endTime - annot.startTime;
            }
        }
        return Math.round(totalTime)
    }

    return (
        <Popup trigger={<button>Summary</button>} position="left center">
                            {props.behaviors.map((behavior) => (
                                <div key={v4()}>{behavior.text} : {calculateSummary(behavior.text)} Seconds</div>
                            ))}
                        </Popup>
    )
}

export default Summary;