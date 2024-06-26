const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const userSchema = new mongoose.Schema(
{
    username:{type : String , required:true , unique : true},
    firstname:{type : String , required:true },
    lastname:{type : String , required:true },
    email:{type : String , required:true },
    password:{type : String , required:true},
    isAdmin:{
        type : Boolean,
        default : false,
    },
},
{timestamps:true}
);
module.exports = mongoose.model("User" , userSchema);