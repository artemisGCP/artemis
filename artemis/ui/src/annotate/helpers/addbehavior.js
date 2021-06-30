import React, { useState } from 'react';
function AddBehavior(props) {

    const [addNB, setAddNB] = useState('');
    const [newBehavior, setNewBehavior] = useState(false);

    const addNewBehavior = async () => {
      
        if (addNB) {
            let inB = false;
            if (props.behaviors.length > 0) {
                for (const b in props.behaviors) {
                    if (props.behaviors[b].text.toLowerCase() === addNB.toLowerCase()) {
                        inB = true;
                    }
                }
            }

            if (inB) {
                setAddNB('');
          
            }
            else {
                for (const b in props.initBehaviors) {
                    if (props.initBehaviors[b].text.toLowerCase() === addNB.toLowerCase()) {
                        await props.behaviors.push(props.initBehaviors[b]);
                        inB = true;
                    }
                }
                if (!inB) {
                    await props.behaviors.push({
                        "text": addNB, "color": "grey", "img": ''
                    });
                }
                for (const i in props.behaviors) {
                    props.behaviors[i].key = props.allKeys[i];
                }
                await props.setBehaviors(props.behaviors);
      
                setAddNB('');
            }
        }
        setNewBehavior(false);
    }
    return (
        <>
        {!newBehavior && <button onClick={() => setNewBehavior(!newBehavior)}>Add behavior</button>}
                        {newBehavior &&
                            <div>
                                <input type="text" size="12" aria-label='add new behavior' onInput={e => setAddNB(e.target.value)} />
                                <button onClick={addNewBehavior}>Submit</button>
                            </div>
                        }
        </>
    )
}

export default AddBehavior;