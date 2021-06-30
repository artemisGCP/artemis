import { BsFillTrashFill } from 'react-icons/bs';


function DeleteBehavior(props) {

    const deleteBehavior = (behavior) => async (event) => {
        if (window.confirm('Are you sure you want to delete this behavior?')) {
            // Save it!
            var index = props.behaviors.indexOf(behavior);

            props.behaviors.splice(index, 1)
            
            for (const i in props.behaviors) { 
                props.behaviors[i].key = props.allKeys[i];
            }
            
            props.setBehaviors(props.behaviors);
            console.log(props.behaviors);
            props.setRefresh();
          
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }

    }

    return (
        <BsFillTrashFill size={20} onClick={deleteBehavior(props.behavior)} />
    )
}

export default DeleteBehavior;