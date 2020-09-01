import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
  var [iswritten,setis]=React.useState(false);
  var [content,setContent]= React.useState({
    title:"",
    content:""
  });

  function update(event){
    setis(true);
    var place = event.target.name;
    var val =event.target.value;
    return(
      setContent((prev)=>{
        if(place === "title"){
          return({
            ...prev ,title:val
          })
        }else{
          return({
            ...prev ,content:val
          })
        }
      })
    );
  }



  return (
    <div>
      <form className="create-note">
        {iswritten && <input onChange={update} name="title" placeholder="Title" value={content.title} />}
        <textarea onChange={update} name="content" placeholder="Take a note..." value={content.content} rows={iswritten?"3":"1"} />
        {iswritten && <Zoom in="true">
        <Fab onClick={(event)=>{
          props.updateAct(content);
          setContent({title:"",content:""});
          event.preventDefault();
        }}><AddIcon/></Fab>
        </Zoom>
      }
      </form>
    </div>
  );
}

export default CreateArea;
