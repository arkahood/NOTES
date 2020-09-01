import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Notes";
import Input from "./Input";
import { useEffect } from "react";
const axios = require('axios');
const qs = require('querystring');




function App(props){
  var [note,setNote] = React.useState([]);
  var [up ,setup] = React.useState(0);

  // useEffect(()=>{
  //   fetch("http://localhost:9000/")
  //   .then(response => response.json())
  //   .then((data) => setNote(data))
  // })
  useEffect(()=>{
    axios.get("http://localhost:9000/")
      .then((res)=>{
        console.log(res.data);
        setNote(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
      .then(()=>{
        console.log("working");
      })
  },[up])


  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  


  function updateAct(item){
    console.log(item);
      
    axios.post("http://localhost:9000/",qs.stringify(item),config).then(res => console.log(res.data));

    setup(up => up+1);
   }


  function deleteNote(_id){
    console.log(this._id);
    ////////////////////////////////////////////////////////////////////////////////
    var payload = {
      _id : this._id
    }
    // console.log(payload);
    // axios.delete("http://localhost:9000/",{
    //   data: qs.stringify(payload),
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    //   }
    // })
    //   .then(function(response) {
    //   console.log(response.data);
    //   });
    ////////////////////////////////////////////////////////////////////////////////////
    fetch("http://localhost:9000/" , {
      method: 'delete',
      body : qs.stringify(payload),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
    setup(up => up+1);
  }


 return(
    <div>

      <Header />
      <Input

      updateAct={updateAct}
      />

      {note.map((one,index) =>{
        return <Note
          key={one._id}
          delete={deleteNote}
          _id={one._id}
          Title={one.title}
          content={one.content}
        />;
      }
      )}
      <Footer />
    </div>
  );
}

export default App;
