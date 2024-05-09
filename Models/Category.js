const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const categorySchama = new mongoose.Schema(
{
    categoryname:{type: String, required:true },
    image: { type: String },
    colour: { type: String }
},

);
module.exports = mongoose.model("Category" , categorySchama);