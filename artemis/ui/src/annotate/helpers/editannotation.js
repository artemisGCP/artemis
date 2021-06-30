import { BsFillTrashFill } from 'react-icons/bs';
import { v4 } from 'uuid';
import { useRef } from 'react';

function EditAnnotation(props) {

    function sortByProperty(property){  
        return function(a,b){  
           if(a[property] > b[property])  
              return 1;  
           else if(a[property] < b[property])  
              return -1;  
       
           return 0;  
        }  
     }
    

    const deleteAnnotation = (e) => {
        props.setAnnot(props.annot.filter(item => item.id !== e));
        props.setRefresh({});
    }

    const handleAnnotationUpdate = (annotation, a, e, id) => {
        if (!e.target.value) {
            console.log('empty')
        }

        const annotations = [...props.annot];
        
        if (e.target.name === "start") {
          annotations.find(item => item.id === annotation.id).startTime = e.target.value;
          props.setAnnot(annotations);
        }

        if (e.target.name === "end") {
            annotations.find(item => item.id === annotation.id).startTime = e.target.value;
            props.setAnnot(annotations);
          }

        props.setRefresh({});
        props.setCurrKeyState(false);
        props.setCurrKey(null);
    }

    
    return (
        <>
        {props.annot.sort(sortByProperty("startTime")).map((annotation) => (
            <div id="form-value" key={annotation.id} >
                <div className="ind-annotations-container">
                        <div className="ind-annotations" id={Math.round(annotation.startTime.toFixed(2))}>
                            <div className="ind-title">
                            <label> {annotation.displayName}: </label>
                            </div>
                            <div className="ind-time">
                            <input type="number" step="0.1" className={Math.round(annotation.startTime)} name="start" aria-label='annotation start time' style={{ width: "60px" }} value={Math.round(annotation.startTime * 100) / 100} onChange={(e) => handleAnnotationUpdate(annotation, 0, e)} />
                            <input type="number" step="0.1" className="form-input" name="end" aria-label='annotation end time' style={{ width: "60px" }} value={Math.round(annotation.endTime * 100) / 100} onChange={(e) => handleAnnotationUpdate(annotation, 1, e)} />
                            </div>
                            <div className="ind-helpers" type="submit">
                            <BsFillTrashFill size={20} onClick={() => deleteAnnotation(annotation.id)} />
                            </div>
                        </div>
                </div>
            </div>
        ))}
        </>
    )
}

export default EditAnnotation;