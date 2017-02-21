const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs");

var dbString = "enter your mongodb string here"

mongoose.connect(dbString);

const outputFile = "ouput.js";


const Comp = mongoose.model("Comp",
        new Schema({name : String}),
        "comps"
        )
mongoose.Promise = Promise;

Comp.find({}).limit(1000).lean()
    .then(comps =>{
        // console.log(Array.isArray(comps))
        comps.forEach((e)=>{
            delete e._id
            delete e.dateAdded
            delete e.reviews
            delete e.grade
        })
        writeToFile(outputFile, JSON.stringify(comps, null, 4));
    })

function writeToFile(outputFile , data ){
    fs.writeFile(outputFile, data, function(error){
        if(error){
            console.log(err);
        }else{
            console.log("success write to " + outputFile);
        }
    })
}
