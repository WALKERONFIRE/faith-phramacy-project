const mongoose  = require("mongoose");
const { type } = require("os");
const TestSchema  = new mongoose.Schema(
    {
        name : {type : String , require : true} 
       // IsAdmin: {type : boolean, default : false}
        
    }
)
module.exports = mongoose.model("Tests",TestSchema );