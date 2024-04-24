const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const categorySchama = new mongoose.Schema(
{
    categoryid:{type : Number , required:true , unique : true},
    categoryname:{type: String, required:true }
},
);
module.exports = mongoose.model("Category" , categorySchama);