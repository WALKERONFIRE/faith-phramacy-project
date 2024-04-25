const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
    Userid: {type : String , required : TRUE},
    products : [
        {
            productid: {
                type : String,
            },
            quantity : {
                type: Number,
                default:1,
            },
        },
    ],
    amount : {type : Number , required: TRUE},
    address: {type : Object , required : TRUE},
    status : {type : String , default : "pending" }
},
{timestamps : true }
);

module.exports = mongoose.model("Cart" , CartSchema);