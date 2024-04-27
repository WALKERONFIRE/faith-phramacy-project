const mongoose = require("mongoose");
const product = require("../Models/Product");
const user = require("../Models/User");

const OrderSchema = new mongoose.Schema({
    Userid: {type: mongoose.Schema.Types.ObjectId, required: true, ref:user},
    products : [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId, required: true, ref:product
            },
            quantity : {
                type: Number,
                default:1,
            },
        },
    ],
    amount : {type : Number},
    address: {type : Object , required : true},
    status : {type : String , default : "pending" }
},
{timestamps : true }
);

module.exports = mongoose.model("Order" , OrderSchema);