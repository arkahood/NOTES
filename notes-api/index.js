const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
//////////////////////Database Connection//////////////////////////////////////////////////

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notesDB', {useNewUrlParser: true, useUnifiedTopology: true});


const noteSchema = new mongoose.Schema({
    title : {
        type :String,
        required: true
    },
    content : {
        type :String,
        required: true
    }
});


const Notes = mongoose.model('Note', noteSchema);

///////////////////////request targeting add delete and show notes////////////////////////////////////
app.route("/")
    .get((req,res)=>{
    Notes.find(function(err,results){
        if(!err){
            res.send(results);
        }
    });
})
    .post((req,res)=>{
    console.log(req.body);
    let newNote = new Notes({
        title :req.body.title,
        content : req.body.content
    });
    newNote.save(function(err){
        if(err){
            console.log("Not added fields missing");
        }else{
            console.log("sucessfully added");
        }
    });
    console.log("added to db");
    // console.log(ti);
    // console.log(co);
})
    .delete((req,res)=>{
        console.log(req.body);
        Notes.deleteOne({_id : req.body._id},(err)=>{
            if(!err){
                console.log("Deletion Done");
            }else{
                console.log(err);
            }
        })
    })






app.listen(9000,function(){
    console.log("Server running in port 9000");
});
