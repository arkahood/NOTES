import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Notes(props){
  return(
    <div className="note">

      <h1>{props.Title}</h1>
      <p>{props.content}</p>
      <button onClick={(event)=>{
        props.delete(props._id);
        event.preventDefault();
      }} ><DeleteIcon /></button>

    </div>
  );
}

export default Notes;
