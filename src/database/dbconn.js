const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/nodeproject").then(()=>{
    console.log("the connection is sucessfully")
}).catch(()=>{
    console.log("the connection is failed")
    
})